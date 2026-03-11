import React from "react";
// import PropTypes from "prop-types";

const Moviereview = (props) => {
  console.log(props);
  const Rivew = props.Rivew.forEach((rivew) => {
    return <h1>Hello</h1>;
  });
  return (
    <div>
      movieReview
      <br />
      {Image}
    </div>
  );
};

export default Moviereview;
