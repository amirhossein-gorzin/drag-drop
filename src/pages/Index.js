import React, {useEffect, useState} from 'react';
import data from "../data";
import TodosTable from "../components/TodosTable";
import {useNavigate} from "react-router-dom";

function Index() {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [username, setUsername] = useState("")
    const [userTodosTables, setUserTodosTables] = useState([])

    useEffect(() => {
        // getting userId from localStorage
        let userId = JSON.parse(localStorage.getItem("user"))
        let user = data.users.find(user => user.id === userId)
        if(!user){
            return navigate("/login")
        }
        setUser(user)
        setUsername(user.name)
        setUserTodosTables(user.todosTables)
    },[])

    function addNewTodo(todo, id) {
        let tables = [...userTodosTables]
        let todoTableIndex = userTodosTables.findIndex(table => table.id===id)
        let newTodo = {id:crypto.randomUUID(),name:todo}
        tables[todoTableIndex].todos.push(newTodo)
        setUserTodosTables(tables)
    }


    return (
        <>
            <span>welcome {username}</span>
            <hr/>
            <div className={"tables__wrapper"}>
                {
                    userTodosTables.map(Table => (
                        <TodosTable {...Table} addNewTodo={addNewTodo}/>
                    ))
                }
            </div>
        </>
    );
}

export default Index;