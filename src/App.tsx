import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';


type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'Rest API', isDone: false},
    //     {id: v1(), title: 'GraphQL', isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'API', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
        ], // tasks[0],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'API', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
        ]
    });

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }


    function removeTask(todolistsId: string, taskId: string) {
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
        setTasks({...tasks, [todolistsId]: tasks[todolistsId].filter(el => el.id !== taskId)})
    }


    function addTask(todolistsId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
        setTasks({...tasks, [todolistsId]: [...tasks[todolistsId], task]})
    }

    function changeStatus(todolistsId: string, taskId: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
        setTasks({
            ...tasks, [todolistsId]: [...tasks[todolistsId].map(el => {
                return el.id === taskId ? {...el, isDone: isDone} : el
            })]
        })
    }


    // let tasksForTodolist = tasks;
    //
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    function changeFilter(todolistsId: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistsId ? {...el, filter: value} : el))
        //setFilter(value)
    }


    return (
        <div className="App">
            {todolists.map((todolist) => {
                let tasksForTodolist = tasks[todolist.id];

                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone === true);
                }
                return <Todolist key={todolist.id}
                                 todolistsId={todolist.id}
                                 title={todolist.title}
                                 tasks={tasksForTodolist}
                                 removeTodolist={removeTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={todolist.filter}
                />
            })}
        </div>
    );
}

export default App;
