import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className='container-fluid p-4 bg-primary'>
      <Row>
        <Col className='p-5'>
          <h3>Project Fair 2024</h3>
          <p className='text-light mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, temporibus nihil possimus unde facilis similique cum placeat repellat optio id?</p>
        </Col>
        <Col className='p-5'>
          <h3>Links</h3>
          <div className='d-flex flex-column mt-4 justify-around'>
            <Link to={'/'} style={{textDecoration:'none'}} className='text-info'>Landing</Link>
            <Link to={'/auth'} style={{textDecoration:'none'}} className='text-info'>Login</Link>
          </div>
        </Col>
        <Col className='p-5'>
          <h3>Feedback</h3>
          <textarea name="" placeholder='Enter your message here..' className='form-control my-3' id=""></textarea>
          <button className='btn btn-dark'>Send</button>
        </Col>
      </Row>
    </div>
    </>
  )
}

export default Footer