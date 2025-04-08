import React from "react";
import { Card } from "antd";
const { Meta } = Card;
const ImageCard = () => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={
      <img
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" />
  </Card>
);

export default ImageCard;
