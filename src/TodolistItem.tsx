import {type ChangeEvent} from 'react'
import type {FilterValues, Task, Todolist} from './App'
import {Button} from './Button'
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle: (todolistId: string, updateTitle: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        updateTaskTitle,
        updateTodolistTitle,
    } = props

    // const [taskTitle, setTaskTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)

    // const createTaskHandler = () => {
    //   const trimmedTitle = taskTitle.trim()
    //   if (trimmedTitle !== '') {
    //     createTask(id, trimmedTitle)
    //     setTaskTitle('')
    //   } else {
    //     setError('Title is required')
    //   }
    // }

    // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //   setTaskTitle(event.currentTarget.value)
    //   setError(null)
    // }

    // const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //   if (event.key === 'Enter') {
    //     createTaskHandler()
    //   }
    // }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const addTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        updateTodolistTitle(id, newTitle)
    }

    const updateTaskTitleHandler = (taskId: string, updateTitle: string) => {
        updateTaskTitle(id, taskId, updateTitle)
    }

    return (
        <div>
            <div className={'container'}>
                <EditableSpan oldTitle={title} onClick={updateTodolistTitleHandler}/>
                <Button title={'x'} onClick={deleteTodolistHandler}/>
            </div>
            <AddItemForm addItem={addTaskHandler}/>
            {/*<div>*/}
            {/*  <input className={error ? 'error' : ''}*/}
            {/*         value={taskTitle}*/}
            {/*         onChange={changeTaskTitleHandler}*/}
            {/*         onKeyDown={createTaskOnEnterHandler}/>*/}
            {/*  <Button title={'+'} onClick={createTaskHandler}/>*/}
            {/*  {error && <div className={'error-message'}>{error}</div>}*/}
            {/*</div>*/}
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
                        }

                        // const updateTaskTitleHandler = (updateTitle: string) => {
                        //     updateTaskTitle(id, task.id, updateTitle)
                        // }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                {/*<span>{task.title}</span>*/}
                                <EditableSpan oldTitle={task.title} onClick={(updateTitle)=>updateTaskTitleHandler(task.id, updateTitle)}/>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    )
}
