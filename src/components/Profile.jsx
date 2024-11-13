import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import base_url from '../services/base_url';
import { updateProfileApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logContext } from '../contextapi/AuthContext';

function Profile() {
    const [view, setView] = useState(false);
    const [details,setDetails] = useState({
        username:"", github:"", linkedin:"", profile:""
    })
    const [preview, setPreview] = useState()

    const nav = useNavigate()
    const {setLogStatus} = useContext(logContext)

    // Toggle profile section
    const changeView = () => {
        setView(!view);
    };

    useEffect(()=>{
        if(sessionStorage.getItem('user')){
            setDetails({username:sessionStorage.getItem('user'),github:sessionStorage.getItem('github'),linkedin:sessionStorage.getItem('linkedin'),profile:sessionStorage.getItem('profile')})
        }
    },[])

    // Image Preview
    useEffect(()=>{
        if(details.profile.type){
            setPreview(URL.createObjectURL(details.profile))
        }
        else{
            setPreview("")
        }
    },[details?.profile])

    // UpdateProfile
    const handleUpdate =async()=>{
        console.log(details)
        const {username, github, linkedin, profile} = details
        if(!username || !github || !linkedin || !profile){
            toast.warning("Enter valid inputs !!")
        }
        else{
            if(profile.type){
                const fd = new FormData()
                fd.append('username', username)
                fd.append('github', github)
                fd.append('linkedin', linkedin)
                fd.append('profile', profile)

                const header = {
                    'Content-Type' : 'multipart/form-data',
                    'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
                }

                const result = await updateProfileApi(header,fd)
                if(result.status==200){
                    toast.success("Profile Updation Successful!!")
                    sessionStorage.clear()
                    setLogStatus(false)
                    nav('/auth')
                }
                else{
                    toast.error("Updation Failed !!")
                }
            }
            else{
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                } 
                const result = await updateProfileApi(header,details)
                if(result.status==200){
                    toast.success("Profile Updation Successful!!")
                    sessionStorage.clear()
                    setLogStatus(false)
                    nav('/auth')
                }
                else{
                    toast.error("Updation Failed !!")
                }
            }
        }
    }

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
                            <input type="file" onChange={(e)=>setDetails({...details,profile:e.target.files[0]})} style={{ display: 'none' }} />
                            <img
                                src={preview?preview:details?.profile!=='undefined'?`${base_url}/upload/${details.profile}`:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"}
                                alt="User Profile"
                                className="img-fluid"
                            />
                        </label>
                        <input
                            onChange={(e)=>setDetails({...details,username:e.target.value})}
                            type="text"
                            defaultValue={details.username}
                            placeholder="Username"
                            className="form-control mb-3"
                        />
                        <input
                            onChange={(e)=>setDetails({...details,github:e.target.value})}
                            type="text"
                            defaultValue={details.github}
                            placeholder="GitHub Link"
                            className="form-control mb-3"
                        />
                        <input
                            onChange={(e)=>setDetails({...details,linkedin:e.target.value})}
                            type="text"
                            defaultValue={details.linkedin}
                            placeholder="LinkedIn Link"
                            className="form-control mb-3"
                        />
                        <div className="d-flex justify-content-between">
                            <button onClick={handleUpdate} className="btn btn-success">Update</button>
                            <button onClick={changeView} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Profile