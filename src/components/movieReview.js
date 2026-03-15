
import React from 'react';

const Moviereview = (props) => {
  console.log(props);
  // Check if props.Rivew is an array before calling map
  const Rivew = Array.isArray(props.Rivew) ? props.Rivew.map((rivew, index) => {
    // Using map to return an array of React elements
    return (
      <div key={index}>
        <h1>{rivew.title}</h1>
        <img src={rivew.poster} alt={rivew.title} />
        <p>Rating: {rivew.rating}</p>
      </div>
    );
  }) : [];
  return (
    <div>
      movieReview
      <br />
      {Rivew} 
    </div>
  );
};

export default Moviereview;
