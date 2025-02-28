import express from 'express';
import NoteSchema from '../models/NoteSchema.js';

const router = express.Router();

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

export default router;