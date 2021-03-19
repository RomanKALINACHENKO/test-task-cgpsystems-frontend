import {useState} from 'react'
import AddTodoFormComponent from '../components/AddTodoFormComponent'

function AddTodoButtonComponent(props) {
    const addNoteHandler = props.addNoteHandler
    const [createTodoFormVisible, setCreateTodoFormVisible] = useState(false);
    const createTodoHandler = ()=>{
        setCreateTodoFormVisible((state)=>{return true})
    }
    const hideTodoForm = ()=>{
        setCreateTodoFormVisible((state)=>{return false})
    }
  
   return   (
       <>
    {!createTodoFormVisible &&
    <div className="row p-3 bg-light">
    <div className="col-10"></div>
    <div className="col-2">
    <button className="btn btn-warning" onClick={createTodoHandler}  >Создать заметку</button> 
    </div>
  </div>}
  {
      !!createTodoFormVisible && 
      <AddTodoFormComponent addNoteHandler={addNoteHandler}
      categories={props.categories}
      hideForm={hideTodoForm} />
  }
  </>
  )
   
}

export default AddTodoButtonComponent


