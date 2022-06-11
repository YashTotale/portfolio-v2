// React Imports
import React, { FC, useState, useEffect } from "react";
import { Paths } from "../../NavController";
import StyledLink from "../../../Atomic/StyledLink";
import Typist, { Backspace, Delay } from "./Typist";

const Typer: FC = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [count]);

  return count ? (
    <Typist onTypingDone={() => setCount(0)}>
      <StyledLink to={Paths.Experience}>experience</StyledLink>
      <Backspace count={"experience".length} delay={2000} />

      <Delay ms={500} />
      <StyledLink to={Paths.Education}>education</StyledLink>
      <Backspace count={"education".length} delay={2000} />

      <Delay ms={500} />
      <StyledLink to={Paths.Projects}>projects</StyledLink>
      <Backspace count={"projects".length} delay={2000} />

      <Delay ms={500} />
      <StyledLink to={Paths.Articles}>articles</StyledLink>
      <Backspace count={"articles".length} delay={2000} />

      <Delay ms={500} />
      <StyledLink to={Paths.Certifications}>certifications</StyledLink>
      <Backspace count={"certifications".length} delay={2000} />

      <Delay ms={500} />
      <StyledLink to={Paths.Books}>books</StyledLink>
      <Backspace count={"books".length} delay={2000} />
    </Typist>
  ) : (
    <></>
  );
};

export default Typer;
