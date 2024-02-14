import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart, useUser } from './ContextReducer'


const Navbar = () => {
  const data = useCart();
  const { isLogin,setIsLogin } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    setIsLogin(false);
  }
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark sticky-top" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand fs-3 fst-italic" to="/">FoodDel</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={'/orders'}>My Orders</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isLogin ?
              <div className='navbar-nav me-auto mb-2 d-flex flex-row'>
                <Link className="nav-item btn btn-outline-success mx-2 position-relative" to={"/cart"} aria-current="page" >My Cart
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {data.length || 0}
                    {/* <span className="visually-hidden">unread messages</span> */}
                  </span>
                </Link>
                <Link className="nav-item btn btn-outline-danger mx-2" aria-current="page" onClick={handleLogout}>Logout</Link>
              </div>
              : <div className='d-flex '>
                <Link className="btn btn-outline-light mx-2" aria-current="page" to="/login">Login</Link>
                <Link className="btn btn-outline-light mx-2" aria-current="page" to="/signup">Signup</Link>
              </div>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar