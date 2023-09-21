import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../Components/Loader';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const {isAuthenticated, user, loading} = useContext(Context);

   if (!isAuthenticated){ 
    toast.error("Login First");
    return <Navigate to={"/login"} />;
   }

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{isAuthenticated ? user?.name : ""}</h1>
      <p>{isAuthenticated ? user?.email : ""}</p>
    </div>
  );
};

export default Profile
