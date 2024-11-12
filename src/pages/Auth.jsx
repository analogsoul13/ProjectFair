import React, { useState } from 'react'
import { Row, Col, FormControl, FloatingLabel } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { loginApi, registerApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const [authStatus, setAuthStatus] = useState(false)
  const [user, setUser] = useState({
    email: "", username: "", password: ""
  })

  const nav = useNavigate()

  const changeAuth = () => {
    setAuthStatus(!authStatus)
  }

  const handleRegister = async () => {
    console.log(user);
    const { email, username, password } = user
    if (!email || !username || !password) {
      toast.warning("Enter Valid Data!!")
    }
    else {
      const res = await registerApi(user)
      console.log(res)
      if (res.status == 201) {
        toast.success("Registration Succesful!!")
        changeAuth()
        setUser({
          email: "", username: "", password: ""
        })
      }
      else {
        if (res.response.data) {
          toast.error(res.response.data)
        }
        else {
          toast.error("Something went wrong!!")
        }
      }
    }

  }

  const handleLogin = async () => {
    const { email, password } = user
    if (!email || !password) {
      toast.warning("Enter Valid Data!!")
    }
    else {
      const res = await loginApi(user)
      if (res.status == 200) {
        toast.success("Login Succesful!!")
        setUser({
          email: "", username: "", password: ""
        })
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('user', res.data.username)
        sessionStorage.setItem('profile', res.data.profile)
        sessionStorage.setItem('linkedin', res.data.linkedin)
        sessionStorage.setItem('github', res.data.github)
        nav('/')
      }
      else {
        toast.error("Login Failed !!")
      }
    }
  }

  return (
    <>
      <div className="container-fluid w-100 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="w-75 border border-2 border-primary shadow p-3">
          <Row>
            <Col>
              <img src="https://i.pinimg.com/originals/d1/54/66/d154660a6ae3104de2b0a314667a5ab6.png" className='img-fluid' alt="" />
            </Col>
            <Col className='d-flex flex-column justify-content-center px-5'>

              {authStatus ?
                <h4>User Registration</h4>
                :
                <h4>Login</h4>
              }

              <div className='my-3'>
                <FloatingLabel controlId='floatingInput' label="Email Address" className='mb-3'>
                  <FormControl value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type='email' placeholder='name@example.com' />
                </FloatingLabel>

                {
                  authStatus &&
                  <FloatingLabel controlId='floatingInputUsr' label="Username" className='mb-3'>
                    <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type='text' placeholder='Name' />
                  </FloatingLabel>
                }

                <FloatingLabel controlId='floatingPassword' label="Password" className='mb-3'>
                  <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type='password' placeholder='Password' />
                </FloatingLabel>

              </div>

              <div className='d-flex gap-3'>
                {
                  authStatus ?
                    <button onClick={handleRegister} className='btn btn-primary'>Register</button>
                    :
                    <button onClick={handleLogin} className='btn btn-primary'>Login</button>
                }

                <button onClick={changeAuth} className='btn btn-link text-info'>
                  {
                    authStatus ?
                      <>Already a user?</>
                      :
                      <>New User?</>
                  }
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Auth