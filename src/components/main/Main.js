import React, { useState, useEffect } from "react";
import "./Main.css";
import { ToastContainer, toast } from "react-toastify";
import { Card } from "../card/Card";
import { Link } from "react-router-dom";
import data from "../../data.json";

export default function Main(props) {
  toast.configure();
  const [search, setSearch] = useState("");
  const { artists, query } = props;

  console.log(artists);
  const notifyWlecome = () => {
    toast.success(
      "Welcome to spotifive!, Search for specific artist visit our popular searches or just listen to our playlist.",
      {
        position: toast.POSITION.TOP_LEFT,
      }
    );
  };
  const notifyArtistsSongs = () => {
    toast.success("scroll down to see the songs", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  useEffect(() => {
    notifyWlecome();
  }, []);

  useEffect(() => {
    if (artists.length > 0) {
      notifyArtistsSongs();
    }
  }, [artists]);

  const filteredQuery = artists.filter((songs) =>
    songs.result.full_title.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      {artists.length > 0 ? (
        <div className="container-fluid ">
          <div className="row text-center pb-3">
            <div className="col">
              <input
                className="search-input"
                placeholder="Search song"
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderRadius: "10px", textAlign: "center" }}
              />
            </div>
          </div>

          <div className="row">
            {filteredQuery.map((artist, index) => (
              <div key={index} className="col-md-3">
                <Link
                  to={{
                    pathname: "/song",
                    state: {
                      artist,
                    },
                  }}
                >
                  <Card
                    image={artist.result.header_image_url}
                    title={artist.result.full_title}
                    song_art_primary_color={
                      artist.result.song_art_primary_color
                    }
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div class="container pb-5">
            <div className="row">
              <div className="col text-center pb-2">
                <h2 style={{ color: "whitesmoke" }} class="title">
                  Popular
                </h2>
              </div>
            </div>
            <div class="row">
              {data.map((artist) => (
                <div class="col-md-3 d-flex justify-content-center  ">
                  <Link
                    to={{
                      pathname: "/artist",
                      state: {
                        artist,
                      },
                    }}
                  >
                    <div class="box">
                      <img
                        src={artist.image}
                        style={{ height: "200px", width: "300px" }}
                      />
                      <div class="box-content">
                        <h3 class="title">{artist.name}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
