// React Imports
import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import Filters from "../../Components/Custom/Filters";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import CertificationPreview from "../../Components/Content/Certification/Preview";
import { generatePageTitle } from "../../Utils/funcs";
import { getTagsAsRelated } from "../../Utils/Content/tags";
import { useFilteredCertification } from "../../Utils/Content/certification";
import { getProvidersAsRelated } from "../../Utils/Content/providers";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getCertificationSearch,
  getCertificationSort,
  getCertificationTagFilter,
  setCertificationSearch,
  getCertificationProviderFilter,
  setCertificationSort,
  setCertificationTagFilter,
  setCertificationProviderFilter,
} from "../../Redux";
import {
  CertificationSort,
  CERTIFICATION_SORT,
} from "../../Redux/certification.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { makeStyles, Typography, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
  },
  certification: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    flexWrap: "wrap",
    width: `calc(100% + ${theme.spacing(4)}px)`,

    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  cert: {
    margin: theme.spacing(2),

    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(2, 0),
    },
  },
  divider: {
    margin: theme.spacing(1.5, 0, 1),
  },
  noFound: {
    marginTop: theme.spacing(1),
  },
}));

const Certification: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isDarkMode = theme.palette.type === "dark";

  const allTags = getTagsAsRelated("certification", isDarkMode);
  const allProviders = getProvidersAsRelated("certification");

  const search = useSelector(getCertificationSearch);
  const sort = useSelector(getCertificationSort);
  const tagFilter = useSelector(getCertificationTagFilter);
  const providerFilter = useSelector(getCertificationProviderFilter);

  useAnalytics("Certification");

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Certification")}</title>
      </Helmet>
      <div className={classes.container}>
        <Filters
          search={{
            defaultSearch: search,
            onSearchChange: (value) => dispatch(setCertificationSearch(value)),
          }}
          sort={{
            value: sort,
            values: CERTIFICATION_SORT,
            onChange: (value) =>
              dispatch(setCertificationSort(value as CertificationSort)),
          }}
          related={[
            {
              label: "Tags",
              values: allTags,
              value: tagFilter,
              onChange: (values) => dispatch(setCertificationTagFilter(values)),
            },
            {
              label: "Providers",
              values: allProviders,
              value: providerFilter,
              onChange: (values) =>
                dispatch(setCertificationProviderFilter(values)),
            },
          ]}
        />
        <Contents />
      </div>
    </>
  );
};

const Contents: FC = () => {
  const classes = useStyles();
  const search = useSelector(getCertificationSearch);
  const filteredCertification = useFilteredCertification();

  return (
    <>
      <HorizontalDivider className={classes.divider} />
      <Typography align="center" variant="h4">
        Certifications
      </Typography>
      {filteredCertification.length ? (
        <div className={classes.certification}>
          {filteredCertification.map((cert) => (
            <CertificationPreview
              key={cert.id}
              certification={cert}
              search={search}
              className={classes.cert}
            />
          ))}
        </div>
      ) : (
        <Typography variant="h5" className={classes.noFound}>
          No certification found
        </Typography>
      )}
    </>
  );
};

export default Certification;
