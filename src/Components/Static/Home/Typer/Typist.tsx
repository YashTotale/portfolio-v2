/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component, FC } from "react";
import * as utils from "./utils";
import { Box } from "@mui/material";

const ACTION_CHARS = ["🔙", "⏰"];

interface TypistProps {
  children?: React.ReactNode;
  onTypingDone?: () => void;
}

interface TypistState {
  textLines: any[];
  isDone: boolean;
}

export default class Typist extends Component<TypistProps> {
  startDelay = 500;
  avgTypingDelay = 80;
  stdTypingDelay = 10;
  delayGenerator = () =>
    utils.gaussianRnd(this.avgTypingDelay, this.stdTypingDelay);

  mounted: boolean;
  linesToType: any[];
  introducedDelay: null;
  state: TypistState;

  constructor(props: TypistProps) {
    super(props);
    this.mounted = false;
    this.linesToType = [];
    this.introducedDelay = null;
    this.state = {
      textLines: [],
      isDone: false,
    };

    if (props.children) {
      this.linesToType = utils.extractTextFromElement(props.children);
    }
  }

  componentDidMount(): void {
    this.mounted = true;
    const { children } = this.props;
    if (children) {
      if (this.startDelay && typeof window !== "undefined") {
        setTimeout(this.typeAllLines.bind(this), this.startDelay);
      } else {
        this.typeAllLines();
      }
    } else {
      this.onTypingDone();
    }
  }

  shouldComponentUpdate(
    nextProps: TypistProps,
    nextState: TypistState
  ): boolean {
    if (nextState.textLines.length !== this.state.textLines.length) {
      return true;
    }
    for (let idx = 0; idx < nextState.textLines.length; idx++) {
      const line = this.state.textLines[idx];
      const nextLine = nextState.textLines[idx];
      if (line !== nextLine) {
        return true;
      }
    }
    return this.state.isDone !== nextState.isDone;
  }

  componentWillUnmount(): void {
    this.mounted = false;
  }

  onTypingDone = (): void => {
    if (!this.mounted) {
      return;
    }
    this.setState({ isDone: true });
    this.props.onTypingDone?.();
  };

  typeAllLines(lines = this.linesToType): any {
    return utils
      .eachPromise(lines, this.typeLine)
      .then(() => this.onTypingDone());
  }

  typeLine = (line: any, lineIdx: number): any => {
    if (!this.mounted) {
      return Promise.resolve();
    }

    let decoratedLine = line;

    if (utils.isBackspaceElement(line)) {
      if (line.props.delay > 0) {
        this.introducedDelay = line.props.delay;
      }
      decoratedLine = String("🔙").repeat(line.props.count);
    } else if (utils.isDelayElement(line)) {
      this.introducedDelay = line.props.ms;
      decoratedLine = "⏰";
    }

    return new Promise((resolve, reject) => {
      this.setState({ textLines: this.state.textLines.concat([""]) }, () => {
        utils
          .eachPromise(
            decoratedLine,
            this.typeCharacter,
            decoratedLine,
            lineIdx
          )
          .then(resolve)
          .catch(reject);
      });
    });
  };

  typeCharacter = (
    character: string,
    charIdx: number,
    line: any,
    lineIdx: number
  ) => {
    if (!this.mounted) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const textLines = this.state.textLines.slice();

      utils.sleep(this.introducedDelay).then(() => {
        this.introducedDelay = null;

        const isBackspace = character === "🔙";
        const isDelay = character === "⏰";
        if (isDelay) {
          resolve(undefined);
          return;
        }

        if (isBackspace && lineIdx > 0) {
          let prevLineIdx = lineIdx - 1;
          let prevLine = textLines[prevLineIdx];

          for (let idx = prevLineIdx; idx >= 0; idx--) {
            if (prevLine.length > 0 && !ACTION_CHARS.includes(prevLine[0])) {
              break;
            }
            prevLineIdx = idx;
            prevLine = textLines[prevLineIdx];
          }

          textLines[prevLineIdx] = prevLine.substr(0, prevLine.length - 1);
        } else {
          textLines[lineIdx] += character;
        }

        if (!this.mounted) {
          resolve(undefined);
          return;
        }

        this.setState({ textLines }, () => {
          const delay = this.delayGenerator();
          setTimeout(resolve, delay);
        });
      });
    });
  };

  render() {
    const innerTree = utils.cloneElementWithSpecifiedText({
      element: this.props.children,
      textLines: this.state.textLines,
    });

    return (
      <Box sx={{ display: "inline-block" }}>
        {innerTree}
        <Cursor />
      </Box>
    );
  }
}

interface BackspaceProps {
  count: number;
  delay: number;
}

export const Backspace: FC<BackspaceProps> = () => {
  return <noscript />;
};

interface DelayProps {
  ms: number;
}

export const Delay: FC<DelayProps> = () => {
  return <noscript />;
};

const Cursor: FC = () => {
  return (
    <Box
      component="span"
      sx={{
        "@keyframes blink": {
          "0%": { opacity: 1 },
          "50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        opacity: 1,
        animation: "blink 1s linear infinite",
      }}
    >
      |
    </Box>
  );
};
