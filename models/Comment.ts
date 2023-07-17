import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
 
 // OUR Post SCHEMA
  const CommentSchema = new mongoose.Schema({
    text: String,
    userId: ObjectId,
    postId: ObjectId
  })

  // OUR Comment MODEL
export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema)