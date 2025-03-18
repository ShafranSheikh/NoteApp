import mongoose from 'mongoose';
const blacklistSchema  = new mongoose.Schema({
    token:{type:String, required: true},
    createdAt:{type:Date, default:Date.now, expires:'1h'}//tokens expire after 1 hour
});
const Blacklist = mongoose.model('Blacklist',blacklistSchema );
export default Blacklist;