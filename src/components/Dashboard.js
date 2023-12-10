import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import EventCard from "../utilities/EventCard";
import Navbar from "../utilities/Navbar";
 
export default function Dashboard() {



    const navigate = useNavigate();
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [city, setCity] = useState("Ahmedabad");
    const [category, setCategory] = useState("Music");
    const [error, setError] = useState("");
    const [events, setEvents] = useState([]);

    const cities = {

    }

    // useEffect(()=>{
    //     updateEvents();
        
    // }, [date, city, category])

    

    // const updateEvents = ()=> {
            
    //         let url = "http://localhost/event-app-demo/fetchEvents.php";
    //         let headers = {
    //             "Accept": "application/json",
    //             "Content-type": "application/json"
    //         };
    //         let Data = {
    //             event_date: date,
    //             city: city,
    //             event_category: category
    //         };
    //         fetch(url, {
    //             method: "POST",
    //             headers: headers,
    //             body: JSON.stringify(Data)
    //         }).then(response => response.json())
    //         .then(response => {
    //             setEvents(response);
    //             console.log(response);
    //         })
    //           .catch((err) => {
    //             setError(err);
    //             console.log(err);
    //         })
        
        
    // }
    useEffect(() => {
      
      updateEvents();
      
  }, [date, city, category]);

  const updateEvents = async () => {
      let url = "http://localhost/event-app-demo/fetchEvents.php";
      let headers = {
          "Accept": "application/json",
          "Content-type": "application/json"
      };
      let Data = {
          event_date: date,
          city: city,
          event_category: category
      };

      try {
          const response = await fetch(url, {
              method: "POST",
              headers: headers,
              body: JSON.stringify(Data)
          });

          if (response.ok) {
              const data = await response.json();
              setEvents(data.events);
              console.log(data.events);
             
          } else {
              setError("Error fetching events");
          }
      } catch (err) {
          setError(err.message);
      }
  };

  const handleInputChange = (e, type) => {
    switch(type){
     case "date":
        setError("");
        setDate(e.target.value);
        if(e.target.value === ""){
            setError("Start Time is empty!");
        }
        
        break;

     case "city":
        setError("");
        setCity(e.target.value);
        if(e.target.value === ""){
            setError("City is empty!");
        }

        break;

     case "category":
        setError("");
        setCategory(e.target.value);
        if(e.target.value === ""){
            setError("Category is empty!");
        }

        break;

       

        default:
    }
    
    
}
    
    return(
        <>
        <Navbar createEvent={false}/>
        <div className="container mt-3">
        <div className="row flex justify-content-center align-items-center text-center w-100"> 
            <h3>Events</h3>
        </div>    

          <div className="row flex justify-content-center align-items-center text-center w-100 mb-4"> 
            
            <div className="col-4 p-2 px-5">
              <div className="">
                  <label htmlFor="category" className="form-label text-muted ms-1 form-outline fw-bold">Date</label>
                  <input id="endTime" className="form-control eventCard" type="date"
											value={date}
											onChange={(e) => {handleInputChange(e, "date")}} 
											required />
              </div>
            </div>
            <div className="col-4 p-2 px-5">
              <div className="">
                  <label htmlFor="category" className="form-label text-muted ms-1 form-outline fw-bold">City</label>
                  <select className="form-select eventCard" onChange={(e) => {handleInputChange(e, "city")}} aria-label="Default select example">
                    <option value="Ahmedabad" selected>Ahmedabad</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>	
              </div>
            </div>
            <div className="col-4 p-2 px-5">
              <div className="">
                  <label htmlFor="category" className="form-label text-muted ms-1 form-outline fw-bold">Category</label>
                  <select className="form-select eventCard" onChange={(e) => {handleInputChange(e, "category")}} aria-label="Default select example">
                    <option value="Music" selected>Music</option>
                    <option value="Business">Business</option>
                    <option value="Exhibition">Exhibition</option>
                  </select>	
              </div>
            </div>
            
            
          </div> 

          <div className="row flex align-items-center text-center w-100"> 
          {events.map((event)=>(
            <div className="col-4 p-2 px-5">
              <div className="">
                    
                    <EventCard id={event.id} name={event.event_name} category={event.category} desc={event.event_desc} location={event.event_location} startTime={event.start_time} endTime={event.end_time} city={event.event_city} image={event.banner_image}  />
                
                
              </div>
            </div>
            ))}
          </div> 
        </div>
        </>
    )
}