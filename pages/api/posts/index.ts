import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { PostType, ResponseFuncs } from "../../../utils/types"
import  Post from "../../../models/Post"
import allowCors from '../../../utils/allowCors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse<PostType[] | void>) => {
      await connect() // connect to database
      res.json(await Post.find({}).catch(catcher))
    },
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse<PostType>) => {
      await connect() // connect to database
      res.json(await Post.create(req.body).catch(catcher))
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default allowCors(handler);

export const config = {
  api: {
    externalResolver: true,
  },
}