import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    likes:{
        type: [String],
        default:[]
    },
    createdAt: {
        type: Date,
        default: new Date()
    } ,
    selectedFile: String,
})

const postMessage = mongoose.model('postMessage', postSchema)

export default postMessage