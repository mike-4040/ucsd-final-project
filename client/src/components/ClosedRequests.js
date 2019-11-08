import React from "react";
import { timeFormat } from "../utils/settings";

function ClosedRequests({ requests, handler }) {
  
  return (
    <table className="table text-center table-hover ">
      <thead>
        <tr>
          <th scope="col">Items</th>
          <th scope="col">Price</th>
          <th scope="col">Location</th>
          <th scope="col">Time</th>
          <th scope="col">Winner</th>
          <th scope="col">Contact</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(request => (
          <tr key={request._id} onClick={() => handler(request._id)}>
            <td>{request.item}</td>
            <td>{request.priceFinal}</td>
            <td>{request.location}</td>
            <td>{new Date(request.time).toLocaleString("en-US", timeFormat)}</td>
            <td>{request.winnerName}</td>
            <td>{request.winnerEmail}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ClosedRequests;
