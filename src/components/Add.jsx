import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProjectApi } from '../services/allApis';

function Add() {
    const [show, setShow] = useState(false);
    const [project, setProject] = useState({
        title: "", description: "", languages: "", github: "", demo: "", image: ""
    });

    const [preview, setPreview] = useState("");

    const handleProjectAdd = async () => {
        console.log(project);
        const {title, description, languages, github, demo, image} = project

        if(!title || !description || !languages || !github || !demo || !image){
            toast.warning("Invalid Data")
        }
        else{
            
            const fd = new FormData()
            fd.append('title',title)
            fd.append('description',description)
            fd.append('languages',languages)
            fd.append('github',github)
            fd.append('demo',demo)
            fd.append('image',image)

            // const header = {
            //     'Content-Type' : "multipart/form-data",
            //     'Authorization' : `Token ${sessionStorage.getItem('token')}`
            // }

            const header = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}` // or "Token" based on backend requirement
            };
            
            
            const res = await addProjectApi(fd,header)
            console.log(res)
            if(res.status==200){
                toast.success("Project Added Succesfully")
                setProject({ title: "", description: "", languages: "", github: "", demo: "", image: "" });
                setPreview("");              
                handleClose()
            }
            else{
                toast.error("Failed to Add !!")
            }
        }
       
    }

    useEffect(() => {
        if (project.image) {
            setPreview(URL.createObjectURL(project.image));
        } else {
            setPreview("");
        }
    }, [project.image]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='btn btn-info' onClick={handleShow}>
                Add Project
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark'>
                    <Row>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <label>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setProject({ ...project, image: e.target.files[0] })}
                                />
                                {preview ? (
                                    <img src={preview} className='img-fluid' alt="Preview" />
                                ) : (
                                    <img src="http://www.pngall.com/wp-content/uploads/2/Upload-PNG.png" className='img-fluid' alt="Upload" />
                                )}
                            </label>
                        </Col>
                        <Col>
                            <input
                                type="text"
                                placeholder='Title'
                                className="form-control mb-3"
                                onChange={(e) => setProject({ ...project, title: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder='Description'
                                className="form-control mb-3"
                                onChange={(e) => setProject({ ...project, description: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder='Languages Used'
                                className="form-control mb-3"
                                onChange={(e) => setProject({ ...project, languages: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder='Git Repository Link'
                                className="form-control mb-3"
                                onChange={(e) => setProject({ ...project, github: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder='Demo Link'
                                className="form-control"
                                onChange={(e) => setProject({ ...project, demo: e.target.value })}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleProjectAdd} variant="success">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Add;
