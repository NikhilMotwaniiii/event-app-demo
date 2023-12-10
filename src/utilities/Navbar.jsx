import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ createEvent }) => {

    const navigate = useNavigate();
    function logoutSubmit(){
        localStorage.setItem("login", "");
        localStorage.setItem("loginStatus", "Logged out successfully!")
        navigate("/login");
    }
    const user = localStorage.getItem('user');


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div className="container">
          <a className="navbar-brand" href="#">AllEvents</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link to='/dashboard' className="nav-item text-decoration-none">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </Link>
            </ul>
            <div className="d-flex">
              <Link to='/create-event' className={`btn btn-primary ${createEvent ? 'd-none': ''}`} type="submit">
                <span><i className="fa-solid fa-plus"></i></span> Create Event
              </Link>
            </div>
            <div className="ms-2 d-flex">
              <button className="btn btn-outline-primary" type="submit" onClick={logoutSubmit}>
                Logout
              </button>
            </div>
          </div>
        </div>
        </nav>
  )
}

export default Navbar