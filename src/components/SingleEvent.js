import React from 'react';
import Navbar from '../utilities/Navbar';
import { useLocation } from "react-router-dom";

const SingleEvent = () => {

  const location = useLocation();
  const data = location.state;
  console.log(data)

  const inputDate = new Date(data.eventDate);

    // Get day of the week (e.g., "Saturday")
    const dayOfWeek = inputDate.toLocaleDateString("en-US", { weekday: "long" });

    // Get day of the month with suffix (e.g., "9th")
    const dayOfMonth = inputDate.getDate();
    const daySuffix = dayOfMonth === 1 ? "st" : dayOfMonth === 2 ? "nd" : dayOfMonth === 3 ? "rd" : "th";
    const formattedDay = `${dayOfMonth}${daySuffix}`;

    // Get month (e.g., "December")
    const month = inputDate.toLocaleDateString("en-US", { month: "long" });

    // Get year (e.g., "2023")
    const year = inputDate.getFullYear();

    




  return (
    <>
      <Navbar/>

      <div className='container mt-5' style={{height:'75vh'}}>
            <div className="card shadow-lg mb-3 h-100 w-100" >
               <div className="row g-0 h-100">
                 <div className="col-md-4 p-4">
                    <img src={`/assets/${data.image}`} className="card-img-top object-fit-cover" alt="..." />
                 </div>
                 <div className="col-md-8">
                   <div className="card-body py-5">
                      <h1 className="card-title">{data.name.toUpperCase()}</h1>
                      <p className="card-text text-warning fw-bold ms-1 mb-4"><i className="fa-regular fa-calendar me-2"></i>{`${dayOfWeek.toUpperCase()}, ${formattedDay.toUpperCase()} ${month.toUpperCase()}, ${year}`}</p>
                      <p className="card-text h4 text-body">What is {data.name}?</p>
                      <p className="card-text text-secondary">{data.desc}</p>
                      <p className="card-text"><small className="text-muted"><span><i class="fa-solid fa-location-dot me-1"></i></span>{data.location},{" "}{data.city}</small></p>
                    </div>
                  </div>
               </div>
             </div>
      </div>
    </>
  );
};

export default SingleEvent;
