import React, { useState, useEffect, useRef, useLayoutEffect  } from "react";
import { Link } from "react-router-dom";
 
import { useNavigate } from 'react-router-dom';
 
export default function Registration() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [check, setCheck] = useState(false);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [btnDis, setBtnDis] = useState(false);
    const [hasPageBeenRendered, setHasPageBeenRendered] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false)
 
    useEffect(() => {
        setTimeout(function(){
            setMsg("");
        }, 5000);

    }, [msg, error]);

    useEffect(()=>{
        
       
        if(error==="" && user && email && pass1 && pass2 && check){
            setBtnDis(true);
        }
        else{
            setBtnDis(false);
        }
        
    },[error, user, email, pass1, pass2,check])

    useLayoutEffect(()=>{
        
        if(!check && hasPageBeenRendered ){
            setError("You need to agree to the terms and conditions!");
        }
        setHasPageBeenRendered(true)
    },[check])
 
    const handleInputChange = (e, type) => {
        switch(type){
            case "user":
                setError("");
                setUser(e.target.value);
                if(e.target.value === ""){
                    setError("Username is empty!");
                }
                break;
            case "email":
                setError("");
                setEmail(e.target.value);
                if(e.target.value === ""){
                    setError("Email is empty!");
                }
                else if(!(String(e.target.value)
                .toLowerCase()
                .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ))){
                    setError("Email is not in the proper format!");
                }                
                break;
            case "pass1":
                setError("");
                setPass1(e.target.value);
                if(e.target.value === ""){
                    setError("Password is empty!");
                }
                else if(e.target.value.length < 8){
                    setError("Password is less than 8 characters!")
                }
                else if(e.target.value != pass2){
                    setError("Passwords do not match!");
                }
                
                break;
            case "pass2":
                setError("");
                setPass2(e.target.value);
                if(e.target.value === ""){
                    setError("Confirm Password is empty!");
                }
                
                else if(e.target.value != pass1){
                    setError("Passwords do not match!");
                }

                break;

            default:
        }
        
        
    }
 
    const registrationSubmit = () => {
            checkEmail();
            console.log(emailChecked)
            if(emailChecked){
                console.log("fail")
             let url = "http://localhost/event-app-demo/registration.php";
             let headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
             };
             let Data = {
                username: user,
                email: email,
                pass: pass2
             }
             fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(Data)
             }).then((response) => response.json())
             .then((response) => {
                setMsg(response[0].result);
                navigate("/dashboard");
             }).catch((err) =>{
                setError(err);
                console.log(err);
                });
                setUser("");
                setEmail("");
                setPass1("");
                setPass2("");
            }
        
    }

    // const checkUser = ()=>{
    //     let url = "http://localhost/event-app-demo/checkuser.php";
    //     let headers = {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json"
    //     };
    //     let Data = {
    //         username: user
    //     }
    //     fetch(url, {
    //         method: "POST",
    //         headers: headers,
    //         body: JSON.stringify(Data)
    //     }).then((response) => response.json())
    //     .then((response) => {
    //         setError(response[0].result);
    //     }).catch((err) =>{
    //         setError(err);
    //         console.log(err);
    //     });
    // }
 
    const checkEmail=  ()=>{
        let url = "http://localhost/event-app-demo/checkemail.php";
        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        let Data = {
            email: email
        }
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(Data)
        }).then((response) => response.json())
        .then((response) => {
            setError(response[0].result);
            localStorage.setItem("login", true);
            localStorage.setItem('user', email);
            
            
        }).catch((err) =>{
            setError(err);
            console.log(err);
        });
     
        setEmailChecked(true);
         
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
                    <div className="card-body p-4 text-black">
                        <p className="mb-0">
                            {
                                error !== "" ?
                                <div className="mb-0" style={{color: '#842029'}}><b>{error}</b></div> :
                                <div className="mb-0" style={{color: '#badbcc'}}><b>{msg}</b></div>
                            }
                        </p>
                        <div className="d-flex align-items-center mb-3">
                            
                            <span className="h1 fw-bold mb-0">Registration</span>
                        </div>
                        <div className="form-outline mb-3 text-muted">
                            <label className="form-label" htmlFor="username">User Name</label>
                            <input 
                                type="text"
                                id="username"
                                className="form-control form-control-lg"
                                value={user}
                                onChange={(e) => handleInputChange(e, "user")}
                                
                            />
                        </div>
                        <div className="form-outline mb-1">
                            <label className="form-label text-muted" htmlFor="email">Email</label>
                            <input 
                                type="email"
                                id="email"
                                className="form-control form-control-lg"
                                value={email}
                                onChange={(e) => handleInputChange(e,"email")}
                                // onBlur={checkEmail}
                            />
                        </div>
                        <div className="form-outline mb-1">
                            <label className="form-label text-muted" htmlFor="pass1">Password</label>
                            <input 
                                type="password"
                                id="pass1"
                                className="form-control form-control-lg"
                                value={pass1}
                                onChange={(e) => handleInputChange(e, "pass1")}
                            />
                        </div>
                        <div className="form-outline mb-1">
                            <label className="form-label text-muted" htmlFor="pass2">Repeat Password</label>
                            <input 
                                type="password"
                                id="pass2"
                                className="form-control form-control-lg"
                                value={pass2}
                                onChange={(e) => handleInputChange(e, "pass2")}
                            />
                        </div>
                        <div className="pt-1 mb-1">
                            <input 
                                type="checkbox"
                                id="check"
                                className="me-1"
                                onChange={()=>{
                                    setError("");
                                    setCheck(!check);
                                }}
                            />
                            <label className="form-label text-muted" htmlFor="check"> I agree to the terms and conditions.</label>
                        </div>
                        <div className="pt-1 mb-1">
                            <input 
                                type="submit"
                                defaultValue="Register"
                                className={`btn btn-dark btn-lg btn-block  ${ (!btnDis ? 'disabled':'')} ` }
                                onClick={()=>{
                                    // checkUser();
                                    // checkEmail();
                                    registrationSubmit();
                                }}
                            />
                        </div>
                        <p className="pb-lg-2" style={{color: '#393f81'}}>Already Registered? <Link to="/login" style={{color: '#393f81'}}>Login</Link></p>
                        
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