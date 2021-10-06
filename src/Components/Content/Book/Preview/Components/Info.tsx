// React Imports
import React, { FC } from "react";
import Genres from "./Genres";
import { useClosableSnackbar } from "../../../../../Hooks";
import HorizontalDivider from "../../../../Atomic/Divider/Horizontal";
import MatchHighlight from "../../../../Atomic/MatchHighlight";
import DynamicUnderline from "../../../../Atomic/DynamicUnderline";
import { Book } from "../../../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { setBooksSort, getBooksSort } from "../../../../../Redux";
import { BookSort } from "../../../../../Redux/books.slice";
import { useAppDispatch } from "../../../../../Store";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";
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
  rating: {
    marginRight: theme.spacing(0.25),
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
            <Item label="My Rating" sort="Highest Rated by Me">
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
            <Item
              label={`Date${props.datesRead.length > 1 ? "s" : ""} Read`}
              sort="Recently Read"
            >
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
          <Item label="Pages" search={props.search} sort="Most Pages">
            {props.pages.toLocaleString()}
          </Item>
        )}
        {props.yearPublished && (
          <Item
            label="Year Published"
            search={props.search}
            sort="Recently Published"
          >
            {props.yearPublished}
          </Item>
        )}
        <Genres {...props} />
      </Section>
      <Section last>
        <Item label="Avg Rating" sort="Highest Average Rating">
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
        <Item label="# of Ratings" sort="Most Ratings">
          <MatchHighlight toMatch={props.search}>
            {props.numRatings.toLocaleString()}
          </MatchHighlight>
        </Item>
        <Item label="# of Reviews" sort="Most Reviews">
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

const useItemStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    margin: theme.spacing(0.5, 0),
    width: "100%",
  },
  itemLabelContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(0.6),
  },
  itemLabel: {
    display: "inline-block",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    "&&:after": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: "-1px",
      width: "100%",
      height: "0.1em",
      backgroundColor: theme.palette.secondary.main,
      transition: "transform 300ms",
      opacity: 1,
      transform: "translate3d(-100%, 0, 0)",
    },
    "&:hover::after, &:focus::after": {
      transform: "translate3d(0, 0, 0)",
    },
  },
  itemValue: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

interface ItemProps {
  label: string;
  search?: string;
  sort?: BookSort;
}

export const Item: FC<ItemProps> = ({ label, children, search, sort }) => {
  const dispatch = useAppDispatch();
  const classes = useItemStyles();
  const { enqueueSnackbar } = useClosableSnackbar();

  const booksSort = useSelector(getBooksSort);
  const alreadySorted = booksSort === sort;

  if (typeof children === "string" && search) {
    children = <MatchHighlight toMatch={search}>{children}</MatchHighlight>;
  }

  const labelEl =
    sort && !alreadySorted ? (
      <DynamicUnderline
        tooltipLabel={`Sort by '${sort}'`}
        label={label}
        onClick={() => {
          dispatch(setBooksSort(sort));
          enqueueSnackbar(`Sorted Books by '${sort}''`, {
            variant: "success",
          });
        }}
      />
    ) : (
      `${label}:`
    );

  return (
    <Typography className={classes.item}>
      <strong className={classes.itemLabelContainer}>{labelEl}</strong>{" "}
      <span className={classes.itemValue}>{children ?? "N/A"}</span>
    </Typography>
  );
};

export default Info;
