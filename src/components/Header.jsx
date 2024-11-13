import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logContext } from '../contextapi/AuthContext';

function Header() {

  const [uname, setUname] = useState("")
  // for displaying or not to display logout btn
  const [loginStatus, setLoginStatus] = useState(false)

  const nav = useNavigate()

  const {setLogStatus} = useContext(logContext)

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoginStatus(true)
    }
    else {
      setLoginStatus(false)
    }
  })

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setUname(sessionStorage.getItem('user'))
    }
  })

  const logout = () => {
    sessionStorage.clear()
    toast.info("User Logged Out!!")
    nav('/')
    setLogStatus(false)

  }

  const handleClick = ()=>{
    nav('/auth')
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
            {
              loginStatus ?
                <Navbar.Text>
                  Signed in as: <a href="#login" style={{ textDecoration: 'none' }}>{uname}</a>
                  <button onClick={logout} className='btn ms-4'>
                    <i className="fa-solid fa-right-from-bracket" style={{ color: "#000000", }} />
                  </button>
                </Navbar.Text>
                :
                <Navbar.Text>
                  Login / Register <a href="#login" style={{ textDecoration: 'none' }}>{uname}</a>
                  <button onClick={handleClick} className='btn ms-2'>
                    <i className="fa-solid fa-user-plus" style={{ color: "#000000", }}/>
                  </button>
                </Navbar.Text>
            }




          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header