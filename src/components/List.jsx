import React, { useState } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import _ from 'lodash';

export default function List({ data, todos, setTodos, disableDetail }) {
    const data1 = { id: data.id, title: data.title, desc: data.desc, createdAt: data.createdAt, status: data.status }
    const [state, setState] = useState(data1);

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleChangeStatus = e => {
        setState(prevState => ({
            ...prevState,
            status: parseInt(e.target.defaultValue)
        }));
    }

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal)
        setState(data1)
    };
    const updateTodo = () => {
        let previus = todos.filter((el) => el.id !== data.id)
        let update = [...previus, state]
        let todoLocal = _.orderBy(update, 'createdAt', 'desc')
        localStorage.setItem("todo", JSON.stringify(todoLocal));
        setTodos(todoLocal);
        setModal(!modal)
    };
    const delTodo = () => {
        let previus = todos.filter((el) => el.id !== data.id)
        setTodos(_.orderBy(previus, 'createdAt', 'desc'));
        localStorage.setItem("todo", JSON.stringify(previus));
    };
    return (
        <div>
            <ListGroup style={{ borderRadius: '10px' }}>
                {disableDetail ?
                    <ListGroupItem className="listTodo">
                        <ListGroupItemHeading>{data.title}</ListGroupItemHeading>
                        <ListGroupItemText>
                            {data.desc}
                        </ListGroupItemText>
                        <Button style={{ borderRadius: '10px' }} outline color="danger" onClick={delTodo}><BsFillTrashFill /></Button>
                    </ListGroupItem>
                    :
                    <ListGroupItem className="listTodo">
                        <ListGroupItemHeading>{data.title}</ListGroupItemHeading>
                        <ListGroupItemText>
                            {data.desc}
                        </ListGroupItemText>
                        <Button style={{ borderRadius: '10px' }} outline color="primary" onClick={toggle}><BsPencil /></Button>{' '}
                        <Button style={{ borderRadius: '10px' }} outline color="danger" onClick={delTodo}><BsFillTrashFill /></Button>
                    </ListGroupItem>
                }
            </ListGroup>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Detail</ModalHeader>
                <ModalBody>
                    <Input value={state.title} onChange={handleChange} name="title" id="title" placeholder="Title" style={{ marginBottom: '1rem' }}></Input>
                    <Input value={state.desc} onChange={handleChange} type="textarea" name="desc" id="description" placeholder="Description"></Input>
                    <FormGroup check style={{ display: data.status === 0 ? 'none' : 'block' }}>
                        <Label check>
                            <Input type="radio" name="status" value="0" onChange={handleChangeStatus} />{' '}
                            Mark as Todo
                        </Label>
                    </FormGroup>
                    <FormGroup check style={{ display: data.status === 1 ? 'none' : 'block' }}>
                        <Label check>
                            <Input type="radio" name="status" value="1" onChange={handleChangeStatus} />{' '}
                            Mark as In Progress
                        </Label>
                    </FormGroup>
                    <FormGroup check style={{ display: data.status === 2 ? 'none' : 'block' }}>
                        <Label check>
                            <Input type="radio" name="status" value="2" onChange={handleChangeStatus} />{' '}
                            Mark as Done
                        </Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={updateTodo}>Update</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
