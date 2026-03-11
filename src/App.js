
import Movie from './searchInput';
import React from 'react';
import './App.css';
import axios from 'axios';
import Moviereview from './components/movieReview';

class App extends React.Component {
  state = {
    Rivew: [],
  };

  onSearchSubmit = async (e) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${e}&apikey=21193e36`
    );
    // console.log(response.data);

    const results = await Promise.all(response.data.Search.map(async (element) => {
      const Response = await axios.get(
        `https://www.omdbapi.com/?i=${element.imdbID}&apikey=21193e36`
      );
      return Response.data;
    }));

    this.setState({ Rivew: results });
    console.log(this.state.Rivew);
  };

  render() {
    return (
      <div className='ui container' style={{ marginTop: '30px' }}>
        <Movie onSearchSubmit={this.onSearchSubmit} />
        {/* <Response temp={this.state.temp} /> */}
        <Moviereview Rivew={this.state.Rivew} />
      </div>
    );
  }
}

export default App;
