import React from 'react';

function Table({ requests }) {
  console.log('Table Props', requests[0].item);

  return (
    <table className="table text-center table-hover ">
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
        {requests.map(request =>
          <tr key={request._id}>
            <td>{request.item}</td>
            <td>{request.priceInitial}</td>
            <td>Current bid</td>
            <td>Bids</td>
            <td>{request.location}</td>
            <td>{request.time}</td>
          </tr>
        )
        }
      </tbody>
    </table>
  );
}

export default Table;


