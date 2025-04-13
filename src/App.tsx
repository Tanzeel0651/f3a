import { Link, Route, Routes } from 'react-router-dom';
import styles from '@/App.module.scss';
import { Card3 } from '@/components/Card3';
import TeamMembers from '@/components/Card3/TeamMembers';
import { Navbar, navbaruser } from '@/components/Navbar';
import { About } from '@/pages/About';
import Home from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { Rules } from '@/pages/Rules';
import { Login } from '@/components/Login';
import { Standings } from '@/pages/Standings';
import {Register} from '@/components/Register';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '@/services/Auth';
import { Privilege } from '@/pages/Privilege';

function App() {
  const userString = localStorage.getItem("user")
  const isAdmin = useRef(false)

  if (userString && JSON.parse(userString).role === "admin"){
    isAdmin.current = true
  }
  // console.log(authenticated)
  
  return (
  <div className={styles.App}>
    {/* Navbar */}
    <Navbar>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/card">Teams</Link>
      <Link to="/standings">Standings</Link>
      <Link to="/rules">Rules</Link>
      <Link to="Admin">Admin</Link> 
      <form>{navbaruser()}</form>
    </Navbar>

    {/* Pages */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/card" element={<Card3 />} />
      <Route path="/standings" element={<Standings />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Privilege />} />
      <Route path="/team/Team1" element={<TeamMembers teamName="Team1" />} />
      <Route path="/team/Team2" element={<TeamMembers teamName="Team2" />} />
      <Route path="/team/Team3" element={<TeamMembers teamName="Team3" />} />
      <Route path="/team/Team4" element={<TeamMembers teamName="Team4" />} />
    </Routes>
  </div>
  )
};

export default App;


