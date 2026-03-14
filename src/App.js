import SearchInput from './searchInput';
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
      `https://www.omdbapi.com/?s=${e}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    );
    // console.log(response.data);

    // Check if response.data.Search exists before calling map on it
    if (response.data.Search) {
      const results = await Promise.all(response.data.Search.map(async (element) => {
        const Response = await axios.get(
          `https://www.omdbapi.com/?i=${element.imdbID}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
        );
        return Response.data;
      }));

      // Use the callback version of setState to ensure state is updated correctly
      this.setState((prevState) => ({ Rivew: [...prevState.Rivew, ...results] }));
      console.log(this.state.Rivew);
    } else {
      // Handle the case when response.data.Search is undefined
      console.log('No results found');
      this.setState({ Rivew: [] }); // Clear the Rivew state if no results are found
    }
  };

  render() {
    return (
      <div className='ui container' style={{ marginTop: '30px' }}>
        <SearchInput onSearchSubmit={this.onSearchSubmit} />
        {/* <Response temp={this.state.temp} /> */}
        <Moviereview Rivew={this.state.Rivew} />
      </div>
    );
  }
}

export default App;