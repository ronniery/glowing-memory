import React, { useEffect } from "react";
import axios from "axios";

import logo from "./logo.svg";
import "./App.css";


function App() {
  useEffect(() => {
    const fetchTickets = async () => {
      const {data} = await axios.get('http://localhost:3000/tickets');

      console.log(`Fetched tickets: ${JSON.stringify(data)}`)
    }

    fetchTickets();
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to the Client Ticket Task!</p>
        <p>
          <b>Good Luck!</b>
        </p>
        <span className="App-span">
          Make sure you read and understand the requirements in the README file
        </span>
      </header>
    </div>
  );
}

export default App;
