import {useCallback, useEffect, useState} from 'react'
import HeaderComponent from './components/HeaderComponent'
import ContentTodoComponent from './components/ContentTodoComponent'
import AddTodoButtonComponent from './components/AddTodoButtonComponent'
import {useHttp} from './hooks/http.hook'
import {useParams} from "react-router-dom"


import './App.css';

function App() {
  const { category } = useParams()
  

  const [notes, setNotes] = useState([])
  const [categories, setCategories] = useState([]) 
  const {request} = useHttp()
  const getNotesData = useCallback( async()=>{
    try { 
    const fetchedData = await request(`${process.env.REACT_APP_API}/api/notes/${category?category:'all'}`, 'GET', null, {})
      const data = fetchedData
       setNotes(data.notes)
       setCategories(data.categories)

    } catch (e) {
      console.log('have some problem on fedched data'+ e)
    }
  },[ request, category])

  useEffect(()=>{
    getNotesData()
    
  },[getNotesData])

  return (
    <div className="container">
  <HeaderComponent addCategoryHandler={getNotesData}
  categories={categories} />
<ContentTodoComponent categories={categories} editNoteHandler={getNotesData} notes={notes} />
  <AddTodoButtonComponent addNoteHandler={getNotesData} categories={categories} />
</div>
  )
}

export default App
