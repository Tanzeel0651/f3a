// import * as React from 'react';
import styles from '@/components/Navbar/Navbar.module.scss';
import { useEffect, useState, useContext, useRef} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/services/Auth';

export const Navbar = (props: React.PropsWithChildren) => <div className={styles.Navbar}>{props.children}</div>;

function refreshPage(){ 
  window.location.reload(); 
}

export const navbaruser = () => {

  // const [token, setToken] = useState("");
  // const { authenticated } = useContext(AuthContext)
  // useEffect(() => {
  //   setInterval(() => {
  //       const userstring= localStorage.getItem("user") ;
  //       if (userstring){
  //         const user = JSON.parse(userstring);
  //         setToken(user.token);
  //         console.log(user.token)
  //       }
  //       },5000)
  // }, []);
  // var token = useRef(false)
  const [token, setToken] = useState(Boolean);
  const userstring= localStorage.getItem("user") ;
  useEffect(() => {
      
      if (userstring){
        // const user = JSON.parse(userstring);
        // token.current = true;
        setToken(true)
        console.log("Token_inside: ",token)
      } 
  }, [userstring]);
  console.log("Token1: ",token)
  const logout = () => {
      // refreshPage()
      // token.current = false
      setToken(false)
      return localStorage.removeItem("user");
  }
   
  if (!token) {
      return (
          <div className={styles.rightNavbar}>
            <Link to="/login" className="nav-item nav-link">Login</Link> 
            <span>/</span>
            <Link to="/register" className="nav-item nav-link">Register</Link>
          </div>
      )
  }

  return (
    <div className={styles.rightNavbar}>
       <Link to="/" className="nav-item nav-link" onClick={logout}>Logout</Link>
       </div>
   )
}

