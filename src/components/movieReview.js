
import React from 'react';
// import PropTypes from 'prop-types';

const Moviereview = (props) => {
  console.log(props);
  // Check if props.Rivew is an array before calling map
  const Rivew = Array.isArray(props.Rivew) ? props.Rivew.map((rivew) => {
    // Using map to return an array of React elements
    return <h1>Hello</h1>;
  }) : [];
  return (
    <div>
      movieReview
      <br />
      {Rivew} // Render the Rivew variable
    </div>
  );
};

export default Moviereview;
