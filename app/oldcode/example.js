import { useState } from "react"
import './styles/styles.css'

const Index = () => {

  const [userInput, SetUserInput] = useState('')
  const [ToDoList, SetToDoList] = useState([])

  const handleDelete = (task) => {
    const updatedArray = ToDoList.filter(item => item !== task)
    SetToDoList(updatedArray)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    SetUserInput('')
    SetToDoList([
        userInput,
        ...ToDoList
    ])
    
  }

  const handleChange = (e) => {
    e.preventDefault()
    SetUserInput(e.target.value)
    console.log(userInput)
  }
    
  return (
    <div>
        <h1>to do list</h1>
        <form>
            <input type = "text" onChange ={handleChange}/>
            <button value = {userInput} onClick = {handleSubmit}>submit</button>
        </form>
        <ul>
            {
                ToDoList.length > 0 ? ToDoList.map((task, index) => {
                    return <li key = {index}>
                        {task}<button onClick = {(e) => {
                          e.preventDefault()
                          handleDelete(task)
                        }}>delete</button>
                    
                    </li>
                }
                )
                : "enter task"
            }
        </ul>
    </div>
  )
}

export default Index