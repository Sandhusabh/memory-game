import React from "react";
import { Card } from "antd";
const { Meta } = Card;
const ImageCard = ({ imageUrl, title }) => (
  <div className="card-container">
    <Card
        hoverable
        style={{ maxWidth: 240, maxHeight: 250 }}
        cover={<img alt="example" src={imageUrl} />}
      >
        {/* <Meta title={title} /> */}
      </Card>
  </div> 
);

export default ImageCard;
