import mongoose from 'mongoose'
const NoteSchema = mongoose.Schema({
    title:{type:String, required: true},
    note:{type:String, required: true},
});
export default mongoose.model("Note", NoteSchema);