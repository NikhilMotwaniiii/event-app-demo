import React from 'react'
import {useNavigate} from 'react-router-dom'



const EventCard = ({ id, name, category, desc, location, startTime, endTime, city, image }) => {

  const navigate = useNavigate()
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const eventDate = new Date(startTime);

    const monthName = months[eventDate.getMonth()];
    const startDate = eventDate.getDate()
    console.log(location)

    const eventData = {
      id: id,
      name: name,
      category: category,
      desc: desc ,
      location: location,
      startTime: startTime,
      endTime: endTime,
      city: city,
      image: image,
      eventDate: eventDate
    };

  return (
        <div className="card shadow border-0 eventCard" onClick={()=>{
          navigate(`/dashboard/single-event`, { state: eventData });
        }}>
            <img src={`assets/${image}`} style={{height:'270px'}} className="card-img-top object-fit-scale" alt="..." />
            <div className="card-body">
              <div className="row flex">
                <div className="col-2 p-0">
                  <h5 className="card-title  text-warning mb-2">{monthName.toUpperCase()}</h5>
                  <p className="card-text h5  text-warning">{startDate}</p>
                </div>
                <div className="col-10 text-start">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text text-muted"><span><i class="fa-solid fa-location-dot me-1"></i></span>{location}</p>
                </div>
              </div> 
            </div>
        </div>
  );
}

export default EventCard