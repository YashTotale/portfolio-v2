// React Imports
import React, { FC } from "react";
import HorizontalDivider from "../../Divider/Horizontal";
import { Book } from "../../../Utils/types";

// Material UI Imports
import { Chip, Link, makeStyles, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexGrow: 1,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  section: {
    padding: theme.spacing(1),
    flexGrow: 1,
    width: "100%",
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    margin: theme.spacing(0.5, 0),
    width: "100%",
  },
  itemLabel: {
    marginRight: theme.spacing(0.6),
  },
  itemValue: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  genre: {
    margin: theme.spacing(0.25),
  },
}));

type InfoProps = Book;

const Info: FC<InfoProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.info}>
      {(typeof props.rating === "number" || props.datesRead) && (
        <Section>
          {typeof props.rating === "number" && (
            <Item label="My Rating">
              <Rating value={props.rating} readOnly /> (
              {props.rating.toLocaleString()}/5)
            </Item>
          )}
          {props.datesRead && (
            <Item label="Dates Read">{props.datesRead.join(" \u2022 ")}</Item>
          )}
        </Section>
      )}
      <Section>
        <Item label="Pages">{props.pages}</Item>
        {props.yearPublished && (
          <Item label="Year Published">{props.yearPublished}</Item>
        )}
        <Item label="Genres">
          {props.genres.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              size="small"
              className={classes.genre}
            />
          ))}
        </Item>
      </Section>
      <Section last>
        <Item label="Avg Rating">
          <>
            <Rating value={props.avgRating} readOnly /> (
            {props.avgRating.toLocaleString()}/5)
          </>
        </Item>
        <Item label="# of Ratings">{props.numRatings.toLocaleString()}</Item>
        <Item label="# of Reviews">{props.numReviews.toLocaleString()}</Item>
      </Section>
    </div>
  );
};

interface SectionProps {
  last?: boolean;
}

const Section: FC<SectionProps> = ({ children, last }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.section}>{children}</div>
      {!last && <HorizontalDivider height={2} />}
    </>
  );
};

interface ItemProps {
  label: string;
  link?: string;
}

const Item: FC<ItemProps> = ({ label, children, link }) => {
  const classes = useStyles();

  if (link) {
    children = (
      <Link href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    );
  }

  return (
    <Typography className={classes.item}>
      <strong className={classes.itemLabel}>{label}:</strong>{" "}
      <span className={classes.itemValue}>{children ?? "N/A"}</span>
    </Typography>
  );
};

export default Info;
