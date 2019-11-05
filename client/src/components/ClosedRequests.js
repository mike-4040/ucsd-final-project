import React from 'react';

function ClosedRequests({ requests }) {
  console.log('Table Props', requests[0].item);

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
        {requests.map(request =>
          <tr key={request._id}>
            <td>{request.item}</td>
            <td>{request.priceInitial}</td>
            <td>{request.priceBest}</td>
            <td>{request.numberOffers}</td>
            <td>{request.location}</td>
            <td>{request.time}</td>
          </tr>
        )
        }
      </tbody>
    </table>
  );
}

export default ClosedRequests;
