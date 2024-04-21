import { useState, useEffect } from "react";
import api from "../api";
import ThreatSource from "../components/ThreatSource";
import "../styles/Home.css";
import FirewallRuleGenerator from "../components/FirewallRuleGenerator";

function Home() {
  const [ThreatSources, setThreatSources] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    getThreatSources();
  }, []);

  const getThreatSources = () => {
    api
      .get("/api/threatsources/")
      .then((res) => res.data)
      .then((data) => {
        setThreatSources(data);
      })
      .catch((err) => alert(err));
  };

  const deleteThreatSource = (id) => {
    api
      .delete(`/api/threatsources/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Threat Source deleted!");
        else alert("Failed to delete threat source.");
        getThreatSources();
      })
      .catch((error) => alert(error));
  };

  const createThreatSource = (e) => {
    e.preventDefault();
    api
      .post("/api/threatsources/", { name, address })
      .then((res) => {
        if (res.status === 201) alert("Threat Source created!");
        else alert("Failed to make a threat source.");
        getThreatSources();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <FirewallRuleGenerator />
        <h2>Important IPs</h2>
        {ThreatSources.map((threatSource) => (
          <ThreatSource
            threatSource={threatSource}
            onDelete={deleteThreatSource}
            key={threatSource.id}
          />
        ))}
      </div>
      <h2>Add an Address</h2>
      <form onSubmit={createThreatSource}>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label htmlFor="address">IP Address:</label>
        <br />
        <input
          type="text"
          id="address"
          name="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
