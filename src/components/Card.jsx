import React from "react";
import { Card } from "antd";
import './Card.css'
const ImageCard = ({ imageUrl, title }) => (
  <div className="card-container">
    <button className="button"> 
      <div className="card-image">
        <img height={230} width={200} src={imageUrl} alt={title} />
      </div>
    </button>
  </div>
);

export default ImageCard;
