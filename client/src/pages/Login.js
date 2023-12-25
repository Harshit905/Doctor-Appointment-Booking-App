import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
const Login = () => {
  // const {loading}=useSelector(state=>state.alerts)
  // console.log(loading)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`/api/user/login`, values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      toast.error('Something Went Wrong');
    }
  };

  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        <h1 className='card-title'>Welcome Back</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Email' name='email'>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input.Password
              placeholder='Password'
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              onChange={() => setPasswordVisible(!passwordVisible)}
            />
          </Form.Item>
          <Button className='primary-button my-2' htmlType='submit'>
            LOGIN
          </Button><br />
          <Link to='/register' className='anchor mt-2'>
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
