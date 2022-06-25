import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Board = () => {
  const [state, setState] = useState("");
  const [data, setData] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const postData = () => {
    axios
      .post("https://crimecheck-noticeboard.herokuapp.com/board", state)
      .then(res => {
        // alert("Notice Added")
        window.location.reload();
      });
  };

  const getData = () => {
    axios
      .get("https://crimecheck-noticeboard.herokuapp.com/board")
      .then(res => {
        setData(res.data, ...data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="container">
        <h1><Link to="/" style={{textDecoration:'none'}}>Notice Board</Link></h1>

        <TextField
          id="standard-multiline-static"
          label="Submit a Notice"
          placeholder="Enter your Notice Here"
          multiline
          rows={3}
          name="description"
          onChange={handleChange}
          sx={{ width: "100%", marginBottom: "30px" }}
        />

        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "80%" }}
          onClick={postData}
        >
          Submit
        </Button>
      </div>

      <div className="mapping">
        {data.map(e => (
          <div key={e._id} className="datadiv">
            <h4>{e.description}</h4>
            <p className="created">{e.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
