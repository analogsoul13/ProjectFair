import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';

function Edit() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                            <input type="file" style={{display:'none'}} />
                            <img src="https://icon-library.com/images/add-image-icon-png/add-image-icon-png-14.jpg" className='img-fluid' alt="" />                            
                        </label>

                        </Col>
                        <Col>
                            <input type="text" placeholder='Title' className="form-control mb-3" />
                            <input type="text" placeholder='Description' className="form-control mb-3" />
                            <input type="text" placeholder='Languages Used' className="form-control mb-3" />
                            <input type="text" placeholder='Git Repository Link' className="form-control mb-3" />
                            <input type="text" placeholder='Demo Link' className="form-control" />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success">Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit