import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router";
import ReactPlayer from "react-player";
import Loading from "../loading/Loading";

export default function Song() {
  toast.configure();
  const [profile, setProfile] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favoritesBtn, setFavoritesBtn] = useState(false);

  const song = useLocation();

  const notifyLoading = () => {
    toast.warning("One second please", {
      position: toast.POSITION.TOP_LEFT,
    });
  };
  const notifyAddedToFavorites = () => {
    toast.success("song seccessfully been added", {
      position: toast.POSITION.TOP_LEFT,
    });
  };
  const notifyExits = () => {
    toast.error("song has already been added to playlist", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  useEffect(() => {
    if (!loading) {
      notifyLoading();
    }
  }, [loading]);

  useEffect(() => {
    if (song.state.artist) {
      var options = {
        method: "GET",
        url: `https://genius.p.rapidapi.com/songs/${song.state.artist.result.id}`,
        headers: {
          "x-rapidapi-host": "genius.p.rapidapi.com",
          "x-rapidapi-key":
            "9da9f853dcmsh86bba916aa656c2p18fc8djsne2562db22529",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setProfile(response.data.response.song);
          setLoading(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      var options = {
        method: "GET",
        url: `https://genius.p.rapidapi.com/songs/${song.state.song.id}`,
        headers: {
          "x-rapidapi-host": "genius.p.rapidapi.com",
          "x-rapidapi-key":
            "9da9f853dcmsh86bba916aa656c2p18fc8djsne2562db22529",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setProfile(response.data.response.song);
          setLoading(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [song]);

  if (profile) {
    for (let index = 0; index < profile?.media?.length; index++) {
      if (profile.media[index].provider === "youtube") {
        var element = profile.media[index].url;
      }
    }
  }

  useEffect(() => {
    const dataGetItem = JSON.parse(localStorage.getItem("favorites"));
    if (dataGetItem) {
      setFavorites(dataGetItem);
    }
  }, []);

  useEffect(() => {
    if (favoritesBtn) {
      const dataGetItem = JSON.parse(localStorage.getItem("favorites"));
      if (dataGetItem) {
        const exist = dataGetItem.find((x) => x.id === profile.id);
        if (exist) {
          notifyExits();
          setFavoritesBtn(false);
        } else {
          localStorage.setItem("favorites", JSON.stringify(favorites));
          notifyAddedToFavorites();
          setFavoritesBtn(false);
        }
      } else {
        localStorage.setItem("favorites", JSON.stringify(favorites));
        notifyAddedToFavorites();
        setFavoritesBtn(false);
      }
    }
  }, [favoritesBtn]);

  return (
    <>
      {loading ? (
        <div className="container-fluid pt-5 ">
          <div className="row pt-2">
            <div class="col d-flex justify-content-center">
              <div class="artist-box">
                <img
                  className="rounded-circle img-thumbnail"
                  src={profile?.song_art_image_url}
                  style={{ height: "300px", width: "300px" }}
                />

                <div class="artist-box-content">
                  <h3 class="title">{profile?.full_title}</h3>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ color: "whitesmoke" }}
            className="container  text-center pt-3"
          >
            <div className="row">
              <div className="col">
                <p>{profile?.description?.dom.children[0].children[0]}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>Recording location</strong>
                <p>{profile?.recording_location}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>Release date</strong>
                <p>{profile?.release_date_for_display}</p>
              </div>
            </div>
            <div className="row ">
              <div className="col pb-1">
                <a
                  onClick={() => {
                    setFavorites((favorites) => [...favorites, profile]);
                    setFavoritesBtn(true);
                  }}
                  style={{ color: "whitesmoke" }}
                  className="btn btn-md red"
                >
                  add to playlist
                </a>
              </div>
            </div>
            <div className="row ">
              <div className="col d-flex justify-content-center pb-3">
                <ReactPlayer playing={true} width="100%" url={element} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
