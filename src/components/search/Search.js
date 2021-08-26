import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../card/Card";
import "./Search.css";

export default function Search(props) {
  const [artist, setArtist] = useState("");
  const { setQuery } = props;

  return (
    <>
      <form>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <input
                type="text"
                value={artist}
                required
                onChange={(e) => {
                  setArtist(e.target.value);
                }}
                className="search-input"
                placeholder="Artist name"
              />
            </div>
          </div>
          <div className="row">
            <div className="col pt-3">
              <button
                onClick={() => {
                  {
                    setQuery(artist);
                    setArtist("");
                  }
                }}
                type="button"
                class="three"
              >
                <a>
                  <b>SEND</b>
                </a>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
