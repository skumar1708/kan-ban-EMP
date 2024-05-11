import "./styles.css";
import Display from "./components/display";
import { useEffect, useState } from "react";
import axios from "axios";
import { groupBy, keys, map, find } from "lodash";
import Kanban from "./components/kanban";

export default function App() {
  const [kanban, setKanban] = useState();
  const [ticketsData, setTickets] = useState([]);
  const [usersData, setUsers] = useState([]);
  const [groupByData, setGroupBy] = useState(
    sessionStorage.getItem("groupBy") || "status"
  );
  const [orderByData, setOrderBy] = useState(
    sessionStorage.getItem("orderBy") || "priority"
  );

  const getKanbanBoard = async () => {
    const response = await axios({
      method: "get",
      url: "https://api.quicksell.co/v1/internal/frontend-assignment",
    });
    console.log("ticketsData", groupBy(response?.data?.tickets, groupByData));
    setKanban(response?.data);
    setTickets(groupBy(response?.data?.tickets, groupByData));
    setUsers(response?.data?.users);
  };

  const onChangeGrouping = (group) => {
    setGroupBy(group);
    sessionStorage.setItem("groupBy", group);
  };
  const onChangeOrdering = (order) => {
    setOrderBy(order);
    sessionStorage.setItem("orderBy", order);
  };

  useEffect(() => {
    setTickets(groupBy(kanban?.tickets, groupByData));
  }, [groupByData]);

  useEffect(() => {
    getKanbanBoard();
  }, []);

  return (
    <div className="App">
      <Display
        onChangeGrouping={onChangeGrouping}
        onChangeOrdering={onChangeOrdering}
      />
      <Kanban
        ticketsData={ticketsData}
        usersData={usersData}
        hideUserIcon={groupByData === "userId"}
        orderByData={orderByData}
      />
    </div>
  );
}
