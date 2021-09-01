import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import "react-toastify/dist/ReactToastify.css";
import Song from "./components/song/Song";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Artist from "./components/artist/Artist";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import Favorites from "./components/favorites/Favorites";

export default () => {
  const [artists, setArtists] = useState([]);
  const [query, setQuery] = useState("");
  const [songIndex, setSongIndex] = useState();

  useEffect(() => {
    if (query) {
      var options = {
        method: "GET",
        url: "https://genius.p.rapidapi.com/search",
        params: { q: query },
        headers: {
          "x-rapidapi-host": "genius.p.rapidapi.com",
          "x-rapidapi-key":
            "9da9f853dcmsh86bba916aa656c2p18fc8djsne2562db22529",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setArtists(response.data.response.hits);
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    setQuery("");
  }, [query]);

  return (
    <div
      style={{
        backgroundColor: "#222930",
        overflowY: "hidden",
        fontFamily: "Spartan sans-serif",
      }}
    >
      <Nav />
      <Router>
        <Switch>
          <Route exact path="/">
            <Header artists={artists} setQuery={setQuery} />
            <Main query={query} artists={artists} setSongIndex={setSongIndex} />
          </Route>
          <Route exact path="/home">
            <Header artists={artists} setQuery={setQuery} />
            <Main query={query} artists={artists} setSongIndex={setSongIndex} />
          </Route>
          <Route exact path="/song">
            <Song songIndex={songIndex} artists={artists} />
          </Route>
          <Route exact path="/artist">
            <Artist />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};
