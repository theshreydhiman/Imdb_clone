import Movie from "./searchInput";
import React from "react";
import "./App.css";
import axios from "axios";
import Moviereview from "./components/movieReview";

class App extends React.Component {
  state = {
    Rivew: [],
  };

  onSearchSubmit = async (e) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${e}&apikey=21193e36`
    );
    // console.log(response.data);

    response.data.Search.forEach(async (elemnet) => {
      const Response = await axios.get(
        `https://www.omdbapi.com/?i=${elemnet.imdbID}&apikey=21193e36`
      );

      this.setState({ Rivew: Response.data });
      console.log(this.state.Rivew);
    });
  };
  render() {
    return (
      <div className="ui container" style={{ marginTop: "30px" }}>
        <Movie onSearchSubmit={this.onSearchSubmit} />
        {/* <Response temp={this.state.temp} /> */}
        <Moviereview Rivew={this.state.Rivew} />
      </div>
    );
  }
}

export default App;
