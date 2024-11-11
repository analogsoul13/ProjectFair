import React from 'react'
import { useState } from 'react'

function Profile() {
    const [view, setView] = useState(false);
    // Toggle profile section
    const changeView = () => {
        setView(!view);
    };
    return (
        <>
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
        </>
    )
}

export default Profile