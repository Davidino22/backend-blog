import mongoose from 'mongoose'
 
 // OUR TODO SCHEMA
  const MessageSchema = new mongoose.Schema({
    message: String,
    email: String,
    name: String,
  })

  // OUR TODO MODEL
export default mongoose.models.Message || mongoose.model("Message", MessageSchema)