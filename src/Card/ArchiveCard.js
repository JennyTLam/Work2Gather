import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Badge from '@material-ui/core/Badge';
import ClearIcon from '@material-ui/icons/Clear';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import SeeMore from "./SeeMore"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import firebase from "../shared/firebase";

const db = firebase.database().ref();

const useStyles = makeStyles({
  root: {
    margin: "auto",
    minWidth: "35%",
    boxShadow: "3px 3px 25px 2px rgba(0,0,0,0.5)",
    // marginLeft: "5%",
    // marginRight: "5%",
    // overflow: "auto",
    // marginTop: "50px",
    // display: "inline-block",
    // border: "1px solid black"
  },
  title: {
    fontSize: 14,
  },
  table: {
    tableLayout: "auto",
    width: "99.9%",
    marginTop: "0px",
    marginBottom: "10px",
  },
  marginless: {
    margin: 0,
  },
  tableCont: {
    width: "300",
  },
  progressFilled1: {
    size: "small",
    backgroundColor: "#14ECF5", //our own special blue
    border: "1px solid black",
  },
  progressFilled2: {
    size: "small",
    backgroundColor: "#14F58E", //our own special green
    border: "1px solid black",
  },
  progressUnfilled: {
    size: "small",
    border: "1px solid black",
  },
  pos: {
    marginBottom: 12,
  },
  ourSpecialBlue: {
    backgroundColor: "#14ECF5", //our own special blue
    padding: "5px",
  },
  ourSpecialGreen: {
    backgroundColor: "#14F58E", //our own special green
    padding: "5px",
  },
  weekDays: {
    size: "small",
    borderBottom: "1px solid black",
    paddingBottom: "0px",
    paddingTop: "10px",
    textAlign: "center",
    width: "50px",
  },
  onDays: {
    size: "small",
    borderBottom: "1px solid black",
    paddingBottom: "0px",
    paddingTop: "10px",
    textAlign: "center",
    width: "50px",
    backgroundColor: "#14ECF5",
  },
  shape1: {
    backgroundColor: "#14ECF5",
    opacity: 0.5,
  },
  shape2: {
    backgroundColor: "#14F58E",
    opacity: 0.5,
  },
  shapeCircle: {
    borderRadius: "50%",
  },
  goalCircle: {
    backgroundColor: "white",
  },
  backCircle: {
    backgroundColor: "black",
  },
});

const ArchiveCard = ({ goal, user }) => {  
  const [creatorName, setCreatorName] = useState("");
  const [inviteeName, setInviteeName] = useState("");
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const setGoalUserNames = (snap) => {
      if (snap.val()) {
        setCreatorName(
          snap.val()[goal["groupMembers"]["creator"]]["name"].split(" ")[0]
        );
        setInviteeName(
          snap.val()[goal["groupMembers"]["invitee"]]["name"].split(" ")[0]
        );
      }
    };

    const dbUsers = firebase.database().ref("users");
    dbUsers.on("value", setGoalUserNames, (error) => alert(error));
    return () => {
      dbUsers.off("value", setGoalUserNames);
    };

  }, [goal]);

  

  const deleteGoal = () => {
    if(user.uid===goal.groupMembers.creator) {
      db.child('users').child(goal.groupMembers.creator).child('goals').child(goal.key).set(null);
      db.child('goals').child(goal.key).child('deleted').set(true);
    }
    else {
      db.child('users').child(goal.groupMembers.invitee).child('invites').child(goal.key).set(null);
      db.child('goals').child(goal.key).child('deleted').set(true);
    }
    // db.child('goals').child(goal.key).set(null);
  }

  const archiveGoal = () => {
    if(user.uid===goal.groupMembers.creator) {
      db.child('goals').child(goal.key).child('archivedCreator').set(true);
    }
    else {
      db.child('goals').child(goal.key).child('archivedInvitee').set(true);
    }
    setOpen(false);
    // db.child('goals').child(goal.key).set(null);
  }

  return (
    <Badge 
      badgeContent={<ClearIcon onClick={()=>setOpen(true)}/>} 
      color="primary"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      >
        <Dialog open={open} onClose={()=>setOpen(false)}>
          <DialogContent>
            Are you sure you want to delete this goal?
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setOpen(false)}>Cancel</Button>
            {goal.confirmed? <Button onClick={archiveGoal}>Archive</Button> : null}
            <Button onClick={deleteGoal}>Delete</Button>
          </DialogActions>
        </Dialog>
        <Card className={classes.root}>
          <CardContent>
            <div style={{ width: "80%", display: "inline-block" }}>
              <Typography variant="h5" component="h2">
                {goal["title"]}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <br></br>
                <br></br>
                Started: {goal["startDate"]}
                <br></br>
                Duration: {goal["duration"] + ' Weeks'}  
                <br></br>
                Ended: {new Date(new Date(goal["startDate"]).getTime() + goal["duration"] * 7 * 24 * 60 * 60 * 1000).getMonth() + 1 + "/" + new Date(new Date(goal["startDate"]).getTime() + goal["duration"] * 7 * 24 * 60 * 60 * 1000).getDate() + "/" + new Date(new Date(goal["startDate"]).getTime() + goal["duration"] * 7 * 24 * 60 * 60 * 1000).getFullYear()}
                
              </Typography>
            </div>
            <div
              style={{ width: "20%", display: "inline-block", float: "right" }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.ourSpecialBlue}>
                      {" "}
                      {creatorName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.ourSpecialGreen}>
                      {" "}
                      {inviteeName}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div style={{textAlign:'center', display:'inline-block', width:'100%'}}><div style={{textAlign:'center'}}>
            <CheckCircleIcon style={{fontSize:100, color: '#14F58E', marginLeft:'auto', marginRight:'auto'}}/>
            </div></div>
            <br></br>
            
            <div style={{textAlign:'center', display:'inline-block', width:'100%'}}><div style={{textAlign:'center'}}>            
                <SeeMore buttonText={'Review Goal'} goal={goal} />
              </div>
              </div>
          </CardContent>
        </Card>
      </Badge>
  );
};

export default ArchiveCard;
