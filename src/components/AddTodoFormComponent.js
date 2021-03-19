import {useHttp} from '../hooks/http.hook'

function AddTodoFormComponent(props) {

  const {request} = useHttp()
  const addNoteHandler = props.addNoteHandler
  const addTodoRequest = async(body)=>{
    try { 
    const fetchedData = await request(`${process.env.REACT_APP_API}/api/notes/createnote`, 'POST', body)
      const data = fetchedData
      addNoteHandler()
    console.log(data)
    } catch (e) {
      console.log('have some problem on fedched data'+ e)
    }
  }
  




    const addTodoHandler = (event)=>{
        event.preventDefault()
        console.log(`event.preventDefault()`)
        console.log(event)
        const  body  = {'name':event.target['name'].value,
                        'description':event.target['description'].value,
                        'relevance':event.target['relevance'].value.toString(),
                        'category':event.target['category'].value}
        console.log(`body`)
        console.log(body)
        addTodoRequest(body)
        props.hideForm()
    }
    
       return   (<>
    <div className="" >
<div className="modal-dialog">
  <div className="modal-content">
      <form onSubmit={addTodoHandler}>
    <div className="modal-header">
      <h5 className="modal-title" >Создание заметки</h5>
      <button type="button" className="btn-close" onClick={props.hideForm} ></button>
    </div>
    <div className="modal-body">
      <label>Название заметки</label>
      <br/>
      <input name="name" type="text" />
      <br/>
      <label>Описание заметки</label>
      <br/>
      <textarea name="description" />
      <br/>
      <label>Актуальна до</label>
      <br/>
      <input type="datetime-local"  name="relevance" />
      <br/>
      <label>Выберете категорию</label>
      <br/>
      <select name="category">
         {props.categories.map(categories=>{
           return <option value={categories.name} key={categories._id}>{categories.name}</option>
         })}
      </select>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" onClick={props.hideForm} >Отмена</button>
      <input  className="btn btn-primary" type="submit"  value="Добавить"/> 
    </div>
    </form>
  </div>
  
</div>
</div>
    </>
    )
   
}

export default AddTodoFormComponent


