import React, { useEffect, useRef, useState } from 'react';
import styles from './Register.module.scss';
import { useNavigate } from 'react-router';

export const Register = (props: React.PropsWithChildren) => {

  const roles = ["Admin", "Maintainer", "User"]
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("User")

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordMatchError, setpasswordMatchError] = useState("")
  
  
  
  const navigate = useNavigate()

  const user = localStorage.getItem("user");
  const isAdmin = useRef(false)

  if (user){
    if (JSON.parse(user).role === "admin"){
      isAdmin.current = true
    }
    else{
      console.log("Not a Admin")
      navigate("/")
      return
    }
  }


  const onButtonClick = () => {
      setEmailError("")
      setPasswordError("")
      setpasswordMatchError("")
      if ("" === email){
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
      if (password != confirmPassword){
          setpasswordMatchError("Passwords does not match")
          return
      }

      fetch("http://localhost:3000/register",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password,role})
        })
        .then (r=> r.json())
        .then(r => {
        console.log(r.message)
        if ('success' === r.message) {
            // localStorage.setItem("user", JSON.stringify({email, token: r.token}))
            //props.loggedIn(true)
            if (isAdmin.current){
              navigate("/admin")
              return
            }  
            navigate("/login")
            return
        } else if ('duplicate_email' === r.message){
            window.alert("Email already exists")
        } else {
            window.alert("Wrong email or password")
        }
        })
  }


  return <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>Join Our Community !!!!</div>
      </div>
    <br/>
    <div className={styles.inputContainer}>
    <p className={styles.textContainer}>Name</p>
      <input
        value = {name}
        placeholder="Enter your Full Name"
        onChange={ev => setName(ev.target.value)}
        className={styles.inputBox}/>
    </div>
    <br/>
    <div className={styles.inputContainer}>
    <p className={styles.textContainer}>Email</p>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={styles.inputBox} />
            <label className={styles.errorLabel}>{emailError}</label>
        </div>
    <br/>
    <div className={styles.inputContainer}>
    <p className={styles.textContainer}>Password</p>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={styles.inputBox} />
            <label className={styles.errorLabel}>{passwordError}</label>
        </div>
    <br />
    <div className={styles.inputContainer}>
        <p className={styles.textContainer}>Confirm Password</p>
        <input
            value={confirmPassword}
            placeholder="Enter your password again"
            onChange={ev => setConfirmPassword(ev.target.value)}
            className={styles.inputBox} />
        <label className={styles.errorLabel}>{passwordMatchError}</label>
    </div>
      {
          isAdmin.current ? 
          <div className={styles.selectContainer}>
              <p className={styles.textContainer}>Role</p>
              <select className={styles.roleSelect} onChange={ev => setRole(ev.target.value)}>
                <option >Select</option>
                {roles.map((role)=>(
                  <option >{role}</option>
                ))}
              </select>
            </div>
      :""} 
    {/* </div> */}
    <br />
    <div className={styles.inputContainer}>
        <input
            className={"inputButton"}
            type="button"
            onClick={onButtonClick}
            value={"Register"} />
    </div>
    <div>
        <p >Already have an account? <a href='/login'>Login</a></p>
    </div>
  </div>
}