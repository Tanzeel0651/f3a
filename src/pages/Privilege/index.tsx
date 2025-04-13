
import {JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState} from 'react';
import styles from './Privilege.module.scss';
import { useNavigate } from 'react-router-dom';

function refreshPage(){ 
  window.location.reload(); 
}

export const Privilege = () => {
  const navigate = useNavigate();
  const currUser = localStorage.getItem("user");
  const isAdmin = useRef(false)
  const [users, setUsers] = useState() as any;
  const roles = ["Admin", "Maintainer", "User"]

  useEffect(() => {
    if (currUser){
      const email = JSON.parse(currUser).email;
      fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'email': email
      },
      // body: JSON.stringify({email})
      })
      .then (r => r.json())
      .then (r => {
        if (r.status === 200){
          isAdmin.current = true
          setUsers(r.users);
          console.log("Status: ", r)
        }
      })
    }
  }, [])

  
  if (!isAdmin.current){
    console.log("Curr: ",currUser)
    if (currUser){
      console.log("Not a Admin")
      // useEffect(()=>{navigate('/login')})
      return
    }
    else{
      console.log("Not Logged In")
      useEffect(()=>{navigate('/login')})
      return
    }
  }
  
  
  
  var rows = []
  for (var i=0; i<users.length; i++) {
    rows.push([users[i].user_name, users[i].email, users[i].role])
  }
  // console.log("Value: ", users)
  // console.log("Rows", rows)

  var changedRows: any = {}

  const handle_change = (row: any, new_role: string) => {
    if (new_role=="Select") {
       changedRows[row[1]] = null
    }
    else{
      changedRows[row[1]] = new_role
    }
    console.log("Changed Rows: ",changedRows)
  }

  function onButtonClick() {
    console.log("Changed Rows: ",changedRows)
    fetch("http://localhost:3000/update_role", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({rows: changedRows})
    })
    .then(r => r.json())
    .then(r => {
      if (r.status == 200){
        console.log("Changes Written Succefully")
      }
    })
    refreshPage()
    return
  }


  return  (
    <div className={styles.scroll}>
      {/* <div>
        <a href='/register' className={styles.headingCreate}>Create</a><h2>Access Control</h2>
      </div> */}
      <div>
        <h2 className={styles.heading}>Access Control
        <a href='/register' className={styles.headingCreate}>Create</a>
          </h2> 
      </div>
      <div className = {styles.mainContainer}>
        <table className = {styles.rolesTable}>
          <tbody>
            <tr className={styles.tableStyle2}>
              <th className={styles.tableStyle2}>Name</th>
              <th className={styles.tableStyle2}>Email</th>
              <th className={styles.tableStyle2}>Role</th>
              <th className={styles.tableStyle2}></th>
            </tr>
            {rows.map((row: any)=>(
              <tr className={styles.tableStyle2}>
              {row.map((sec: any)=>(
                <td className={styles.tableStyle2}>{sec}</td>
              ))}
              <td>
                <select className={styles.roleSelect} onChange={e => handle_change(row, e.target.value)}>
                  <option >Select</option>
                  {roles.map((role)=>(
                    <option >{role}</option>
                  ))}
                </select>
              </td>
              </tr>
            ))}
            <br />
          </tbody>
        </table>
        <br />
        <br />
        <div className={styles.inputContainer}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Submit"} />
            </div>
      </div>
    </div>
    );
}










