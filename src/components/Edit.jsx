import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import base_url from '../services/base_url';
import { updateProjectApi } from '../services/allApis';
import { responseContext } from '../contextapi/ContextProvider';

function Edit({item}) {
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState()
    const [data, setData] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        setData({...item})
    },[])

    useEffect(()=>{
        if(data.image?.type){
            setPreview(URL.createObjectURL(data.image))
        }
        else{
            setPreview("")
        }
    },[data.image])


    const handleEdit = async ()=>{
        console.log(data)
        const {title, description, languages, github, demo, image} = data
        if(!title || !description || !languages || !github || !demo || !image){
            toast.warning("Invalid Data !!")
        }
        else{
            if(data.image.type){
                const fd = new FormData()
                fd.append('title',title)
                fd.append('description',description)
                fd.append('languages',languages)
                fd.append('github',github)
                fd.append('demo',demo)
                fd.append('image',image)

                const header = {
                    'Content-Type' : "multipart/form-data",
                    'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
                }

                const res = await updateProjectApi(data._id,header,fd)
                console.log(res)
                if(res.status==200){
                    toast.success("Project Updated Succesfully!")
                    handleClose()
                }
                else{
                    toast.error("Failed to Add")
                }
            }
        }
        
    }


    return (
        <>
        <button onClick={handleShow} className='btn'>
            <i className="fa-solid fa-pen-to-square fa-lg" />
        </button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark'>
                    <Row>
                        <Col className='d-flex justify-content-center align-items-center'>
                        <label>
                            <input type="file" onChange={(e)=>setData({...data,image:e.target.files[0]})} style={{display:'none'}} />
                            <img src={preview?preview:`${base_url}/upload/${data.image}`} className='img-fluid' alt="" />                            
                        </label>

                        </Col>
                        <Col>
                            <input onChange={(e)=>setData({...data,title:e.target.value})} type="text" defaultValue={data.title} className="form-control mb-3" />
                            <input onChange={(e)=>setData({...data,description:e.target.value})}  type="text" defaultValue={data.description} className="form-control mb-3" />
                            <input onChange={(e)=>setData({...data,languages:e.target.value})}  type="text" defaultValue={data.languages} className="form-control mb-3" />
                            <input onChange={(e)=>setData({...data,github:e.target.value})}  type="text" defaultValue={data.github} className="form-control mb-3" />
                            <input onChange={(e)=>setData({...data,demo:e.target.value})}  type="text" defaultValue={data.demo} className="form-control" />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleEdit} variant="success">Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit