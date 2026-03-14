import SearchInput from './searchInput';
import React from 'react';
import './App.css';
import axios from 'axios';
import Moviereview from './components/movieReview';

class App extends React.Component {
  state = {
    Rivew: [],
    error: null // Add a state to store any error messages
  };

  onSearchSubmit = async (e) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${e}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      );
      // console.log(response.data);

      // Check if response.data.Search exists before calling map on it
      if (response.data.Search) {
        const results = await Promise.all(response.data.Search.map(async (element) => {
          try {
            const Response = await axios.get(
              `https://www.omdbapi.com/?i=${element.imdbID}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
            );
            return Response.data;
          } catch (error) {
            // Handle any errors that occur when fetching individual movie data
            console.error(`Error fetching movie data for ${element.imdbID}:`, error);
            return null; // Return null to indicate an error occurred
          }
        }));

        // Filter out any null values (i.e., errors) from the results
        const filteredResults = results.filter(result => result !== null);

        // Use the callback version of setState to ensure state is updated correctly
        this.setState((prevState) => ({ Rivew: [...prevState.Rivew, ...filteredResults] }));
        console.log(this.state.Rivew);
      } else {
        // Handle the case when response.data.Search is undefined
        console.log('No results found');
        this.setState({ Rivew: [], error: 'No results found' }); // Clear the Rivew state if no results are found
      }
    } catch (error) {
      // Handle any errors that occur when fetching the initial search results
      console.error('Error fetching search results:', error);
      this.setState({ Rivew: [], error: 'Failed to fetch search results' });
    }
  };

  render() {
    return (
      <div className='ui container' style={{ marginTop: '30px' }}>
        <SearchInput onSearchSubmit={this.onSearchSubmit} />
        {/* <Response temp={this.state.temp} /> */}
        <Moviereview Rivew={this.state.Rivew} error={this.state.error} />
      </div>
    );
  }
}

export default App;