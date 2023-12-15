import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { hideLoading, showLoading } from '../redux/alertsSlice';
const ProtectedRoute = (props) => {

  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch=useDispatch();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response=await axios.post("/api/user/get-user-by-id",{token:localStorage.getItem('token')},{
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
      console.log(response.data)
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser=response.data.data)
      } else {
        history.push('/login');
      }
    } catch (error) {
      dispatch(hideLoading());

      history.push('/login');
    }
  }
console.log("lolo")
  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [user])

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return history.push('/login')
  }
}

export default ProtectedRoute
