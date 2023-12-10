import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import EventCard from "../utilities/EventCard";
import Navbar from "../utilities/Navbar";
 
export default function Dashboard() {

	const navigate = useNavigate();
    const [eventName, setEventName] = useState("");
    const [desc, setDesc] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [loc, setLoc] = useState("");
    const [city, setCity] = useState("Ahmedabad");
    const [category, setCategory] = useState("Music");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [btnDis, setBtnDis] = useState("");

	useEffect(() => {
        setTimeout(function(){
            setMsg("");
        }, 5000);

    }, [msg, error]);

    useEffect(()=>{
        
       
        if(error==="" && eventName && desc && start && end && loc && category && image && city){
            setBtnDis(true);
        }
        else{
            setBtnDis(false);
        }
        
    },[error, eventName , desc , start , end , loc , category , image, city])

    const handleInputChange = (e, type) => {
        switch(type){
            case "eventName":
                setError("");
                setEventName(e.target.value);
                if(e.target.value === ""){
                    setError("Event name is empty!");
                }
                break;
            case "description":
                setError("");
                setDesc(e.target.value);
                if(e.target.value === ""){
                    setError("Description is empty!");
                }            
                break;
            case "start":
                setError("");
                setStart(e.target.value);
                if(e.target.value === ""){
                    setError("Start Time is empty!");
                }
                
                break;
            case "end":
                setError("");
                setEnd(e.target.value);
                if(e.target.value === ""){
                    setError("End time is empty!");
                }

                break;

            case "location":
                setError("");
                setLoc(e.target.value);
                if(e.target.value === ""){
                    setError("Location is empty!");
                }

                break;

            case "city":
                setError("");
                setCity(e.target.value);
                if(e.target.value === ""){
                    setError("Location is empty!");
                }

                break;

            case "category":
                setError("");
                setCategory(e.target.value);
                if(e.target.value === ""){
                    setError("Category is empty!");
                }

                break;

            case "image":
                setError("");
                setImage(e.target.files[0]);
                if(e.target.value === ""){
                    setError("Image field is empty!");
                }
                
                break;

            default:
        }
        
        
    }
 
    const addEvent = () => {
        let url = "http://localhost/event-app-demo/addevent.php";
        let formData = new FormData();
    
        formData.append("eventName", eventName);
        formData.append("description", desc);
        formData.append("startTime", start);
        formData.append("endTime", end);
        formData.append("location", loc);
        formData.append("eventCity", city);
        formData.append("category", category);
        formData.append("image", image);
    
        fetch(url, {
            method: "POST",
            body: formData,
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            setMsg(response.result);
        })
        .catch((err) => {
            console.error(err);
            setError(err.message);
        });
    
        // Reset form fields
        setEventName("");
        setDesc("");
        setStart("");
        setEnd("");
        setLoc("");
        setCity("");
        setCategory("");
        setImage("");
        navigate('/dashboard')
    };
    
    // const addEvent = () => {
           
    //          let url = "http://localhost/event-app-demo/addevent.php";
    //          let headers = {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //          };

    //         //  let Data = {
    //         //     eventName: eventName,
    //         //     description: desc,
    //         //     startTime: start,
    //         //     endTime: end,
    //         //     location: loc,
    //         //     category: category,
    //         //     image: image
    //         //  };


    //          let formData = new FormData();
    //             formData.append("eventName", eventName);
    //             formData.append("description", desc);
    //             formData.append("startTime", start);
    //             formData.append("endTime", end);
    //             formData.append("location", loc);
    //             formData.append("category", category);
    //             formData.append("banner_image", image);

                

    //          fetch(url, {
    //             method: "POST",
    //             headers: headers,
    //             body: formData,
    //          }).then((response) => response.json())
    //          .then((response) => {
    //             console.log(response);
    //             setMsg(response[0].result);

    //             // navigate("/dashboard");
    //          }).catch((err) =>{
    //             setError(err);
    //             console.log(err);
    //             });
    //             setEventName("");
    //             setDesc("");
    //             setStart("");
    //             setEnd("");
    //             setLoc("");
    //             setCategory("");
    //             setImage("");  
    // }


    
    return(
        <>
        <Navbar createEvent={true}/>
        <div id="booking" className="section mx-5 px-5">
		<div className="section-center mx-5 px-5">
			<div className="container px-5 ">
				<div className="row flex mt-3 justify-content-center align-items-center text-center px-5">
					<div className="col justify-content-center align-items-center">
							<h1>Add an event</h1>
					</div>
                 </div>
				<div className="row flex mt-2 justify-content-center align-items-center text-center px-5">
					<div className="col justify-content-center align-items-center text-start px-5 mx-5">
					<p className="mb-0 ms-1 px-5">
                                          
							<div className={`mb-0 d-none ${error? "visible":"invisible"}`} style={{color: '#842029'}}><b>{error}</b></div> 
							<div className={`mb-0 d-none ${msg? "visible":"invisible"}`} style={{color: '#badbcc'}}><b>{msg}</b></div>
							 
                        </p>
					</div>
                 </div>
                 <div className="row mt-3 flex text-center">   
					<div className="col-12 justify-content-center align-items-center text-center px-5">
						<div className="justify-content-center align-items-center text-center px-5">
							<form encType="multipart/form-data" method="POST" className="justify-content-center align-items-center text-center px-5 ">
                                <div className="row px-5 mb-2">
                                    <div className="col-sm-6">
                                        <div className="form-group text-start">
                                            <label htmlFor="eventName" className="form-label text-muted ms-1 form-outline fw-bold">Event Name</label>
                                            <input id="eventName" className="form-control" type="text" placeholder="Enter Event Name"
											value={eventName} 
											onChange={(e) => handleInputChange(e, "eventName")} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
										<div className="form-group text-start dropdown">
										    <label htmlFor="category" className="form-label text-muted ms-1 form-outline fw-bold">Category</label>
											<select className="form-select" onChange={(e) => handleInputChange(e, "category")} aria-label="Default select example">
												<option value="Music" selected>Music</option>
												<option value="Business">Business</option>
												<option value="Exhibition">Exhibition</option>
											</select>								
										</div>
									</div>
                                </div>
                                <div className="row px-5 mb-2">
                                    <div className="col">
                                        <div className="form-group text-start">
                                            <label htmlFor="description" className="form-label text-muted ms-1 form-outline fw-bold">Description</label>
                                            <textarea
                                                    className="form-control" id="description" placeholder="Enter Event Description"
													value={desc} 
											        onChange={(e) => handleInputChange(e, "description")} 
                                                />
                                        </div>
                                    </div>
                                </div>
								
								<div className="row px-5 mb-2">
									<div className="col-sm-6">
										<div className="form-group text-start">
											<label htmlFor="startTime" className="form-label text-muted ms-1 form-outline fw-bold">Start time</label>
											<input id="startTime" className="form-control" type="datetime-local" required
											value={start} 
											onChange={(e) => handleInputChange(e, "start")} 
											/> 
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group text-start">
											<label htmlFor="endTime" className="form-label text-muted ms-1 form-outline fw-bold">End time</label>
											<input id="endTime" className="form-control" type="datetime-local"
											value={end} 
											onChange={(e) => handleInputChange(e, "end")} 
											required />
										</div>
									</div>
								</div>
								<div className="row px-5 mb-2">
									<div className="col">
										<div className="form-group text-start">
											<label htmlFor="location" className="form-label text-muted ms-1 form-outline fw-bold">Location</label>
											<textarea
                                                    className="form-control" id="location" placeholder="Enter the location"
													value={loc} 
											        onChange={(e) => handleInputChange(e, "location")} 
                                                />
										</div>
									</div>
								</div>
								
								<div className="row px-5 mb-4">
					

									
                                    <div className="col-sm-6">
										<div className="form-group text-start dropdown">
										    <label htmlFor="city" className="form-label text-muted ms-1 form-outline fw-bold">City</label>
											<select className="form-select" onChange={(e) => handleInputChange(e, "city")} aria-label="Default select example">
												<option value="Ahmedabad" selected>Ahmedabad</option>
												<option value="Bangalore">Bangalore</option>
												<option value="Mumbai">Mumbai</option>
											</select>								
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group text-start">
											<label htmlFor="image" className="form-label text-muted ms-1 form-outline fw-bold">Image</label>
                                            <input id="image" name="banner_image" className="form-control" type="file" 
											onChange={(e) => handleInputChange(e, "image")}
											required />
										</div>
									</div>
								</div>

								<div className="row px-5">
								  <div className="form-group">	
									<input 
									type="submit"
									value="Add"
                                    accept="image/*"
									className={`btn btn-dark btn-lg btn-block w-100  ${ (!btnDis ? 'disabled':'')} ` }
									onClick={()=>{
										addEvent();
									}}/>
								   </div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	    </div>
        </>
    )
}