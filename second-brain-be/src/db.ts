// create user models and schemas
import { hash } from "bcrypt";
import mongoose, { model, Schema } from "mongoose";
import "dotenv/config"

const mongo = process.env.MONGO_URL;
 mongoose.connect(mongo || "");


const userSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})

const contentSchema= new Schema({
    title: String,
    link: String,
    content: String,
    tags: {type: [mongoose.Schema.Types.ObjectId], ref: "Tag" },
    type: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
})

const linkSchema= new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user", unique: true},
    hash:String
})

export const userModel = model("user", userSchema)
export const contentModel = model("content", contentSchema)
export const linkModel = model("link", linkSchema)
