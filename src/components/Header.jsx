import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {

  const [uname,setUname] = useState("")
  
  const nav = useNavigate()

  useEffect(() => {
    if(sessionStorage.getItem('user')) {
      setUname(sessionStorage.getItem('user'))
    }
  })
  
  const logout = ()=>{
    sessionStorage.clear()
    nav('/')

  }

  return (
    <>
      <Navbar className="navbar bg-light">
        <Container>
          <Navbar.Brand href="/">
            <i className="fa-solid fa-xl fa-laptop-file" />"

            {' '}
            Project Fair
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login" style={{textDecoration:'none'}}>{uname}</a>
            </Navbar.Text>
            <button onClick={logout} className='btn ms-4'>
              <i className="fa-solid fa-right-from-bracket" style={{color: "#000000",}} />
            </button>
              
 
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header