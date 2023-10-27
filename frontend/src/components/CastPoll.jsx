import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  CardContent,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { ArrowBackIos, Send } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const CastPoll = () => {
  const [pollID, setPollID] = useState();
  const [pollData, setPollData] = useState();
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState(null);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

  useEffect(() => {
    (async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      setPollID(params.id);

      let res = await axios.get(
        `http://localhost:5000/api/polls/get-poll/${params.id}`
      );

      setPollData(res.data.polls);
      setLoading(false);
    })();
  }, []);

  const submitPoll = () => {
    axios
      .post("http://localhost:5000/api/polls/cast-vote", {
        pollId: pollID,
        optionId: option,
      })
      .then((res) => handleClickOpen());
  };

  return (
    < >
      {loading ? (
        <center style={{ margin: "5em" }}>
          <CircularProgress  />
        </center>
      ) : (
        <>
          <Grid container justify="center">
            <Link to="/" style={{ color: "whitesmoke", textDecoration: "none" }}>
              <Button
              
                variant="outlined"
                style={{ marginTop: "1.5em",color:'#a52a2a',backgroundColor:'white' }}
                startIcon={<ArrowBackIos />}
              >
                Go Back
              </Button>
            </Link>
          </Grid>
          <Grid container justifyContent="center" style={{ marginTop: "1em" }}>
            <Grid item>
              <Card
                style={{
                  padding: "1.5em",
                  margin: "1em",
                }}
                variant="outlined"
              >
                <CardContent >
                  <Typography
                    variant="overline"
                    
                    style={{ fontSize: "1.25em",color:'#a52a2a',backgroundColor:'white'}}
                  >
                    <b >{pollData.pollName}</b>
                  </Typography>
                  <Typography style={{ color:'#a52a2a'}} >{pollData.question}</Typography>
                  <RadioGroup   aria-label="options" name="radio-buttons-group">
                    {pollData.options.map((element, index) => (
                      <FormControlLabel
                        value={"" + element.id}
                        control={<Radio style={{ color:'#a52a2a'}} />}
                        label={element.title}
                        onChange={(e) => setOption(e.target.value)}
                        key={index}
                      />
                    ))}
                  </RadioGroup>
                </CardContent>

                <Button
                  color="primary"
                  disabled={option === null}
                  variant="contained"
                  onClick={submitPoll}
                  style={{ marginTop: "1em", marginBottom: "1em",color:'white', backgroundColor:'#a52a2a'}}
                  startIcon={<Send />}
                  fullWidth
                >
                  Submit
                </Button>
              </Card>
            </Grid>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Vote Success"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Congratulations! You have successfully cast your vote!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
            
                variant="contained"
                onClick={handleClose}
                autoFocus
                style={{ marginRight: "1em", marginBottom: "1em",backgroundColor:'#a52a2a' }}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default CastPoll;
