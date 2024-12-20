import mongoose, {model, Schema} from "mongoose";

mongoose.connect(MONGODBURL)


const userSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})
export const userModel = model("users", userSchema);


const contentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: Schema.Types.ObjectId, ref: 'tag'}],
    type: String,
    userId: {type: Schema.Types.ObjectId, ref: 'users', required: true}
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: Schema.Types.ObjectId, ref: 'users', required: true}
})


export const LinkModel = model("links", LinkSchema);
export const contentModel = model("contents", contentSchema);
