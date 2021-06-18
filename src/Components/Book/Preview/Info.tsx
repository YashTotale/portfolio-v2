// React Imports
import React, { FC } from "react";
import { Book } from "../../../Utils/types";

// Material UI Imports
import { Link, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexGrow: 1,
    padding: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: 0,
      alignItems: "center",
      justifyContent: "center",
    },
  },
  item: {
    margin: theme.spacing(0.5, 0),
  },
}));

type InfoProps = Book;

const Info: FC<InfoProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.info}>
      {props.series && (
        <Item label="Series" value={props.series} link={props.seriesLink} />
      )}
      {props.yearPublished && (
        <Item label="Year Published" value={props.yearPublished} />
      )}
      <Item label="Average Rating" value={props.avgRating} />
      <Item label="Pages" value={props.pages} />
      <Item
        label="Number of Ratings"
        value={props.numRatings.toLocaleString()}
      />
      <Item
        label="Number of Reviews"
        value={props.numReviews.toLocaleString()}
      />
    </div>
  );
};

interface ItemProps {
  label: string;
  value: string | number | JSX.Element;
  link?: string;
}

const Item: FC<ItemProps> = ({ label, value, link }) => {
  const classes = useStyles();

  if (link) {
    value = (
      <Link href={link} target="_blank" rel="noopener noreferrer">
        {value}
      </Link>
    );
  }

  return (
    <Typography className={classes.item}>
      <strong>{label}:</strong> {value ?? "N/A"}
    </Typography>
  );
};

export default Info;
