import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img onClick={handleShow} style={{cursor:'pointer'}} variant="top" src="https://figmaelements.com/wp-content/uploads/2020/11/figma-e-commerce-app.jpg" />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
      </Card.Body>
    </Card>

    {/* Modal */}
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'>
          <Row>
            <Col>
                <img src="https://figmaelements.com/wp-content/uploads/2020/11/figma-e-commerce-app.jpg" className='img-fluid' alt="" />
            </Col>
            <Col>
                <h4>{project.title}</h4>
                <h6><span className='text-info'>Description :</span>
                    {project.description}
                </h6>
                <h6><span className='text-info'>Languages :</span>
                    {project.languages}
                </h6>
                <div className='mt-3 d-flex gap-4'>
                    <a href="">
                        <i className="fa-brands fa-github" />
                    </a>
                    <a href="">
                        <i className="fa-solid fa-link" />
                    </a>

                </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default ProjectCard