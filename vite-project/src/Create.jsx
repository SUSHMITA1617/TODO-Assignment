import React, { useCallback, useState } from "react";
import axios from 'axios'


function Create(){
    const[task,setTask]=useState();
    const handleAdd= () =>{
         axios.post('http://localhost:3001/add',{task:task}
         ).then(result => 
            location.reload()
         )
         .catch(error => console.log(error
         ))
    }
    return (
        <div class="create_form">
           <input type="text"placeholder="Enter ToDo" onChange={(e)=> setTask(e.target.value)}/>
           <button onClick={handleAdd}>Add</button>
        </div>
    )

    
}

export default Create