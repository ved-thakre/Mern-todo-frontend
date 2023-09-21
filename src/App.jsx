import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Header from './Components/Header'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { Toaster } from 'react-hot-toast'
import { useContext, useEffect } from 'react'
import { Context, server } from './main'
import axios from 'axios'


function App() {
  
  const {setUser, setIsAuthenticated, setLoading} = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route/>
    </Routes>
    <Toaster/>
  </Router>
}

export default App
