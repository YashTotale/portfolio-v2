// React Imports
import React, { FC, useState } from "react";
import { FallbackProps } from "react-error-boundary";
import { Helmet } from "react-helmet";
import { generatePageTitle } from "../Utils/funcs";

// Firebase Imports
import { auth } from "../Utils/Config/firebase";

const ClearButton: FC<FallbackProps> = (props) => {
  const [hover, setHover] = useState(false);

  const onClear = () => {
    localStorage.clear();
    auth.signOut();
    props.resetErrorBoundary();
    alert("Data Cleared. Please reload the page for changes to take effect.");
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        justifyContent: "center",
        border: hover
          ? "1px solid #d32f2f"
          : "1px solid rgba(211, 47, 47, 0.5)",
        borderRadius: "4px",
        backgroundColor: hover ? "rgba(211, 47, 47, 0.04)" : "transparent",
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        color: "#d32f2f",
        padding: "5px 15px",
        cursor: "pointer",
        lineHeight: "1.75",
        fontSize: "0.875rem",
        fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
        fontWeight: 500,
      }}
      onClick={onClear}
    >
      Clear Site Data
    </button>
  );
};

const ErrorPage: FC<FallbackProps> = (props) => {
  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Error")}</title>
      </Helmet>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0px 10px",
        }}
      >
        <img src="/logo192.png" alt="" width="50" />
        <h1
          style={{
            fontFamily: "Cabin, 'sans-serif'",
            textAlign: "center",
            margin: "15px 0px",
          }}
        >
          {props.error.name ?? "Error"}
        </h1>
        <h2
          style={{
            fontFamily: "Cabin, 'sans-serif'",
            textAlign: "center",
            marginBottom: "15px",
            marginTop: "0px",
          }}
        >
          {props.error.message ?? "An unexpected error occurred."}
        </h2>
        <ClearButton {...props} />
      </div>
    </>
  );
};

export default ErrorPage;
