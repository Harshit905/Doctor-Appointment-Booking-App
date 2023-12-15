import React from 'react'
import { useHistory } from 'react-router-dom';
const PublicRoute = (props) => {
    const history = useHistory();
    if(localStorage.getItem("token")){
      return  history.push('/');
    }else{
      return props.children;
      }
}

export default PublicRoute
