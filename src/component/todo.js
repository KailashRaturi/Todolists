import React, { useEffect, useState } from 'react';
import todo from "../images/todo.png";
import "./App.css";

//get data from localstorage
 const getLocalItmes=()=>{
   let list =localStorage.getItem('lists');

   if (list){
    return JSON.parse(localStorage.getItem('lists'));
   }
   else {
    return []; 
   }
 }
const  Todo =()=>{
    const [inputData,setInputData]= useState('');
    const [items,setItems]=useState(getLocalItmes());
    const[toggleSubmit,setToggleSubmit]= useState(true);
    const[isEditItem,setEditItem]=useState(null);
    const addItem =()=>{
        if(!inputData){

        }
        else if(inputData && !toggleSubmit){
           setItems(items.map((elem)=>{
            if(elem.id==isEditItem)
               {   return{...elem, name:inputData}
               }
               return elem;
           })
           )
           setToggleSubmit(true);

           setInputData('');
   
           setEditItem(null); 
           
        }
        else{
            const allInputData = {id: new Date().getTime().toString(), name:inputData}
            setItems([...items,allInputData]);
            setInputData('')
          }
      }

    const deleteItem=(index)=>{
         const updateditems = items.filter((elem,ind)=>{
            return index != elem.id;
         });
         setItems(updateditems);
    }

    const editItem=(id)=>{
        let newEditItem=items.find((elem)=>{return elem.id== id})

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setEditItem(id);

    }

    const removeAll=()=> {
           setItems([]);
    }
    // Adding data to local storage 
    
    useEffect(()=>{ localStorage.setItem ('lists', JSON.stringify(items))}, [items]);

 return (
    <>
     <div className="main-div">
        <div className ="child-div">
        <figure>
         <img src={todo} alt="todologo"/>
         <figcaption className='fig'>ADD YOUR LIST HERE</figcaption>
        </figure>
          <div className="addItems">
           <input type="text" className="field" placeholder="Add items... " value={inputData}
               onChange={(e)=> setInputData(e.target.value)}></input>
              
               {
                toggleSubmit ? <i className="fa-solid fa-plus add-btn" title ="Add item" onClick={addItem}></i> :
                <i className="fa-regular fa-pen-to-square Update" title="Update Item"  onClick={addItem}></i>
               }

          </div>

              <div className="showItems">   
                    {
                      items.map((elem,ind)=>{
                        return(
                       <div className="eachItem" key ={elem.id}>
                        <h3>{elem.name}</h3>
                        <i className="fa-regular fa-pen-to-square Edit" title="Edit-btn" onClick={()=>editItem(elem.id)}></i>
                        <i className="fa-solid fa-trash delete" title="Add Item" onClick={()=>deleteItem(elem.id)}></i> 
                       </div>
                        )  })
                    }       
              </div>
            {/* Clear All button*/}

        <div className="showitems">
           <button type="btn" className="btn-effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>Delete all list</span></button>
          </div>
       </div>
     </div>
    </>

)

}
export default Todo;