import React from "react";
import { timeFormat } from "../utils/settings";

function OpenRequests({ requests, handler }) {
  return (
    <table className="table table-sm text-center table-hover table-condensed">
      <thead>
        <tr>
          <th scope="col">Items</th>
          <th scope="col">Initial price</th>
          <th scope="col">Current bid</th>
          <th scope="col">Bids</th>
          <th scope="col">Location</th>
          <th scope="col">When</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(request => (
          <tr key={request._id} onClick={() => handler(request._id)}>
            <td>{request.item}</td>
            <td>{request.priceInitial}</td>
            <td>{request.priceBest}</td>
            <td>{request.numberOffers}</td>
            <td>{request.location}</td>
            <td>{new Date(request.time).toLocaleString("en-US", timeFormat)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OpenRequests;
