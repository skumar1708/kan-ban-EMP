import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCircle,
  faSignal5,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";
import { map } from "lodash";
import "./card.css";

const Card = ({ id, initials, title, tag, hideUserIcon }) => {
  const getTagsJSX = (tag) => {
    return map(tag, (tag) => tag);
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        {!hideUserIcon && (
          <div className="user-icon">
            {/* <FontAwesomeIcon icon={faUser} /> */}
            <span className="initials">{initials}</span>
          </div>
        )}
      </div>
      <div className="card-body">{title}</div>
      <div className="card-footer">
        <FontAwesomeIcon
          icon={faSignal5}
          className="footer-icon mr-10 font-10"
        />
        <FontAwesomeIcon icon={faCircle} className="mr-5 font-10 tag tr-5" />
        <span className="feature-request mr-5 font-10 tag">
          {getTagsJSX(tag)}
        </span>
      </div>
    </div>
  );
};

export default Card;
