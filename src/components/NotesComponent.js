import {useState, useRef} from 'react'
import {useHttp} from '../hooks/http.hook'


function Notes (props){
    const [showAdditionalMenuNote, setShowAdditionalMenuNote] = useState(false)
    const [showEditToolNote, setShowEditToolNote] = useState(false)
    
    const editFormRef = useRef()

    const showAdditionalMenuNoteHandler =() =>{
        setShowAdditionalMenuNote(true)
    }

    const hideAdditionalMenuNoteHandler =() =>{
        setShowAdditionalMenuNote(false)
    }

    const showEditToolNoteHandler =() =>{
        setShowEditToolNote(true)
        setShowAdditionalMenuNote(false)
    }

    const hideEditToolNoteHandler =() =>{
        setShowEditToolNote(false)
    }


    const {request} = useHttp()
    const editNoteHandler = props.editNoteHandler
    const editNoteRequest = async(body)=>{
      try { 
      const fetchedData = await request(`${process.env.REACT_APP_API}/api/notes/updatenote`, 'PUT', body)
        const data = fetchedData
        console.log(data)
        editNoteHandler()

      } catch (e) {
        console.log('have some problem on fedched data'+ e)
      }
    }

    const deleteNoteRequest = async(body)=>{
        try { 
        const fetchedData = await request(`${process.env.REACT_APP_API}/api/notes/deletenote`, 'DELETE', body)
          const data = fetchedData
          console.log(data)
          editNoteHandler()
  
        } catch (e) {
          console.log('have some problem on fedched data'+ e)
        }
      }
    
    const deleteNoteSubmitHandler = ()=>{
        const body = {'_id': props.note._id }
        deleteNoteRequest(body)
        hideAdditionalMenuNoteHandler()
}
  
  
 


    const editNoteSubmitHandler = (event)=>{
        event.preventDefault()
        
        const body = {
            '_id': editFormRef.current[`_id`].defaultValue,
            'name': editFormRef.current[`name`].value,
            'description': editFormRef.current[`description`].value,
            'relevance': editFormRef.current[`relevance`].value
        }
        
        editNoteRequest(body)

        hideEditToolNoteHandler()
    }

    function EditNoteComponent(){
        return(
            <div >
            <form onSubmit={editNoteSubmitHandler} ref={editFormRef}>
            <div className="headerTodo d-flex flex-column">
                    <h5>Название заметки:</h5>
                    <input  name="_id" type="hidden" defaultValue = {props.note._id} />
                    
                    <input type="text" name="name" defaultValue={props.note.name} />
                  </div>
                  <input type="text"  name="description" className="contentTodo" defaultValue={props.note.description} />
                   
                      
                  <h6>Актуально до : </h6>
                  <input type="datetime-local" name="relevance" defaultValue={props.note.relevance} />
                  <div>
                  <hr/>
                    <button type="submit" className="btn btn-light d-block mx-auto"
                       >Сохранить</button>
                    <hr/>
                    
                    <button className="btn btn-primary d-block mx-auto "
                        onClick={hideEditToolNoteHandler} >Отменить</button>
                  </div>
                  </form>

            </div>
        )
    }

    function AdditionalMenuNote(props){
        return (
            < >
            <button className="btn btn-light d-block mx-auto"
            onClick={showEditToolNoteHandler}
            >Редактировать</button>
            <hr/>
            <button onClick={deleteNoteSubmitHandler} className="btn btn-primary d-block mx-auto " 
            >Удалить</button>
            <hr/>
            <button className="btn btn-dark d-block mx-auto " onClick={props.hide} >Назад</button>
            </>

        )
    }

    return(
      <div className="bg-danger p-1 m-1 todoBlock " key={props.note._id}>


          {

             !!showEditToolNote && !showAdditionalMenuNote && <EditNoteComponent/>
          }
           {
            !!showAdditionalMenuNote && !showEditToolNote && <AdditionalMenuNote hide={hideAdditionalMenuNoteHandler}  />
            }
            
            {
                !showAdditionalMenuNote && !showEditToolNote && <>

                <div className="headerTodo">
                    <h5>{props.note.name}</h5>
                    <button className="btn btn-secondary" onClick={showAdditionalMenuNoteHandler} >&#8942;</button>
                   
                  </div>
                  <h6 className="contentTodo">
                  {props.note.description} 
                      </h6>
                  <h6>Актуально до : {props.note.relevance}</h6>
                
                </>
            }      
                </div>
    )
  }  


  
export default Notes

