import { useState, useEffect } from "react";
import api from "../api";
import ThreatSource from "../components/ThreatSource";
import "../styles/Home.css";

function Home() {
  const [ThreatSources, setThreatSources] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

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
      .post("/api/threatsources/", { name, url })
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
        <h2>Threat Sources</h2>
        {ThreatSources.map((threatSource) => (
          <ThreatSource
            threatSource={threatSource}
            onDelete={deleteThreatSource}
            key={threatSource.id}
          />
        ))}
      </div>
      <h2>Add a Threat Source</h2>
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
        <label htmlFor="url">Url:</label>
        <br />
        <textarea
          type="url"
          id="url"
          name="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
