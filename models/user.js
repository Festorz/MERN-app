import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{type:String, requires:true},
    email:{type:String, requires:true},
    password: { type: String, requires: true },
    id:{type:String}
})

export default mongoose.model('User', userSchema)