import React, { FC } from "react";
import { ChevronForwardOutline, LeafOutline } from "react-ionicons";
import { Link } from "react-router-dom";

export default function VisitorItem({ data }) {
  return (
    <Link to={`edit/${data.id}`} className="item py-3 px-2">
      <div className="detail">
        <img
          src={data.visitor_photo}
          alt="img"
          className="image-block imaged"
          style={{ width: 48, height: 48, objectFit: "cover" }}
        />
        <div>
          <strong>{data.visitor_firstName} {data.visitor_lastName}</strong>
          <p>{data.car_identification}</p>
        </div>
      </div>
      <div className="right">
        <div className="">
          <span className="text-muted me-1">Editar</span>
          <ChevronForwardOutline cssClasses="text-muted" width="16px" />
        </div>
      </div>
    </Link>
  );
}
