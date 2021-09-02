import React, { useState, useEffect } from "react";
import { Card } from "../card/Card";
import Search from "../search/Search";
import "./Header.css";

export default function Header(props) {
  const { setQuery, artists } = props;

  return (
    <>
      <div class="jumbotron bg-cover text-white">
        <div class="container-fluid pt-5">
          <div className="row">
            <div className="col">
              <h1 class="display-4 font-weight-bold">Spotifive Audio</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p class="font-italic mb-0">
                Listen to music from your favorite streaming services, all in
                one place.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p class="font-italic">
                by
                <a
                  href="https://www.linkedin.com/in/gera-davidov/"
                  class="text-white"
                >
                  <u> German Davidov</u>
                </a>
              </p>
            </div>
            <div className="col search">
              <Search setQuery={setQuery} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
