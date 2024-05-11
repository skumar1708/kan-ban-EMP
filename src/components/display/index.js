import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faIconLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./display.css";

const Dropdown = ({ onChangeGrouping, onChangeOrdering }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [grouping, setGrouping] = useState(
    sessionStorage.getItem("groupBy") || ""
  );
  const [ordering, setOrdering] = useState(
    sessionStorage.getItem("orderBy") || ""
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
    onChangeGrouping(event.target.value);
  };

  const handleOrderingChange = (event) => {
    setOrdering(event.target.value);
    onChangeOrdering(event.target.value);
  };

  return (
    <div className="disaply-content">
      <div className="dropdown">
        <div className="dropdown-header" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faIconLeft} className="icon-left" />
          Display
          {isOpen ? (
            <FontAwesomeIcon icon={faCaretUp} className="icon-right" />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} className="icon-right" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-item">
            <label htmlFor="grouping">Grouping:</label>
            <select
              id="grouping"
              value={grouping}
              onChange={handleGroupingChange}
            >
              <option value="status">By status</option>
              <option value="userId">By users</option>
              <option value="priority">By Priority</option>
            </select>
          </div>
          <div className="dropdown-item">
            <label htmlFor="ordering">Ordering:</label>
            <select
              id="ordering"
              value={ordering}
              onChange={handleOrderingChange}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
