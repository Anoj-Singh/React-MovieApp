import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "a9118a3a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  transform: translate(-140%, 0%)
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  height: 10vh;
  position: sticky;
  top:0;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 1.3rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  outline: none;
  padding: 10px;
  width: 30%
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovieList(response.data.Search);
    updateSearchQuery("");
  };

  const initialMovieList = async () => {
    const Movies = await Axios.get(`https://www.omdbapi.com/?s=dil&apikey=${API_KEY}`);
    updateMovieList(Movies.data.Search);
  }

  useEffect(() => {
    initialMovieList();
  }, []);


  const onTextChange = (e) => {
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <img src="./movielogo.jpg" alt="" height="50px"/>
        <AppName>React Movie App</AppName>
        <SearchInput
          placeholder="Search Movie"
          value={searchQuery}
          onChange={onTextChange}
        />
      </Header>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}

      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          ""
        )}

      </MovieListContainer>
    </Container>
  );
}

export default App;
