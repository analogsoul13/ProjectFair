import React from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'

function AllProjects() {
  return (
    <>
    <Header />
    <div className="container-fluid mt-2 mb-2 p-5">
      <h3 className='text-center text-info'>All Projects</h3>
      <div>
        <ProjectCard/>
      </div>
    </div>
    </>
  )
}

export default AllProjects