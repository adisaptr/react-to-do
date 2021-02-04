import React from 'react'
import './css/Todo.css'
import { useState, useEffect } from "react";
import Inputform from './Input';
import List from './List';
import { TodosContext } from './context/Todos';
import _ from 'lodash';

export default function Todo() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getLocal();
    }, []);
    const getLocal = () => {
        if (localStorage.getItem("todo") !== null) {
            let todoLocal = JSON.parse(localStorage.getItem("todo"));
            setTodos(_.orderBy(todoLocal, 'createdAt', 'desc'));
        }
    };
    return (
        <div className="container">
            <TodosContext.Provider value={{ todos, setTodos }}>
                <div className="col">
                    <div className="headerText">Todo<br />{todos.filter(function (item) {
                        if (item.status === 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }).length}</div>
                    <hr />
                    <Inputform />
                    {todos.map(data => data.status === 0 ?
                        <List data={data} disableDetail={false} />
                        : []
                    )}

                </div>

                <div className="col">
                    <div className="headerText">On Progress<br />{todos.filter(function (item) {
                        if (item.status === 1) {
                            return true;
                        } else {
                            return false;
                        }
                    }).length}</div>
                    <hr />
                    {todos.map(data => data.status === 1 ?
                        <List data={data} disableDetail={false} />
                        : []
                    )}
                </div>

                <div className="col">
                    <div className="headerText">Done<br />{todos.filter(function (item) {
                        if (item.status === 2) {
                            return true;
                        } else {
                            return false;
                        }
                    }).length}</div>
                    <hr />
                    {todos.map(data => data.status === 2 ?
                        <List data={data} disableDetail={true} />
                        : []
                    )}
                </div>
            </TodosContext.Provider>
        </div>
    )
}
