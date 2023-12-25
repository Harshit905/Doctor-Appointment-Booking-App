import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { Table } from 'antd';
const Users = () => {
  const [users, setUsers] = useState([]);
const dispatch=useDispatch()
  const getUsers = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(`/api/admin/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setUsers(response.data.data)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      toast.error('Something Went Wrong');
    }
  };
  useEffect(() => {
    getUsers();
  }, [])

  const columns=[
    {
      title:"Name",
      dataIndex:'name'
    },
    {
      title:"Email",
      dataIndex:'email'
    },
    {
      title:"Doctor?",
      dataIndex:'isDoctor',
      render:(text,record)=>(
        <span>{record.isDocotr?"Yes":"No"}</span>
      )
    },
    {
      title:"Actions",
      dataIndex:'actions',
      render:(text,record)=>(
        <div className="d-flex">
          <button className='btn btn-danger'>Block</button>
        </div>
      ),
    },
  ]


  return (
    <div>
      <Layout>
      <h1 className='page-title'>Users List</h1>
        <Table columns={columns} dataSource={users}/>
      </Layout>
    </div>
  )
}

export default Users
