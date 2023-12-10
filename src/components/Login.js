import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom"; 

import { useNavigate } from 'react-router-dom';
 
export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [btnDis, setBtnDis] = useState(false);
 
    useEffect(() => {
        let login = localStorage.getItem("login");
        if(login){
            navigate("/dashboard");
        }
        let loginStatus = localStorage.getItem("loginStatus");
        if(loginStatus){
            setError(loginStatus);
            setTimeout(function(){
                localStorage.clear();
                window.location.reload();
            }, 3000);
        }
        setTimeout(function(){
            setMsg("");
        }, 5000);
    }, [msg]);

    useEffect(()=>{
        
       
        if(error==="" && email && pass ){
            setBtnDis(true);
        }
        else{
            setBtnDis(false);
        }
        
    },[error, email, pass])
 
    const handleInputChange = (e, type) => {
        switch(type){
            case "email":
                setError("");
                setEmail(e.target.value);
                if(e.target.value === ""){
                    setError("Email is empty!");
                }              
                break;
            case "pass":
                setError("");
                setPass(e.target.value);
                if(e.target.value === ""){
                    setError("Password is empty!");
                }
                
                break;
            default:
        }
    }
 
    const loginSubmit = () => {
        if(email !== "" && pass != ""){
            let url = "http://localhost/event-app-demo/login.php";
            let headers = {
                "Accept": "application/json",
                "Content-type": "application/json"
            };
            let Data = {
                email: email,
                pass: pass
            };
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(Data)
            }).then((response) => response.json())
            .then((response) => {
                console.log(response);
                if(response[0].result === "Invalid Email!" || response[0].result === "Invalid Password!"){
                    setError(response[0].result);
                }
                else{
                    setMsg(response[0].result);
                    setTimeout(function(){
                        localStorage.setItem("login", true);
                        localStorage.setItem('user', email);
                        navigate("/dashboard");
                    }, 5000);
                }
            }).catch((err) => {
                setError(err);
                console.log(err);
            })
        }
        else{
            setError("All fields are required!")
        }
    }
    return(
        <>
        <section className="vh-100" style={{backgroundColor: 'rgb(33,192,232,0.6)'}}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
                <div className="card" style={{borderRadius: '1rem'}}>
                <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="assets/allLogo.jpg" alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}} />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                        <p>
                            {
                                error !== "" ?
                                <div style={{color: '#842029'}}><b>{error}</b></div> :
                                <div style={{color: '#badbcc'}}><b>{msg}</b></div>
                            }
                        </p>
                        <div className="d-flex align-items-center mb-3 pb-1">
                            <span className="h1 fw-bold mb-0">Login</span>
                        </div>
                        <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: 1}}>Sign into your account</h5>
                        <div className="form-outline mb-4 text-muted">
                            <label className="form-label" htmlFor="username">Email</label>
                            <input 
                                type="text"
                                id="email"
                                className="form-control form-control-lg"
                                value={email}
                                onChange={(e) => handleInputChange(e, "email")}
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label text-muted" htmlFor="pass">Password</label>
                            <input 
                                type="password"
                                id="pass"
                                className="form-control form-control-lg"
                                value={pass}
                                onChange={(e) => handleInputChange(e, "pass")}
                            />
                        </div>
                        <div className="pt-1 mb-4">
                            <input 
                                type="submit"
                                value="Login"
                                className={`btn btn-dark btn-lg btn-block ${ (!btnDis ? 'disabled':'')}` }
                                onClick={loginSubmit}
                            />
                        </div>
                       
                        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <Link to='/' style={{color: '#393f81'}}>Register here</Link></p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        </>
    )
}