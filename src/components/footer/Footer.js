import React, { useState, useEffect } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function Footer() {
  const [playlist, setPlaylist] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    var options = {
      method: "GET",
      url: "https://unsa-unofficial-spotify-api.p.rapidapi.com/playlist",
      params: { id: "2IbZGv306zaldI0lap578G", start: "0", limit: "50" },
      headers: {
        "x-rapidapi-host": "unsa-unofficial-spotify-api.p.rapidapi.com",
        "x-rapidapi-key": "9da9f853dcmsh86bba916aa656c2p18fc8djsne2562db22529",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setPlaylist(response.data.Results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [index]);

  if (index < 0) {
    setIndex(0);
  }

  return (
    <>
      <AudioPlayer
        onClickNext={() => {
          setIndex(index + 1);
        }}
        onClickPrevious={() => {
          setIndex(index - 1);
        }}
        showSkipControls={true}
        autoPlay={false}
        src={playlist[index]?.track.preview_url}
      />
    </>
  );
}
