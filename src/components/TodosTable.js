import React, {useState} from 'react';
import "./todosTable.css"
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";


function TodosTable({name, todos, id, addNewTodo}) {
    const [isShowNewTodoInput, setIsShowNewTodoInput] = useState(false)
    const [newTodo, setNewTodo] = useState("")

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return; // اگر تسک در جایی غیر از جدول‌ها رها شده باشد.
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return; // اگر مکان شروع و پایان یکسان باشد، نیازی به تغییر نیست.
        }

        // در اینجا می‌توانید تابعی که داده‌ها را آپدیت می‌کند، صدا بزنید.
        console.log('Source:', source);
        console.log('Destination:', destination);
    }



    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className={"table"}>
                <h2>{name}</h2>
                <Droppable droppableId={id} type="group">
                    {
                        (provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {todos.map((todo,index) => (
                                <Draggable draggableId={todo.id} index={index} key={index}>
                                    {
                                        (provided)=>(
                                            <p {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{todo.name}</p>
                                        )
                                    }
                                </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
                {
                    !isShowNewTodoInput ?
                        (<div className={"add_todo"} onClick={() => setIsShowNewTodoInput(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none"
                                 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                            <span>Add Todo</span>
                        </div>) :
                        (<div style={{marginTop: 10}}>
                            <input type="text" placeholder={"Todo ..."} value={newTodo}
                                   onChange={event => setNewTodo(event.target.value)}/>
                            <div style={{display: "flex", gap: 5, marginTop: 6}}>
                                <button onClick={() => {
                                    addNewTodo(newTodo, id)
                                    setIsShowNewTodoInput(false)
                                    setNewTodo("")
                                }}>Add Todo
                                </button>
                                <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                     stroke="currentColor" className="size-6"
                                     onClick={() => setIsShowNewTodoInput(false)}>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                                </svg>
                            </div>
                        </div>)
                }
            </div>
        </DragDropContext>
    );
}

export default TodosTable;