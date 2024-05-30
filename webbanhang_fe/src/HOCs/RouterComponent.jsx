import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RouterComponent = ({isAdmin, redirectPath, Component}) => {
  const {user}=useSelector(state=>state.auth);
  const [userState, setUserState] = useState(user);
  const [admin, setAdmin] = useState(false);
  useEffect(()=>{
    setUserState(user);
    const idRole = user?.role?.id;
    const admin = idRole==2;    
    setAdmin(admin);    
    
  }, [user])

  if(userState?.id && isAdmin ){    
    return admin==true?<Component></Component>:<Navigate to={redirectPath}></Navigate>
  }


  return (
    <Component></Component>
  )
}

export default RouterComponent