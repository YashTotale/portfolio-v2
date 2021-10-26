// React Imports
import React, { FC, useState, useEffect, useRef, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Control,
  Controller,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import ReCAPTCHA, { ReCAPTCHAProps } from "react-google-recaptcha";
import { useAnalytics, useClosableSnackbar } from "../../Hooks";
import { useTitle } from "../../Context/HeadContext";
import StyledLink from "../../Components/Atomic/StyledLink";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle, generateSearch } from "../../Utils/funcs";

// Firebase Imports
import { useUserDoc } from "../../Controllers/user.controller";
import { sendContactEmail } from "../../Controllers/contact.controller";

// Material UI Imports
import {
  Button,
  capitalize,
  CircularProgress,
  Paper,
  Rating,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { InfoOutlined } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1.5, 0, 1),
  },
  container: {
    width: "100%",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    margin: theme.spacing(1.5, 0),
  },
  ratingText: {
    margin: theme.spacing(1.5, 0, 0.5),
  },
  rating: {
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0),
    minWidth: 100,
    minHeight: "2.5rem",
  },
  spinner: {
    color: theme.palette.primary.contrastText,
  },
}));

interface Inputs {
  name: string;
  email: string;
  message: string;
  bugs?: string;
  rating?: number | null;
}

const Contact: FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useClosableSnackbar();
  const userDoc = useUserDoc();
  const location = useLocation();
  const title = useTitle();

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const { formState, control, handleSubmit, reset, getValues, setValue } =
    useForm<Inputs>({
      defaultValues: {
        name: userDoc?.name,
        email: userDoc?.email,
      },
    });
  const [loading, setLoading] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [recaptcha, setRecaptcha] = useState<string | null>(null);

  useEffect(() => {
    const values = getValues();
    if (!values.name && userDoc?.name) setValue("name", userDoc.name);
  }, [userDoc?.name, getValues, setValue]);

  useEffect(() => {
    const values = getValues();
    if (!values.email && userDoc?.email) setValue("email", userDoc.email);
  }, [userDoc?.email, getValues, setValue]);

  useAnalytics("Contact");

  const isError = !!Object.keys(formState.errors).length || recaptcha === null;

  const onRecaptchaError = () => {
    enqueueSnackbar("An error occurred with ReCAPTCHA. Please try again.", {
      variant: "error",
    });
    setRecaptcha(null);
  };

  const onRecaptchaChange: ReCAPTCHAProps["onChange"] = (token) => {
    if (token === null) {
      enqueueSnackbar("ReCAPTCHA expired.", {
        variant: "error",
      });
      setRecaptcha(null);
    } else {
      setRecaptcha(token);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (inputs, e) => {
    inputs.bugs = inputs.bugs || undefined;

    // Remove undefined values
    const data = Object.fromEntries(
      Object.entries(inputs).filter(([_, v]) => v !== undefined)
    );
    data.timestamp = new Date();
    data["g-recaptcha-response"] = recaptcha;

    try {
      setLoading(true);

      if (data["g-recaptcha-response"] === null) {
        throw new Error("Please complete the ReCAPTCHA challenge.");
      }

      await sendContactEmail(data);

      enqueueSnackbar("Message received! Check your inbox :)", {
        variant: "success",
      });
      reset({
        message: "",
        bugs: "",
      });
      recaptchaRef.current?.reset();
    } catch (e: any) {
      const message: string =
        (typeof e === "string" ? e : e.message) ||
        "An error occurred. Please try again.";

      enqueueSnackbar(message, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setRecaptcha(null);
  }, [theme.palette.mode, isSizeXS]);

  const infoAdornment = (
    <Tooltip
      title={
        <>
          {userDoc ? "Pre-filled by your" : "Can be pre-filled by"}{" "}
          <StyledLink
            to={{
              pathname: "/settings",
              hash: "#profile",
              search: generateSearch(
                {
                  from_path: location.pathname,
                  from_type: "contact_field_info",
                },
                title
              ),
            }}
          >
            {userDoc ? "profile information" : "signing in"}
          </StyledLink>
        </>
      }
    >
      <InfoOutlined />
    </Tooltip>
  );

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Contact")}</title>
      </Helmet>
      <HorizontalDivider className={classes.divider} />
      <Typography align="center" variant="h4">
        Let&apos;s get in touch!
      </Typography>
      <Paper className={classes.container}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="name"
            type="text"
            control={control}
            endAdornment={infoAdornment}
          />
          <InputField
            name="email"
            type="email"
            control={control}
            endAdornment={infoAdornment}
          />
          <InputField name="message" type="text" control={control} textarea />
          <InputField
            name="bugs"
            type="text"
            label="Any Bugs?"
            control={control}
            textarea
            required={false}
          />
          <Typography variant="body1" className={classes.ratingText}>
            Rate the site?
          </Typography>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Rating
                name={field.name}
                value={field.value ?? 0}
                onChange={(e, value) => {
                  field.onChange(value);
                }}
                onBlur={field.onBlur}
                ref={field.ref}
                className={classes.rating}
              />
            )}
          />
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY ?? ""}
            onChange={onRecaptchaChange}
            onErrored={onRecaptchaError}
            ref={recaptchaRef}
            theme={theme.palette.mode}
            size={isSizeXS ? "compact" : "normal"}
            key={`${theme.palette.mode}${isSizeXS}`}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isError}
            style={
              isError
                ? {
                    pointerEvents: "auto",
                    cursor: "not-allowed",
                  }
                : undefined
            }
            className={classes.submit}
          >
            {loading ? (
              <CircularProgress size="1.75rem" className={classes.spinner} />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Paper>
    </>
  );
};

interface InputFieldProps {
  name: keyof Inputs;
  type: string;
  control: Control<Inputs>;
  label?: string;
  required?: boolean;
  textarea?: boolean;
  endAdornment?: ReactNode;
}

const InputField: FC<InputFieldProps> = (props) => {
  const classes = useStyles();
  const {
    field: { ref, ...inputProps },
    formState,
  } = useController({
    name: props.name,
    control: props.control,
    rules: { required: props.required ?? "This field is required" },
    defaultValue: "",
  });

  const textareaProps = { multiline: true, rows: 2, rowsMax: 20 };
  const error = formState.errors[props.name];

  const label =
    props.label ??
    `${capitalize(props.name)}${props.required !== false ? "*" : ""}`;

  return (
    <TextField
      {...inputProps}
      {...(props.textarea ? textareaProps : {})}
      inputRef={ref}
      variant="outlined"
      label={label}
      type={props.type}
      error={!!error}
      helperText={error?.message}
      className={classes.input}
      InputProps={{
        endAdornment: props.endAdornment,
      }}
      fullWidth
    />
  );
};

export default Contact;
