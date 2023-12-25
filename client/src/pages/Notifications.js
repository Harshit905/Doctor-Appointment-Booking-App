import React from 'react'
import { Tabs } from 'antd';
import Layout from '../components/Layout';
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser} from '../redux/userSlice';
import { hideLoading, showLoading } from '../redux/alertsSlice';
function Notifications() {
    const dispatch=useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate=useNavigate();
    const markAllAsSeen=async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.post(`/api/user/mark-all-notifications-as-seen`, {userId:user._id},{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              });
            dispatch(hideLoading());
            if (response.data.success) {
              toast.success(response.data.message);
              dispatch(setUser(response.data.data))
            } else {
             toast.error(response.data.message);
            }
          } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            toast.error('Something Went Wrong');
          }
    }
    const deleteAll=async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.post(`/api/user/delete-all-notifications`, {userId:user._id},{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              });
            dispatch(hideLoading());
            if (response.data.success) {
              toast.success(response.data.message);
              dispatch(setUser(response.data.data))
            } else {
             toast.error(response.data.message);
            }
          } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            toast.error('Something Went Wrong');
          }
    }
    return (
        <Layout>
            <h1 className="page-title">
                Notifications
            </h1>
            <Tabs>
                <Tabs.TabPane tab="Unseen" key={0}>
                    <div className="d-flex justify-content-end">
                        <h1 className='anchor' onClick={()=>markAllAsSeen()}>Mark All As Seen</h1>
                    </div>
                    {
                        user?.unseenNotifications.map((notification) => (
                            <div className='card p-2 ' onClick={()=>navigate(notification.onClickPath)}>
                                <div className="card-text">
                                    {notification.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Seen" key={1}>
                    <div className="d-flex justify-content-end">
                        <h1 className='anchor' onClick={()=>deleteAll()}>Delete All</h1>
                    </div>
                    {
                        user?.seenNotifications.map((notification) => (
                            <div className='card p-2 ' onClick={()=>navigate(notification.onClickPath)}>
                                <div className="card-text">
                                    {notification.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default Notifications
