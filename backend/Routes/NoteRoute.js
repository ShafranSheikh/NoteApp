import express from 'express';
import NoteSchema from '../models/NoteSchema.js';

const router = express.Router();

//Route for adding new List
router.post('/add', async (req,res)=>{
    const {title, note} = req.body;
    try{
        const newNote = new NoteSchema({
            title,
            note,
        });
        await newNote.save();
        res.status(200).json({message:'Note Added successfully'})
    }catch(error){
        console.error('Error Adding note',error);
        res.status(500).json({error: ' Failed to add note'})
    };
});

//Route to Display all the available Notes
router.get('/display', async (req,res)=>{
    try{
        const notes = await NoteSchema.find({});
        const noteData = notes.map(allNotes =>({
            id:allNotes._id,
            title: allNotes.title,
            note: allNotes.note,
        }));
        res.json(noteData);
    }catch(error){
        console.error('Error Fetching Notes',error);
        res.status(500).json({error: 'Failed to fetch note data'});
    }
});


//Route to delete note
router.delete('/delete/:id', async(req,res)=>{
    try{
        await NoteSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Note Deleted Successfully'});
    }catch(error){
        console.error('Error Deleting Note.',error);
        res.status(500).json({error: 'Failed to delete note'});
    }
});

//Route to update a note
router.put('/update/:id', async(req,res)=>{
    const {title, note} = req.body;
    try{
        await NoteSchema.findByIdAndUpdate(req.params.id,{title,note});
        res.status(200).json({ message: 'Note Updated successfully' });
    }catch(error){
        console.error('Error Updating note', error);
        res.status(500).json({ error: 'Failed to update note' });
    }
})
export default router;