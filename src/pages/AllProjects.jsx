import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectsApi } from '../services/allApis'

function AllProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const getAllProjects = async()=>{
      try {
        const result = await getAllProjectsApi()
        setProjects(result.data)
        setLoading(false)
      } catch (err) {
        console.log(err)       
      }
    }
    getAllProjects()
  },[])

  if (loading) return <h1 className='text-center p-5'>Loading...</h1>;

  return (
    <>
    <Header />
    <div className="container-fluid mt-2 mb-2 p-5">
      <h3 className='text-center text-info'>All Projects</h3>
      <div className='row gap-5 justify-content-around p-5 mt-4'>
        {projects.length>0?(
          projects.map((item)=>(
            <ProjectCard project={item}/>
          ))
        ) : (
          <h1>No Projects Found !!</h1>
        )}
      </div>
    </div>
    </>
  )
}

export default AllProjects