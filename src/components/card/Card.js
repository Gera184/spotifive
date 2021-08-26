import React from "react";
import "./Card.css";

export const Card = ({ image, title, song_art_primary_color }) => {
  return (
    <>
      <div class="d-flex justify-content-center profile-card-2 ">
        <div>
          <div class="text-center mt-2">
            <img
              className="img-thumbnail rounded mx-auto d-block"
              src={image}
              style={{ height: "300px", width: "300px" }}
            />
            <div className="p-3">
              <h4
                style={{
                  backgroundColor: "transparent",
                  color: song_art_primary_color,
                }}
              >
                {title}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
