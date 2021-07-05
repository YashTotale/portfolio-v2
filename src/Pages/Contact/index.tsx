// React Imports
import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Control,
  Controller,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { useClosableSnackbar } from "../../Hooks";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";

// Firebase Imports
import { useFirestore } from "react-redux-firebase";

// Material UI Imports
import {
  Button,
  capitalize,
  CircularProgress,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(0.5),
  },
  container: {
    width: "100%",
    marginTop: theme.spacing(1.5),
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
  submit: {
    margin: theme.spacing(1.5, 0),
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
  const firestore = useFirestore();
  const { enqueueSnackbar } = useClosableSnackbar();

  const { formState, control, handleSubmit, reset } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);

  const isError = !!Object.keys(formState.errors).length;

  const onSubmit: SubmitHandler<Inputs> = async (inputs, e) => {
    inputs.bugs = inputs.bugs || undefined;

    // Remove undefined values
    const data = Object.fromEntries(
      Object.entries(inputs).filter(([_, v]) => v !== undefined)
    );

    try {
      setLoading(true);
      await firestore.collection("contact").doc().set(data);
      enqueueSnackbar("Message received!", {
        variant: "success",
      });
      reset({
        message: "",
        bugs: "",
      });
    } catch (e) {
      const message = typeof e === "string" ? e : e.message;
      enqueueSnackbar(message || "An error occurred. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Contact")}</title>
      </Helmet>
      <HorizontalDivider />
      <Typography align="center" variant="h4" className={classes.title}>
        Let&apos;s get in touch!
      </Typography>
      <Paper className={classes.container}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <InputField name="name" type="text" control={control} />
          <InputField name="email" type="email" control={control} />
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
              />
            )}
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
}

const InputField: FC<InputFieldProps> = (props) => {
  const classes = useStyles();
  const {
    field: { ref, ...inputProps },
    formState,
  } = useController({
    name: props.name,
    control: props.control,
    rules: { required: props.required ?? true },
    defaultValue: "",
  });

  const textareaProps = { multiline: true, rows: 2, rowsMax: 20 };
  const error = formState.errors[props.name];

  const required = props.required ?? "This field is required";
  const label =
    props.label ?? `${capitalize(props.name)}${required ? "*" : ""}`;

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
      fullWidth
    />
  );
};

export default Contact;
