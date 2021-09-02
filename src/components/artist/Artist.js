import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./Artist.css";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../loading/Loading";
import { Card } from "../card/Card";

export default function Artist() {
  toast.configure();
  const [profile, setProfile] = useState([]);
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [summary, setSummary] = useState(true);
  const [loading, setLoading] = useState(false);
  const [songsBtn, setSongsBtn] = useState(false);
  const [isToggled, setToggled] = useState(false);
  const artist = useLocation();

  const notifyLoading = () => {
    toast.warning("One second please", {
      position: toast.POSITION.TOP_LEFT,
    });
  };
  const notifySongs = () => {
    toast.error("Press the songs button first to load the songs", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  useEffect(() => {
    if (!loading) {
      notifyLoading();
    }
  }, [loading]);

  useEffect(() => {
    if (artist) {
      var options = {
        method: "GET",
        url: `https://genius.p.rapidapi.com/artists/${artist.state.artist.artistId}`,
        headers: {
          "x-rapidapi-host": "genius.p.rapidapi.com",
          "x-rapidapi-key":
            "9da9f853dcmsh86bba916aa656c2p18fc8djsne2562db22529",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setProfile(response.data.response);
          setLoading(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    setLoading(false);
  }, [artist]);

  useEffect(() => {
    if (songsBtn) {
      var options = {
        method: "GET",
        url: `https://genius.p.rapidapi.com/artists/${artist.state.artist.artistId}/songs`,
        headers: {
          "x-rapidapi-host": "genius.p.rapidapi.com",
          "x-rapidapi-key":
            "9da9f853dcmsh86bba916aa656c2p18fc8djsne2562db22529",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setSongs(response.data.response.songs);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [songsBtn]);

  const sortZtoA = () => {
    if (songsBtn) {
      const sorted = songs.sort((a, b) => (b.title > a.title ? 1 : -1));
      setSongs(sorted);
      setToggled(!isToggled);
    } else {
      notifySongs();
    }
  };

  const sortAtoZ = () => {
    if (songsBtn) {
      const sorted = songs.sort((a, b) => (a.title > b.title ? 1 : -1));
      setSongs(sorted);
      setToggled(!isToggled);
    } else {
      notifySongs();
    }
  };

  const filteredQuery = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLocaleLowerCase())
  );

  console.log(songs)
  return (
    <>
      {loading ? (
        <div className="container-fluid pt-5">
          <div className="row pt-2">
            <div class="col d-flex justify-content-center">
              <div class="artist-box">
                <img
                  className="rounded-circle img-thumbnail"
                  src={profile?.artist?.image_url}
                  style={{ height: "300px", width: "300px" }}
                />
                <div class="artist-box-content">
                  <h3 class="title">{profile?.artist?.name}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center text-center pt-3">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <a
                onClick={() => {
                  {
                    setSongsBtn(false);
                    setSummary(true);
                  }
                }}
                style={{ color: "whitesmoke" }}
                className="btn btn-md red"
              >
                summary
              </a>
              ;
              <a
                onClick={() => {
                  {
                    setSongsBtn(true);
                    setSummary(false);
                  }
                }}
                style={{ color: "whitesmoke" }}
                className="btn btn-md green"
              >
                songs
              </a>
              ;
              {isToggled ? (
                <a
                  style={{ color: "whitesmoke" }}
                  className="btn btn-md blue"
                  onClick={sortAtoZ}
                >
                  A-Z
                </a>
              ) : null}
              {!isToggled ? (
                <a
                  style={{ color: "whitesmoke" }}
                  className="btn btn-md blue"
                  onClick={sortZtoA}
                >
                  Z-A
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}

      {summary && (
        <div
          className="container text-center p-4"
          style={{ color: "whitesmoke" }}
        >
          <div className="row">
            <div className="col ">
              <p>{profile?.artist?.description.dom.children[0].children[0]} </p>
              <p>
                <strong>Alternate names:</strong>{" "}
                {profile?.artist?.alternate_names}
              </p>
            </div>
          </div>
          <strong>Sociel media</strong>{" "}
          <div className="row">
            <div className="col">
              <i class="fab fa-facebook-f">
                {" "}
                {profile?.artist?.facebook_name}{" "}
              </i>{" "}
              ,{" "}
              <i class="fab fa-instagram"> {profile?.artist?.instagram_name}</i>{" "}
              , <i class="fab fa-twitter"> {profile?.artist?.twitter_name} </i>
            </div>
          </div>
        </div>
      )}

      {songsBtn && (
        <div className="container-fluid">
          <div className="row pt-3">
            <div className="col text-center ">
              <input
                className="search-input"
                placeholder="Search song"
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderRadius: "10px", textAlign: "center" }}
              />
            </div>
          </div>
          <div className="row">
            {filteredQuery.map((song, index) => (
              <div key={index} className="col-md-3 pt-4">
                <Link
                  to={{
                    pathname: "/song",
                    state: {
                      song,
                    },
                  }}
                >
                  <Card
                    key={song.id}
                    image={song.song_art_image_url}
                    title={song.title_with_featured}
                    song_art_primary_color={song.song_art_primary_color}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
