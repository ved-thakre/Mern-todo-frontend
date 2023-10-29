import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);

  const logoutHandler = async (e) => {
    setLoading(true);
      try {
      const { data } = await axios.get(
        `${server}/users/logout`,
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
      }catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
     }
    }
  return (
    <nav className='header'>
      <div>
        <h2>TaskDone</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button className='btn' disabled={loading}  onClick={logoutHandler}>Logout</button>
        ) : (
          <Link to={"/login"}>login</Link>
        )}
      
        
      </article>
    </nav>
  )
}

export default Header
