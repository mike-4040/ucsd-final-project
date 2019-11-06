import React from "react";

function Card(props) {
  return (
    <div className="card m-1 bg-light">
      <div className="card-body">
      
          {props.children}
       
      </div>
    </div>
  );
}

export default Card;
