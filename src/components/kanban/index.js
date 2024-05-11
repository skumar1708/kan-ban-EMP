import React from "react";
import { sortBy, keys, map, find, toLower } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCircle,
  faSignal5,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";

import Card from "../card";
import "./kanban.css";
const Kanban = ({ ticketsData, usersData, hideUserIcon, orderByData }) => {
  const getInitals = (userId) => {
    const user = find(usersData, (usr) => usr.id === userId).name.split(" ");
    const firstInitial = user?.[0]?.charAt(0);
    const lastInitial = user?.[1]?.charAt(0) || "";

    // Concatenate the initials and return
    return `${firstInitial?.toUpperCase()}${lastInitial?.toUpperCase()}`;
  };

  const priorityMap = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  const getGroupTitle = (item) => {
    if (priorityMap[item]) return priorityMap[item];
    if (find(usersData, (usr) => usr.id == item)) {
      return (
        <div className="user-group">
          <span className="initials initials-small">{getInitals(item)}</span>
          <span>
            &nbsp;&nbsp;{find(usersData, (usr) => usr.id == item).name}
          </span>
        </div>
      );
    }

    return item;
  };

  return (
    <div className="kanban-board">
      {keys(ticketsData).map((item) => {
        return (
          <div className="kanban-board-item">
            <h6 className="item-h6">
              <FontAwesomeIcon
                icon={faCircle}
                className={`mr-5 font-10 tr-5 ${toLower(
                  getGroupTitle(item)
                ).replace(/\s/g, "-")}`}
              />
              <span>{getGroupTitle(item)}</span>
              <span>&nbsp;&nbsp;{ticketsData[item].length}</span>
            </h6>

            {/* { title, initials, details, featureRequestTitle } */}
            {map(
              sortBy(ticketsData[item], (o) => o[orderByData]),
              (card) => {
                return (
                  <Card
                    {...{
                      ...card,
                      initials: getInitals(card.userId),
                      hideUserIcon,
                    }}
                  />
                );
              }
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Kanban;
