import React,{useState,useEffect} from 'react'
import axios from 'axios';
import '../assets/styles/notes.css'
import trash from '../assets/images/Trash_Full.png'
const Notes = () => {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [allNotes, setAllNotes] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const fetchNotes = async ()=>{
        try{
            const response = await axios.get('http://localhost:3000/api/note/display');
            setAllNotes(response.data);
        }catch(error){
            console.error('Error Fetching Notes');
        }
    }
    useEffect(()=>{
        fetchNotes();
    },[]);
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        try{
            if(updateId){
                await axios.put(`http://localhost:3000/api/note/update/${updateId}`,{
                    title,
                    note,
                });
                alert('Note Updated Successfully.');
                setUpdateId(null);
            }else{
                await axios.post("http://localhost:3000/api/note/add",{
                    title,
                    note,
                });
                alert('Note Added successfully');
            }
            setTitle('');
            setNote('');
            window.location.reload()
        }catch(error){
            console.error(error);
        }
    };
    const handleDelete = async (id) =>{
        try{
            await axios.delete(`http://localhost:3000/api/note/delete/${id}`);
            alert('Note Deleted Successfully');
            window.location.reload();
        }catch(error){
            console.error('Error deleting note.', error);
        };
    };

    const handleUpdate = (id, title, note) =>{
        setUpdateId(id);
        setTitle(title);
        setNote(note);
    };
return (
    <>
        <div className='note-input-container-main'>
            <form onSubmit={handleFormSubmit}>
                <div className="note-input-container-secondary">
                    <h1><input type="text" name="title" id="title" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/></h1>
                    <textarea name="note" id="note" placeholder='note' value={note} onChange={(e)=>setNote(e.target.value)} />
                </div>
                <button className='add-button' type="submit">{updateId ? 'Update': 'Add'}</button>
            </form>
        </div>
        <div className="note-disaply-container-main" >
        {allNotes.length >0 ? (
                allNotes.map((notes)=> (
        
            <div className="note-display-container-secondary" key={notes.id}>
                <h2 className="title-container">
                    {notes.title}
                </h2>
                <p className="notes-container">
                    {notes.note}
                </p>
                <div className="functionality-container">
                    <button onClick={()=> handleUpdate(notes.id, notes.title, notes.note)}><h4>UPDATE </h4></button>
                    <button onClick={()=>handleDelete(notes.id)}><img src={trash} alt="" /></button>
                </div>
            </div>
        
        ))
        ):(
            <p>No Notes Available</p>
        )}
        </div>
    </>
    )
}

export default Notes