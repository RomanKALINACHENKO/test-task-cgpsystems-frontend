import Notes from './NotesComponent'

function ContentTodoComponent(props){
  const editNoteHandler = props.editNoteHandler

    return (
        <div className="row p-3 bg-light">
        {
          props.categories.map(category =>{
            return (
            <div className="col-3" key={category._id}>
            <p>{category.name}</p>
              {
                props.notes.filter(note=>note.category === category.name).map(note=>
                   <Notes note={note} editNoteHandler={editNoteHandler}  /> )
                }
          </div>)
          }
          
          )
        }
</div>)

}

export default ContentTodoComponent



