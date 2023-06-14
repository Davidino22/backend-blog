
import mongoose from 'mongoose'
import { ObjectId } from 'mongoose'


// Interface to defining our object of response functions
export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

// Interface to define our post model on the frontend
export interface PostType {
  _id?: ObjectId
  userId: ObjectId
  content: string
  title: string
}
// Interface to define our user model on the frontend
export interface UserType {
  _id?: ObjectId
  email: string
  password: string
}
