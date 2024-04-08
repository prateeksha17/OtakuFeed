import mongoose from 'mongoose';

const postSchmea = mongoose.Schema({
    title: String,
    message: String,
    name: String,
  
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: ()=>new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchmea)

export default PostMessage;