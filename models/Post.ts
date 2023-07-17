import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
 
 // OUR Post SCHEMA
  const PostSchema = new mongoose.Schema({
    content: String,
    title: String,
    userId: ObjectId,
    comments:  {
      type: [ObjectId],
      required: false
    }
  })

  // OUR post MODEL
export default mongoose.models.Post || mongoose.model("Post", PostSchema)