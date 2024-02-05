import React from 'react'
import { getTokenFromLocalStorage } from '../../utils/StorageUtils';
import instance from '../../axios/Axios';

const token = getTokenFromLocalStorage();
export const getDepartmentData = async() => {
  const departmentData = await instance.get('/department',{
   headers:{ Authorization : `Bearer ${token}`,}
  }) 
  const resp = await departmentData.data.data;
  console.log(resp)
  return resp;
}

export const departmentAdd = async(department)=>{
  
const departmentData = await instance.post('/department',{
"department": department  
},{
  headers:{
    'Authorization' : `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
}
