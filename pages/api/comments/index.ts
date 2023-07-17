import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { CommentType, PostType, ResponseFuncs } from "../../../utils/types"
import Comment from "../../../models/Comment"
import Post from "../../../models/Post"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse<CommentType[] | void>) => {
      await connect() // connect to database
      res.json(await Comment.find({}).catch(catcher))
    },
    // RESPONSE Comment REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse<{newComment: CommentType, updatedPost: PostType}>) => {
      await connect() // connect to database
      const postId = req.body.postId;
      const newComment = await Comment.create(req.body).catch(catcher);
      const oldPost:PostType = await Post.findById(postId).catch(catcher)
      
      let newComments
      if ('comments' in oldPost && Array.isArray(oldPost.comments)) {
        
        newComments = [...oldPost.comments, newComment._id];
      } else {
        newComments = [newComment._id];
      }
     
      const updatedPost:PostType = await Post.findByIdAndUpdate(postId, { comments: newComments }, { new: true }).catch(catcher)
       res.json({updatedPost, newComment})
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler

export const config = {
  api: {
    externalResolver: true,
  },
}