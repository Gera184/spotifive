import React from "react";
import "./Nav.css";
import { FaHome } from "react-icons/fa";

export default function Nav() {
  return (
    <>
      <div class="fixed-top ">
        <header class="topbar">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <ul class="social-network pt-2">
                  <a class="waves-effect waves-dark" href="/home">
                    <FaHome style={{ width: "30px", height: "30px" }} />
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
