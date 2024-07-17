import React, { useState } from 'react'
import NavBasic from '../components/NavBasic'
import Heros from '../components/Hero'
import Stats from '../components/Stats'
import { onAuthStateChanged } from 'firebase/auth'
import auth from '../firebaseD'

function Home() {
  const [action, setAction] = useState('');
  onAuthStateChanged(auth, (user) => {
    if(user){
      setAction("Log out")
    }
    else{
      setAction("Log in")
    }
  })
  return (
    <>
    <NavBasic action={action}/>
    <Heros />
    <Stats />
    </>
  )
}

export default Home