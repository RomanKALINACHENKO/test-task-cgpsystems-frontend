import {useState} from 'react'
import AddCategFormComponent from '../components/AddCategFormComponent'
import {useHistory} from "react-router-dom"
function HeaderComponent(props){

    const history = useHistory()
    

    const addCategoryHandler= props.addCategoryHandler
    console.log(`props.categories`)
    console.log(props.categories)
    function CategoryPattern(categories){
        
        if(categories.length === 0){
            return (<div>
            Категории отсутствуют
            </div>)
        }
        return categories.map(function(categ){
                   return(
                    <div className="col-2" key={categ._id}>
      <button className="btn btn-primary" >{categ.name}</button> 
                    </div>
                   ) 
                })
           
    }
    const  Category = CategoryPattern.bind(null,props.categories)
    console.log(Category)
    const [createCategFormVisible, setCreateCategFormVisible] = useState(false);
    const createCategHandler = ()=>{
        setCreateCategFormVisible((state)=>{return true})
    }
    const hideCategForm = ()=>{
        setCreateCategFormVisible((state)=>{return false})
    }

    return (
        <>
        {!createCategFormVisible && 
        <div className="row bg-info  p-3">
    <div className="col-2">
      <button className="btn btn-primary" onClick={()=>{
          history.push('all')
      }} >
          Все заметки</button> 
      </div>
      {!!(props.categories.length === 0) && <Category/>}
      
    <div className="col-2">
    <button className="btn btn-primary" onClick={createCategHandler}> Создать категорию</button>
    
    </div>
    <div className="col-2">
    <select  className="btn btn-dark" onChange={
        (event)=>{
            //event.preventDefault()
           
            history.push(event.target.value)
        }
        
    }> 
    <option value="all" >Выбрать категорию</option>
    {
        props.categories.map(function(categ){
            return(
                
                <option key={categ._id} value={categ.name}>
                            {categ.name}
                            </option>
                    
                
            ) 
         })
    }
    </select>
    
    </div>
    
    </div>}
    {
       !!createCategFormVisible && 
       <AddCategFormComponent addCategoryHandler={addCategoryHandler} hideForm={hideCategForm} />
   }
    </>
    )


    
}

export default HeaderComponent
