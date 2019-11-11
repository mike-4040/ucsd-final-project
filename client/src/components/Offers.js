import React from "react";
import { timeFormat } from "../utils/settings";

function Offers(props) {
  return (
    <div className="card m-1 bg-light">
      <div className="card-body d-flex justify-content-between">
        <ul>
          {props.offers.map(offer => (
            <li key={offer._id}>
              ${offer.price} {new Date(offer.createdAt).toLocaleString("en-US", timeFormat)} {props.ownerId === offer.ownerId._id ? "*" : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Offers;
