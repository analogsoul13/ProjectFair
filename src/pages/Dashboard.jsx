import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import { Row, Col } from 'react-bootstrap';
import Add from '../components/Add';
import Edit from '../components/Edit';
import { deleteProjectApi, getProjectApi } from '../services/allApis';
import { responseContext } from '../contextapi/ContextProvider';
import { toast } from 'react-toastify';

function Dashboard() {
  const [view, setView] = useState(false);
  const [uname, setUname] = useState(''); // to display username on dashboard
  const [projects, setProjects] = useState([]);
  const { response } = useContext(responseContext);

  // Fetch projects data
  const getData = async () => {
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    };

    try {
      const res = await getProjectApi(header);
      if (res.status === 200) {
        setProjects(res.data); 
      } else {
        toast.error('Failed to fetch projects!');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Something went wrong while fetching projects.');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setUname(sessionStorage.getItem('user'));
    }
    getData();
  }, [response]);

  // Toggle profile section
  const changeView = () => {
    setView(!view);
  };

  // Delete project
  const handleDelete = async (id) => {
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    };

    try {
      const res = await deleteProjectApi(id, header);
      if (res.status === 200) {
        //toast.success('Project deleted successfully!');
        getData(); // Refresh projects list
      } else {
        toast.warning('Deletion failed!');
      }
    } catch (err) {
      console.err('Error deleting project:', error);
      toast.err('Failed to delete project!');
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid p-3">
        <Row>
          {/* Projects Section */}
          <Col md={8} sm={12}>
            <h3>Projects</h3>
            <div className="border border-3 border-primary p-2 shadow">
              <Add />
              <div className="my-2">
                {/* Render the list of projects */}
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <div
                      key={project._id}
                      className="border border-2 border-primary mb-3 d-flex justify-content-between align-items-center p-2"
                    >
                      <h4>{project.title}</h4>
                      <div className="d-flex align-items-center">
                        <a
                          href={project.github}
                          className="me-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-github fa-xl" />
                        </a>
                        <Edit item={project} />
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="btn text-danger"
                        >
                          <i className="fa-solid fa-trash fa-lg" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No projects available</p>
                )}
              </div>
            </div>
          </Col>

          {/* Profile Section */}
          <Col md={4} sm={12}>
            <div className="w-100 p-4 mt-3 border border-2 border-primary shadow">
              <div className="d-flex justify-content-between">
                <h4 className="text-info">Profile Updation</h4>
                <button onClick={changeView} className="btn">
                  {view ? (
                    <i className="fa-solid fa-angle-up" />
                  ) : (
                    <i className="fa-solid fa-angle-down" />
                  )}
                </button>
              </div>
              {view && (
                <div>
                  <label>
                    <input type="file" style={{ display: 'none' }} />
                    <img
                      src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
                      alt="User Profile"
                      className="img-fluid"
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control mb-3"
                  />
                  <input
                    type="text"
                    placeholder="GitHub Link"
                    className="form-control mb-3"
                  />
                  <input
                    type="text"
                    placeholder="LinkedIn Link"
                    className="form-control mb-3"
                  />
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-success">Update</button>
                    <button className="btn btn-danger">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
