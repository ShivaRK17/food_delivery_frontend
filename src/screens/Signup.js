import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../components/ContextReducer'

const Signup = () => {
  const [creds, setCreds] = useState({name:"",email:"",location:"",password:"",cpassword:""})
  const {setIsLogin} = useUser();
  const navigate = useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(creds.password!==creds.cpassword){
      return alert('Passwords don\'t match');
    }
    // console.log(creds);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/createuser`,{
      method:'POST',
      body:JSON.stringify({name:creds.name,email:creds.email,password:creds.password,location:creds.location}),
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    })
    const userData = await response.json();
    // console.log(userData);
    alert(userData.message)
    if(userData.success){
      localStorage.setItem("authToken",userData.authToken)
      setIsLogin(true);
      navigate('/')
    }
  }

  return (
    <>
    <div className='container'>
      <form className='my-4' onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          <div className="form-floating">
            <input name='name' value={creds.name} required type="text" className="form-control" id="floatingInput" placeholder="" onChange={(e)=>{setCreds({...creds,name:e.target.value})}} />
              <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input name='email' value={creds.email} required type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=>{setCreds({...creds,[e.target.name]:e.target.value})}}/>
              <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input name='location' value={creds.location} required type="location" className="form-control" id="floatingInput" placeholder="Hyderabad" onChange={(e)=>{setCreds({...creds,[e.target.name]:e.target.value})}}/>
              <label htmlFor="floatingInput">Location</label>
          </div>
          <div className="form-floating">
            <input name='password' value={creds.password} required type="password" className="form-control" id="floatingPassword" placeholder="" onChange={(e)=>{setCreds({...creds,[e.target.name]:e.target.value})}}/>
              <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input name='cpassword' value={creds.cpassword} required type="password" className="form-control" id="cfloatingPassword" placeholder="" onChange={(e)=>{setCreds({...creds,[e.target.name]:e.target.value})}}/>
              <label htmlFor="cfloatingPassword">Confirm Password</label>
          </div>
          <br />
          <Link to='/login'>Already a User ? Click here</Link>
          <button className="btn btn-primary w-100 py-2" type="submit">Create Account</button>
          <p className="mt-5 mb-3 text-body-secondary">© GoFood</p>
      </form>
    </div>
    </>
  )
}

export default Signup