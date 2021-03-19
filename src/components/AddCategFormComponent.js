import {useHttp} from '../hooks/http.hook'



function AddCategFormComponent(props) {

  const {request} = useHttp()
  const addCategoryHandler = props.addCategoryHandler
  const addCategoryRequest = async(body)=>{
    try { 
    const fetchedData = await request(`/api/categories/createcategory`, 'POST', body)
      const data = fetchedData
      addCategoryHandler(data)
    console.log(data)
    } catch (e) {
      console.log('have some problem on fedched data'+ e)
    }
  }
  


    const addCategHandler = (event)=>{
        event.preventDefault()
        console.log(`event.preventDefault()`)
        const  body  = {'name':event.target['nameCategory'].value}
        addCategoryRequest(body)
        
        props.hideForm()
    }
    
       return   (<>
    <div className="" >
<div className="modal-dialog">
  <div className="modal-content">
      <form onSubmit={addCategHandler}>
    <div className="modal-header">
      <h5 className="modal-title" >Создание категории</h5>
      <button type="button" className="btn-close" onClick={props.hideForm} ></button>
    </div>
    <div className="modal-body">
      <label>Название категории</label>
      <br/>
      <input type="text" name="nameCategory" />
      <br/>
      
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

export default AddCategFormComponent


