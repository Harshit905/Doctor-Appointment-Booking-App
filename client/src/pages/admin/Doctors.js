import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { Table } from 'antd';
const Doctors = () => {

    const [doctors, setDoctors] = useState([]);
const dispatch=useDispatch()
  const getDoctors = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(`/api/admin/getAllDoctors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setDoctors(response.data.data)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      toast.error('Something Went Wrong');
    }
  };

  const handleAccountStatus=async(record,status)=>{
    try {
      dispatch(showLoading());
      const response = await axios.post(`/api/admin/changeAccountStatus`, {doctorId:record.userId,status:status
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setDoctors(response.data.data) 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      toast.error('Something Went Wrong');
    }
  }


  useEffect(() => {
    getDoctors();
  }, [])

  const columns=[
    {
      title:"Name",
      dataIndex:'name',
      render:(text,record)=>(
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title:"Specialization",
      dataIndex:'specialization',
     
    },
    {
      title:"Status",
      dataIndex:'status'
    },
   
    {
      title:"Actions",
      dataIndex:'actions',
      render:(text,record)=>(
        <div className="d-flex">
          {record.status==="Pending"?<button className='btn btn-success' onClick={()=>handleAccountStatus()}>Approve</button>
          :
          <button className='btn btn-danger'>Reject</button>
          }
        </div>
      ),
    },
  ]


  return (
    <div>
      <Layout>
      <h1 className='page-title'>Doctors List</h1>
        <Table columns={columns} dataSource={doctors}/>
      </Layout>
    </div>
  )
  
}

export default Doctors
