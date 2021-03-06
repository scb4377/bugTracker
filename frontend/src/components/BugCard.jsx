import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CommentIcon from "@mui/icons-material/Comment";
import Badge from "@mui/material/Badge";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: "20px",
    cursor: "pointer",
    minHeight: "100px",
    "&:hover": {
      backgroundColor: "var(--fifth-color)",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
      padding: "10px 5px",
    },
  },
  header: {
    width: "25%",
    textAlign: 'center',
    color: "white",
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
  },
  p: {
    width: "25%",
    textAlign: "center",
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  statusP: {
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
  },
  status: {
    width: "25%",
    margin: "auto",
    padding: "5px",
    textAlign: "center",
    color: "white",
    borderRadius: "2px",
    minWidth: "60px",
    display: "block",
  },
  badge: {
    position: "absolute",
    bottom: "10px",
    left: "5px",
    [theme.breakpoints.up('md')]: {
      left: "20px"
    }
  },
  icon: {
    position: "absolute",
    color: "white",
  },
}));

export const BugCard = ({ bug, dateFunction }) => {
  const { name, author, createdAt, status, comments } = bug;

  const classes = useStyles();

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate("/bugView", {
      state: {
        bug: bug,
      },
    });
  };

  return (
    <Grid item xs={12}>
      <Paper
        className={classes.card}
        sx={{ backgroundColor: "var(--third-color)", transition: "all 0.3s ease-in-out" }}
        onClick={handleViewClick}
      >
        <h2 className={classes.header}>{name}</h2>
        <Badge
          badgeContent={comments.length}
          className={classes.badge}
          color="warning"
        >
          <CommentIcon className={classes.icon} fontSize="small" />
        </Badge>
        <p className={classes.p}>{dateFunction(createdAt)}</p>
        <p className={classes.p}>{author}</p>
        <div className={classes.statusP}>
          <div
            className={classes.status}
            style={
              status === "open"
                ? { backgroundColor: "#3B817D" }
                : { backgroundColor: "#D34E4B" }
            }
          >
            {status}
          </div>
        </div>
      </Paper>
    </Grid>
  );
};
