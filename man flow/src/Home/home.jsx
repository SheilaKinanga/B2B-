import React from "react";

const NewsandEvents = () => {
  return (
    <div className="news-and-events">
      <section className="events">
        <h2>Events</h2>

        <div className="product-launch">
          <h3>Product Launch</h3>
          <div className="video-container">
            <video width="600" controls>
              <source src={productLaunchVideo} type="video/mp4" />
            </video>
            <div className="video-description">
              <p>Join us for the launch of our latest product! This groundbreaking event highlights the features and benefits that make this product a game-changer in its field.</p>
            </div>
          </div>
        </div>