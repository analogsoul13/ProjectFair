import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectsApi, searchProjectApi } from '../services/allApis'

function AllProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [key, setKey] = useState("")

  useEffect(()=>{
    const getAllProjects = async()=>{
      try {
        const result = await searchProjectApi(key)
        setProjects(result.data)
        setLoading(false)
      } catch (err) {
        console.log(err)       
      }
    }
    getAllProjects()
  },[key])

  if (loading) return <h1 className='text-center p-5'>Loading...</h1>;

  return (
    <>
    <Header />
    <div className="container-fluid mt-2 mb-2 p-5">
      <div className="d-flex justify-content-between">
        <h3 className='text-center text-info'>All Projects</h3>
        <input onChange={(e)=>setKey(e.target.value)} type="text" placeholder='Search with languages' className='form-control w-25' />
      </div>
      
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