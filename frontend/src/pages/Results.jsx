import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Card,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const [votes, setVotes] = useState([]);
  const [question, setQuestion] = useState("");
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    axios
      .get(`http://localhost:5000/api/polls/get-poll/${params.id}`)
      .then((res) => {
        let temp_labels = [];
        let temp_votes = [];
        res.data.polls.options.forEach((ele) => {
          temp_labels.push(ele.title);
        });
        res.data.polls.options.forEach((ele) => {
          temp_votes.push(ele.votes);
        });
        setLabels(temp_labels);
        setVotes(temp_votes);
        setLoading(false);
        setQuestion(res.data.polls.question);
      })
      .catch((e) => console.log(e));
  }, []);

  const resultData = {
    labels: labels,
    datasets: [
      {
        label: "Votes recorded",
        backgroundColor: ["blue", "green", "red", "black"],
        data: votes,
      },
    ],
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <center style={{ marginTop: "5em" }}>
          <CircularProgress />
        </center>
      ) : (
        <>
          <Grid container justify="center">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <Button
            
                variant="outlined"
                style={{ margin: "1.5em", backgroundColor:'white', color:'#a52a2a' }}
                startIcon={<ArrowBackIos />}
              >
                Go Back
              </Button>
            </Link>
          </Grid>
          <Grid container justifyContent="center">
            <Card variant="outlined" style={{ width: "30vw", padding: "2em" }}>
              <Typography variant="h6">
                <center>{question}</center>
              </Typography>
              <Grid container justify="center" style={{ marginTop: "1em" }}>
                <Grid item>
                  <Doughnut
                    data={resultData}
                    options={{
                      title: {
                        display: true,
                        text: "Votes Recorded",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </>
      )}
    </>
  );
};

export default Results;
