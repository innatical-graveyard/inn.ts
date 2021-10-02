import React from "react";
import ReactDOM from "react-dom";

const Head: React.FC<{}> = ({ children }) => {
  return ReactDOM.createPortal(children, document.head);
};

export default Head;
