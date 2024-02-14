import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../components/ContextReducer'

const Login = () => {
  const [creds, setCreds] = useState({ email: "", password: "" })
  const {setIsLogin} = useUser();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/loginuser`, {
      method: 'POST',
      body: JSON.stringify(creds),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
    const data = await response.json();
    if(data.success){
      localStorage.setItem("authToken",data.authToken)
      setIsLogin(true);
      console.log(data);
      navigate('/')
    }
    else{
      setIsLogin(false);
      alert(data.message)
    }
  }

  return (
    <>
      <div className='container'>
        <form className='my-4' onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input name='email' value={creds.email} required type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => { setCreds({ ...creds, email: e.target.value }) }} />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input name='password' value={creds.password} required type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => { setCreds({ ...creds, password: e.target.value }) }} />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2 my-2" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-body-secondary">© GoFood</p>
        </form>
      </div>
    </>
  )
}

export default Login