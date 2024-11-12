import base_url from "./base_url";
import commonApi from "./commonApi";


export const registerApi = async (data) => {
    return await commonApi(`${base_url}/reg`, "POST", "", data)
}

export const loginApi = async (data) => {
    return await commonApi(`${base_url}/log`, "POST", "", data)
}

export const addProjectApi = async (data, header) => {
    return await commonApi(`${base_url}/addprojects`, "POST", header, data)
}

export const getProjectApi = async (header) => {
    return await commonApi(`${base_url}/getlist`, "GET", header, "")
}

export const deleteProjectApi = async (id, header) => {
    return await commonApi(`${base_url}/deletepro/${id}`, "DELETE", header, {})
}

export const updateProjectApi = async(id,header,data) => {
    return await commonApi(`${base_url}/updatepro/${id}`,"PUT",header,data)
}

export const updateProfileApi = async(header,data) => {
    return await commonApi(`${base_url}/updateprofile`,"PUT",header,data)
}

export const getAllProjectsApi = async(header) => {
    return await commonApi(`${base_url}/allprojects`,"GET",header)
}