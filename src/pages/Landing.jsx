import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { useEffect, useState } from 'react'
import { getAllProjectsApi } from '../services/allApis'

function Landing() {
    const [logStatus, setLogStatus] = useState(false)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setLogStatus(true)
        }
        else {
            setLogStatus(false)
        }
    }, [])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const result = await getAllProjectsApi()
                //console.log(result)
                setProjects(result.data)
            } catch (err) {
                console.log(err)
                res.status(400).json("Failed to Load !")

            }
        }
        fetchProjects()
    }, [])

    const displayProjects = projects.slice(0,3)

    return (
        <>
            {/* Intro */}
            <div className="d-flex justify-content-center align-items-center container-fluid" style={{ height: '90vh' }}>
                <Row>
                    <Col className='d-flex p-5 flex-column justify-content-center'>
                        <h1 className='text-info'>Project Fair</h1>
                        <p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, accusamus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non architecto ipsum officia, delectus quam laboriosam, sit nesciunt laudantium reprehenderit sequi ex, consequatur iste veritatis dolorem commodi. Quasi dolor error quos.</p>
                        <div>
                            {
                                logStatus ?
                                    <Link to={'/dash'} className='btn btn-light'>Go to Dashboard</Link>
                                    :
                                    <Link to={'/auth'} className='btn btn-light'>Start to Explore</Link>

                            }
                        </div>

                    </Col>
                    <Col>
                        <img src="https://www.mindstacksolutions.com/wp-content/uploads/2023/10/website-development.png" alt="" className='img-fluid' />
                    </Col>
                </Row>
            </div>

            {/* All projects section */}
            <div className='container-fluid'>
                <h2 className='text-center'>Sample Projects</h2>
                <div className='d-flex justify-content-around p-5 mt-4'>
                    {displayProjects.length>0?(
                        displayProjects.map((item)=>(
                            <ProjectCard project={item}/>
                        ))
                    ):(
                        <p>No Projects Found</p>
                    )}

                </div>
                <div className='text-center mb-4'>
                    <Link className='btn' to={'/projects'}>View More</Link>
                </div>

            </div>
        </>
    )
}

export default Landing