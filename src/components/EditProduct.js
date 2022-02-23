
import React, { Component, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import api from '../api/connectDB';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import FileBase64 from 'react-file-base64';




export class EditPage extends React.Component {
    constructor(props) {
        super(props)
        // this.fileInput = React.createRef();
        this.state = {
            files: [],
            items: [],
            isLoading: false,
            showModal: false,
            setValidate: false,
            validated: false,
            modalType: "",
            id: "",
            title: "",
            image: [],
            price: 0,
            category: "",
            description: "",
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true })

        await api.getAllItems().then(items => {
            this.setState({
                items: items.data.data,
                isLoading: false,
            })
        })
    }


    handleClose = () => this.setState({ showModal: false });

    handleShow = (item, modalType) => {
        this.setState({ showModal: true, modalType: modalType });
        if(modalType=== "edit") {
            console.log(item)
            this.setState({
                id: item._id,
                title: item.title,
                image: item.image,
                price: item.price,
                category: item.category,
                description: item.description,
            })
        }
    };

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        // const files = this.fileInput.current.files
        // const fileArray = []
        // for (var i = 0; i < files.length; i++) {
        //     fileArray.push(files[i])
        // }
        // this.setState({ image: fileArray })

        this.setState({
            [name]: value
        })
    }

    handleImage = (base64) => {
        const fileArray = []
        for (var i = 0; i < base64.length; i++) {
            fileArray.push(base64[i].base64)
        }
        this.setState({ image: fileArray })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const { id, title, image, price, category, description } = this.state
        const payload = { title, image, price, category, description }

        if (form.checkValidity() === true) {
            this.handleClose()
            if (this.state.modalType === "add") {
                api.insertItem(payload).then(res => {
                    window.alert(`Product added`)
                    window.location.reload(true)
                    this.setState({
                        id: "",
                        title: "",
                        image: [],
                        price: 0,
                        category: "",
                        description: "",
                    })
                })
            }
            else {
                api.updateItemById(id, payload).then(res => {
                    window.location.reload(true)
                    this.setState({
                        id: "",
                        title: "",
                        image: [],
                        price: 0,
                        category: "",
                        description: "",
                    })
                })
            }
        }

        this.setState({ setValidate: true, validated: true })
    }

    renderList = (items) => {


        return items.map((item) => {
            return (
                <tr>
                    <td>{item._id}</td>
                    <td>{item.title}</td>
                    <td>
                        {item.image.map((i) => {
                            return (<img src={i} style={{height:"100px"}} alt="product"/>)
                        })}
                    </td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td><Button variant="warning" onClick={() => this.handleShow(item, "edit")}><FaPencilAlt /></Button></td>
                    <td><DeleteItem id={item._id} title={item.title} /></td>
                </tr>
            )
        })

    }

    render() {
        const { items, isLoading } = this.state
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList(items)}
                    </tbody>
                </Table>
                <Button variant="primary" onClick={() => this.handleShow(this,"add")}>
                    Add Item
                </Button>

                <Modal
                    show={this.state.showModal}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >

                    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title> {this.state.modalType === "add" ? "Add" : "Edit"} Item</Modal.Title>
                        </Modal.Header>

                        < Modal.Body >
                        
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control placeholder="Name of product" type="text" required name="title" onChange={this.handleChange} defaultValue={this.state.modalType==="edit" ? this.state.title : null}/>
                                
                                {/* <Form.Control placeholder="Image File" type="file" multiple ref={this.fileInput} onChange={this.handleChange} /> */}
                                <Form.Label>Price</Form.Label>
                                <Form.Control placeholder="$" type="number" step="0.01" required name="price" onChange={this.handleChange} defaultValue={this.state.modalType==="edit" ? this.state.price : null}/>
                                <Form.Label>Category</Form.Label>
                                <Form.Control placeholder="Product category" type="text" required name="category" onChange={this.handleChange} defaultValue={this.state.modalType==="edit" ? this.state.category : null}/>
                                {/* TODO: Add tags */}
                                {/* <Form.Label>Tags</Form.Label>
                                <Form.Control placeholder="Product tags" type="text"/> */}
                                <Form.Label>Description</Form.Label>
                                <Form.Control placeholder="Prdouct description" as="textarea" name="description" onChange={this.handleChange} defaultValue={this.state.modalType==="edit" ? this.state.description : null}/>
                                <Form.Label>Image</Form.Label>
                                <FileBase64 multiple={true} onDone={this.handleImage.bind(this)} />
                            </Form.Group>
                            

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">{this.state.modalType === "add" ? "Add" : "Edit"}</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>


            </div >
        )
    }
}

class DeleteItem extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Are you sure you want to delete ${this.props.title} permanently?`,
            )
        ) {
            api.deleteItemById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Button variant="danger" onClick={this.deleteUser}><FaTrashAlt /></Button>
    }
}

// export function EditPage2() {


//     const handleNewItems = e => {
//         api.getAllItems().then(items => {
//             items.data.data.forEach( item => {
//                 setItem(item)
//                 console.log(item)
//             });
//             // setItem(item.data.data)
//         })
//     }

//     const [items, setItem] = useState(handleNewItems)


//     return (
//         <div>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Title</th>
//                         <th>Image</th>
//                         <th>Price</th>
//                         <th>Category</th>
//                         <th>Description</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 <tr>
//                     <td>{}</td>
//                     <td>{}</td>
//                     <td>
//                         {/* <ul>
//                             <li>{}</li>
//                             {item.image[1] &&
//                                 <li>{item.image[1]}</li>
//                             }
//                         </ul> */}
//                     </td>
//                     <td>{}</td>
//                     <td>{}</td>
//                     <td>{}</td>
//                     {/* <td><UpdateItem id={item._id} /></td>
//                     <td><DeleteItem id={item._id} title={item.title} /></td> */}
//                 </tr>
//                 </tbody>
//             </Table>
//             <Button variant="primary" onClick={console.log("add button clicked")}>
//                 Add Item
//             </Button>
//         </div>
//     )
// }