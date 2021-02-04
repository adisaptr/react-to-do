import React, { useState, useContext } from 'react'
import { Collapse, Button, CardBody, Card, Input } from 'reactstrap';
import _ from 'lodash';
import { TodosContext } from './context/Todos';

export default function Inputform() {
    const data = { id: Math.floor(Math.random() * 1001), title: '', desc: '', createdAt: null, status: 0 }
    const [state, setState] = useState(data);
    const {todos, setTodos} = useContext(TodosContext);
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const submit = () => {
        let todayDate = new Date().toISOString().slice(0, 16);
        let splitDate = todayDate.split('T')
        let dateNow = splitDate[0] + ' ' + splitDate[1]
        let data1 = state
        data1.createdAt = dateNow
        if (todos.length) {
            let input = [...todos, data1]
            let todoLocal = _.orderBy(input, 'createdAt', 'desc')
            localStorage.setItem("todo", JSON.stringify(todoLocal));
            setTodos(todoLocal);
        } else {
            let input = [data1]
            let todoLocal = _.orderBy(input, 'createdAt', 'desc')
            localStorage.setItem("todo", JSON.stringify(todoLocal));
            setTodos(todoLocal);
        }
        setState(data)
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Button block outline color="primary" onClick={toggle} style={{ marginBottom: '1rem', borderRadius: '10px' }}> {!isOpen ? '+ Create Issue' : 'Close'}</Button>
            <Collapse isOpen={isOpen} className="listTodo">
                <Card style={{ marginBottom: '1rem', borderRadius: '10px' }}>
                    <CardBody>
                        <Input value={state.title} onChange={handleChange} name="title" placeholder="Title" style={{ marginBottom: '1rem' }}></Input>
                        <Input value={state.desc} onChange={handleChange} type="textarea" name="desc" placeholder="Description" style={{ marginBottom: '1rem' }}></Input>
                        <Button disabled={state.title !== '' && state.desc !== '' ? false : true} block color="primary" onClick={submit} style={{ marginBottom: '1rem', borderRadius: '10px' }}>Save</Button>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}
