import React,{useState,useEffect} from 'react'
import axios from 'axios';
import '../assets/styles/notes.css'
const Notes = () => {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [allNotes, setAllNotes] = useState([]);
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
            const response = await axios.post("http://localhost:3000/api/note/add",{
                title,
                note,
            });
            if(response.status === 200){
                alert('Note Added successfully');
            }else{
                alert('Something went wrong');
            };
            setTitle('');
            setNote('');
            window.location.reload()
        }catch(error){
            console.error(error);
        }
    }
return (
    <>
        <div className='note-input-container-main'>
            <form onSubmit={handleFormSubmit}>
                <div className="note-input-container-secondary">
                    <input type="title" name="title" id="title" placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    <textarea name="note" id="note" placeholder='note' value={note} onChange={(e)=>setNote(e.target.value)} />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
        {allNotes.length >0 ? (
                allNotes.map((notes)=> (
        <div className="note-disaply-container-main" key={notes.id}>
                    <h1 className="title-container">
                        {notes.title}
                    </h1>
                    <p className="notes-container">
                        {notes.note}
                    </p>
                
        </div>
        ))
        ):(
            <p>No Notes Available</p>
        )}
    </>
    )
}

export default Notes