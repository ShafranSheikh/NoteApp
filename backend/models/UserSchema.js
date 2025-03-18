import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username:{type:String, required: true},
    email:{type:String, required: true},
    password:{type:String, required:true},
    createDate:{type:Date, default: Date.now},
})

// Added unique index for email
userSchema.index({ email: 1 }, { unique: true });
export default mongoose.model("User", userSchema);