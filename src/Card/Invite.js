import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import firebase from "../shared/firebase";

const db = firebase.database().ref();

const useStyles = makeStyles({
  root: {
    width:"280px",
    boxShadow: "3px 3px 25px 2px rgba(0,0,0,0.5)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
});

const Invite = ({ goal, user }) => {
  const [creatorName, setCreatorName] = useState('');

  const classes = useStyles();

  const accept = () => {
    db.child("goals").child(goal["key"]).child("confirmed").set(true);
    alert("accept!");
  };

  const reject = () => {
    //delete goals
    db.child("goals").child(goal["key"]).child("confirmed").set(true);
    db.child("users").child(goal["groupMembers"]["invitee"]).child("invites").child(goal["key"]).set(null);
    db.child("goals").child(goal["key"]).child("rejected").set(true);
    alert("reject!");
  };

  useEffect(() => {
    const setCreatorNameCallback = (snap) => {
      if (snap.val()) {
        setCreatorName(
          snap.val()[goal["groupMembers"]["creator"]]["name"]
        )
      }
    };
    const dbUsers = firebase.database().ref("users");
    dbUsers.on("value", setCreatorNameCallback, (error) => alert(error));
    return () => {
      dbUsers.off("value", setCreatorNameCallback);
    };
  }, [goal]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <div style={{display: "inline-block" }}>
          <Typography variant="h5" component="h2">
            {goal["title"]}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <br></br>
            Invite From: {creatorName}
            <br></br>
            Start Date: {goal["startDate"]}
            <br></br>
            Duration: {goal["duration"]} Weeks
            <br></br>
            Daily Goal: {goal["minimum"]} {goal["metric"]}
          </Typography>
        </div>
        <Container style={{ marginLeft: "auto", marginRight: "auto", display: "inline-block"}}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            style={{float: "left", marginBottom: "10px" }}
            onClick={accept}
          >
            Accept
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            style={{float: "right", marginBottom: "10px"}}
            onClick={reject}
          >
            Reject
          </Button>
        </Container>
      </CardContent>
    </Card>
  );
};

export default Invite;
