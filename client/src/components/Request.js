import React from "react";
import Card from "./Card";
import { timeFormat } from "../utils/settings";

function Request(props) {
  return (
    <>
      <h3>Request information:</h3>
      <Card>
        <p>Item: {props.item}</p>
        <p>Initial Price: ${props.priceInitial}</p>
        <p>Requered at: {new Date(props.time).toLocaleString("en-US", timeFormat)}</p>
        <p>Location: {props.location}</p>
      </Card>
    </>
  );
}

export default Request;
