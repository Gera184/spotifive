import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Card } from "../card/Card.js";
import ReactPlayer from "react-player";

export default function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [index, setIndex] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  toast.configure();
  let history = useHistory();

  const notifyFavoritesEmpty = () => {
    toast.error("Nothing as been added yet", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const notifyWelcomePlaylist = () => {
    toast.success("click you favorite song on your playlist", {
      position: toast.POSITION.TOP_LEFT,
    });
  };
  const notifyDelete = () => {
    toast.warning("Song seccessfully deleted from playlist", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  useEffect(() => {
    if (deleted) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      notifyDelete();
      setDeleted(false);
      setLoading(false);
    }
  }, [deleted]);

  useEffect(() => {
    if (favorites.length === 0) {
      notifyFavoritesEmpty();
      history.push("/home");
    } else {
      if (!loading) {
        notifyWelcomePlaylist();
      }
    }
  }, [favorites]);

  useEffect(() => {
    if (loading) {
      for (let i = 0; i < favorites[index].media.length; i++) {
        if (favorites[index].media[i].provider === "youtube") {
          setVideo(favorites[index].media[i].url);
        }
      }
    }
  }, [loading]);

  const deleteAll = () => {
    localStorage.removeItem("favorites");
    history.push("/");
    notifyDelete();
  };

  return (
    <>
      {loading ? (
        <>
          <div className="container pt-5 text-center ">
            <div className="row pt-2">
              <div class="col d-flex justify-content-center">
                <div class="artist-box">
                  <img
                    className="rounded-circle img-thumbnail"
                    src={favorites[index]?.song_art_image_url}
                    style={{ height: "300px", width: "300px" }}
                  />

                  <div class="artist-box-content">
                    <h3 class="title">{favorites[index]?.full_title}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center text-center pt-3">
              <div
                class="btn-group pb-2"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <a
                  onClick={() => {
                    setLoading(false);
                  }}
                  style={{ color: "whitesmoke" }}
                  className="btn btn-md green"
                >
                  back
                </a>
                ;
                <a
                  onClick={() => {
                    setFavorites(
                      favorites.filter(
                        (item) => item.id !== favorites[index].id
                      )
                    );
                    setDeleted(true);
                  }}
                  style={{ color: "whitesmoke" }}
                  className="btn btn-md red"
                >
                  delete
                </a>
              </div>
            </div>
            <div className="row ">
              <div className="col d-flex justify-content-center pb-3">
                <ReactPlayer playing={true} width="100%" url={video} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container-fluid pt-5">
          <div className="row">
            <div className="col text-center p-2">
              <h2 style={{ color: "whitesmoke" }} class="title">
                My playlist
              </h2>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            {favorites.map((favorite, index) => (
              <>
                <div
                  onClick={() => {
                    setIndex(index);
                    setLoading(true);
                  }}
                  key={index}
                  className="col-md-3 "
                >
                  <Card
                    image={favorite.song_art_image_url}
                    title={favorite.title_with_featured}
                    song_art_primary_color={favorite.song_art_primary_color}
                  />
                </div>
              </>
            ))}
          </div>
          <div className="row p-1">
            <div className="col text-center">
              <a
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ color: "whitesmoke" }}
                className="btn btn-md red"
              >
                delete all
              </a>
            </div>
          </div>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog pt-5">
              <div class="modal-content">
                <div class="modal-body">
                  You sure you want to delete your playlist?
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-md green"
                    data-bs-dismiss="modal"
                  >
                    leave it
                  </button>
                  <button
                    onClick={() => {
                      deleteAll();
                    }}
                    type="button"
                    class="btn btn-md red"
                    data-bs-dismiss="modal"
                  >
                    delete all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
