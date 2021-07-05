// React Imports
import React, { FC } from "react";
import HorizontalDivider from "../../../../Atomic/Divider/Horizontal";
import { Book } from "../../../../../Utils/types";

// Material UI Imports
import { Chip, Link, makeStyles, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import MatchHighlight from "../../../../Atomic/MatchHighlight";

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
  rating: {
    marginRight: theme.spacing(0.25),
  },
  genre: {
    margin: theme.spacing(0.25),
  },
}));

type InfoProps = Book & {
  search?: string;
};

const Info: FC<InfoProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.info}>
      {(typeof props.rating === "number" || props.datesRead) && (
        <Section>
          {typeof props.rating === "number" && (
            <Item label="My Rating">
              <Rating
                value={props.rating}
                readOnly
                className={classes.rating}
              />
              (
              <MatchHighlight toMatch={props.search}>
                {props.rating.toLocaleString()}
              </MatchHighlight>
              /5)
            </Item>
          )}
          {props.datesRead && (
            <Item label="Dates Read">
              {props.datesRead.map((date, i) => (
                <>
                  {i ? <> &bull; </> : null}
                  <MatchHighlight key={i}>{date}</MatchHighlight>
                </>
              ))}
            </Item>
          )}
        </Section>
      )}
      <Section>
        {props.pages && (
          <Item label="Pages" search={props.search}>
            {props.pages.toLocaleString()}
          </Item>
        )}
        {props.yearPublished && (
          <Item label="Year Published" search={props.search}>
            {props.yearPublished}
          </Item>
        )}
        <Item label="Genres">
          {props.genres.map((genre) => (
            <Chip
              key={genre}
              label={
                <MatchHighlight toMatch={props.search}>{genre}</MatchHighlight>
              }
              size="small"
              className={classes.genre}
            />
          ))}
        </Item>
      </Section>
      <Section last>
        <Item label="Avg Rating">
          <>
            <Rating
              value={props.avgRating}
              readOnly
              className={classes.rating}
            />
            (
            <MatchHighlight toMatch={props.search}>
              {props.avgRating.toLocaleString()}
            </MatchHighlight>
            /5)
          </>
        </Item>
        <Item label="# of Ratings">
          <MatchHighlight toMatch={props.search}>
            {props.numRatings.toLocaleString()}
          </MatchHighlight>
        </Item>
        <Item label="# of Reviews">
          <MatchHighlight toMatch={props.search}>
            {props.numReviews.toLocaleString()}
          </MatchHighlight>
        </Item>
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
  search?: string;
}

const Item: FC<ItemProps> = ({ label, children, link, search }) => {
  const classes = useStyles();

  if (typeof children === "string" && search) {
    children = <MatchHighlight toMatch={search}>{children}</MatchHighlight>;
  }

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
