import { useState, useEffect } from "react";
import api from "../api";

function Home() {
  const [ThreatSources, setThreatSources] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

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
      })
      .catch((error) => alert(error));
    getThreatSources();
  };

  const createThreatSource = (e) => {
    e.preventDefault();
    api
      .post("/api/threatsources/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Threat Source created!");
        else alert("Failed to make a threat source.");
      })
      .catch((err) => alert(err));
    getThreatSources();
  };

  return (
    <div>
      <div>
        <h2>Threat Sources</h2>
      </div>
      <h2>Add a Threat Source</h2>
      <form onSubmit={createThreatSource}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;