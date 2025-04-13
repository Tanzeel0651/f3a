import React, { useEffect, useState, useContext} from 'react';
import styles from './Login.module.scss';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Navbar, navbaruser } from '@/components/Navbar';
import { AuthContext } from '@/services/Auth';

export const Login = (props: React.PropsWithChildren) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    // const [authToken, setAuthTokens] = useAuth();
    const {authenticated, setAuthenticated} = useContext(AuthContext)

    const navigate = useNavigate();
    
    const onButtonClick = () => {
        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")
        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }
        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }
        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }
        // Authentication calls will be made here...    
        
        fetch("http://localhost:3000/auth",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
        })
        .then (r=> r.json())
        .then(r => {
        console.log(r.message)
        if ('success' === r.message) {
            localStorage.setItem("user", JSON.stringify({email, token:'token', role: r.role}))
            //props.loggedIn(true)
            setLoggedIn(true)
            setEmail(email)
            setAuthenticated(true)
            navigate("/")
        } else {
            window.alert("Wrong email or password")
        }
        })
        
    }
    
    return <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
            <div>Login</div>
        </div>
        <br />
        <div className={styles.inputContainer}>
            <input
                value={email}
                placeholder="Enter your email here"
                
                onChange={ev => setEmail(ev.target.value)}
                className={styles.inputBox} />
            <label className={styles.errorLabel}>{emailError}</label>
        </div>
        <br />
        <div className={styles.inputContainer}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={styles.inputBox} />
            <label className={styles.errorLabel}>{passwordError}</label>
        </div>
        <br />
        <div className={styles.inputContainer}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
        <div className={styles.registerContainer}>
          <div>New User ? <Link to="/register">Register Here</Link></div>
        </div>
    </div>
};
