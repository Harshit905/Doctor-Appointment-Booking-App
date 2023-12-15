// import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import { Button, Form, Input } from 'antd';
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// const Register = () => {
//   // const host='http://localhost:5000';
//   const history = useHistory();
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const onFinish = async (values) => {
//     try {
//       const response = await axios.post(`/api/user/register`, values);

//       // console.log(response.data)
//       if (response.data.success) {
//         toast.success(response.data.message);
//         // toast.success("Redirecting to login Page");
//         history.push('/login');
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Something Went Wrong');
//     }
//   };

//   return (
//     <div className='authentication'>
//       <div className='authentication-form card p-3'>
//         <h1 className='card-title'>Nice to meet U</h1>
//         <Form layout='vertical' onFinish={onFinish}>
//           <Form.Item label='Name' name='name'>
//             <Input placeholder='Name' />
//           </Form.Item>
//           <Form.Item label='Email' name='email'>
//             <Input placeholder='Email' />
//           </Form.Item>
//           <Form.Item label='Password' name='password'>
//             <Input.Password
//               placeholder='Password'
//               iconRender={(visible) =>
//                 visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
//               }
//               onChange={() => setPasswordVisible(!passwordVisible)}
//             />
//           </Form.Item>
//           <Form.Item label='Confirm Password' name='password2'>
//             <Input.Password
//               placeholder='Confirm Password'
//               iconRender={(visible) =>
//                 visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
//               }
//               onChange={() => setPasswordVisible(!passwordVisible)}
//             />
//           </Form.Item>
//           <Button className='primary-button my-2' htmlType='submit'>
//             REGISTER
//           </Button>
//           <Link to='/login' className='anchor mt-2'>
//             CLICK HERE TO LOGIN
//           </Link>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';

const Register = () => {
  const dispatch=useDispatch();
  const history = useHistory();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`/api/user/register`, values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        history.push('/login');
      } else {
        // Display server-side validation errors
        if (response.data) {
          setFormErrors(response.data);
        }
       response.data.message&&toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      toast.error('Something Went Wrong');
    }
  };
  // console.log(formErrors)
  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        <h1 className='card-title'>Nice to meet U</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Name' name='name' hasFeedback validateStatus={formErrors.name ? 'error' : ''} help={formErrors.name}>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item label='Email' name='email' hasFeedback validateStatus={formErrors.email ? 'error' : ''} help={formErrors.email}>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            hasFeedback
            validateStatus={formErrors.password ? 'error' : ''}
            help={formErrors.password}
          >
            <Input.Password
              placeholder='Password'
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              onChange={() => setPasswordVisible(!passwordVisible)}
            />
          </Form.Item>
          <Form.Item
            label='Confirm Password'
            name='password2'
            hasFeedback
            validateStatus={formErrors.password2 ? 'error' : ''}
            help={formErrors.password2}
          >
            <Input.Password
              placeholder='Confirm Password'
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              onChange={() => setPasswordVisible(!passwordVisible)}
            />
          </Form.Item>
          <Button className='primary-button my-2' htmlType='submit'>
            REGISTER
          </Button>
          <Link to='/login' className='anchor mt-2'>
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
