  import React, { useState, useEffect } from 'react';
  import './search.css';

  const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
      const fetchSuggestions = async () => {
        if (search.length >= 3) {
          try {
            const endpoint = `https://api.openweathermap.org/geo/1.0/autocomplete?q=${search}&limit=10&appid=${'3b206d8e1ab352e242b0a1d5493b3d9f'}`;
            const response = await fetch(endpoint);
      
            if (!response.ok) {
              throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
            }
      
            const data = await response.json();
      
            console.log('API Endpoint:', endpoint);
            console.log('API Response:', data);
      
            if (data && data.length > 0) {
              setSuggestions(data.map((result) => result.name));
            } else {
              setSuggestions([]);
            }
          } catch (error) {
            console.error('Error fetching city suggestions:', error);
            setSuggestions([]);
          }
        } else {
          setSuggestions([]);
        }
      };
      
      
      fetchSuggestions();
    }, [search]);

    const handleInputChange = (e) => {
      setSearch(e.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
      setSearch(suggestion);
      setSuggestions([]); // Clear suggestions after selecting one
      onSearchChange(suggestion);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSearchChange(search);
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Country/City"
          value={search}
          onChange={handleInputChange}
          list="suggestions"
        />
        <datalist id="suggestions">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} onClick={() => handleSuggestionClick(suggestion)} />
          ))}
        </datalist>
        <button type="submit">Search</button>
      </form>
    );
  };

  export default Search;
