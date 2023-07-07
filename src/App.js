// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import * as React from "react";
import './App.css';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
import { Todos } from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/About';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Contact from './components/Contact';



function App() {
    let initTodo;
    if (localStorage.getItem('todos') === null) {
        initTodo = [];
    } else {
        initTodo = JSON.parse(localStorage.getItem("todos"));
    }


    const onDelete = (todo) => {
        console.log("I am Ondelete", todo);
        setTodos(todos.filter((e) => {
            return e !== todo;
        }));
        // localStorage.getItem("todos");
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    const addTodo = (title, desc) => {
        console.log("I am adding this todo", title, desc);
        let sno;
        if (todos.length === 0) {
            sno = 1;
        }
        else {
            sno = todos[todos.length - 1].sno + 1;
        }
        const myTodo = {
            sno: sno,
            title: title,
            desc: desc
        }
        setTodos([...todos, myTodo]);
        console.log(myTodo);


        // if(localStorage.getItem("todos")){
        // localStorage.setItem("todos", JSON.stringify(todos));
        // }
    }

    // const [todos,setTodos]=useState([
    // {
    //   sno: 1,
    //   title: "Go to the market",
    //   desc: "You need to go to the market to get this job done"
    // },
    // {
    //   sno: 2,
    //   title: "Go to the mall",
    //   desc: "You need to go to the mall to get this job done2"
    // },
    // {
    //   sno: 3,
    //   title: "Go to the ghat",
    //   desc: "You need to go to the ghat to get this job done2"
    // },
    // ]);

    const [todos, setTodos] = useState(initTodo);
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <div>
                    <AddTodo addTodo={addTodo} />
                    <Todos todos={todos} onDelete={onDelete} />
                </div>
            ),
        },
        {
            path: "about",
            element: <About/>,
        },
        {
            path: "contact",
            element: <Contact/>,
        },
    ]);


    return (
        <>
            <Navbar title="To Dos List" searchBar={true} />
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
            <Footer />
        </>
    );
}

export default App;
