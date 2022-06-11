/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { Backspace, Delay } from "./Typist";

export const sleep = (val: number | null): Promise<void> =>
  new Promise((resolve) =>
    val != null ? setTimeout(resolve, val) : resolve()
  );

export function gaussianRnd(mean: number, std: number): number {
  const times = 12;
  let sum = 0;
  for (let idx = 0; idx < times; idx++) {
    sum += Math.random();
  }
  sum -= times / 2;
  return Math.round(sum * std) + mean;
}

export function eachPromise(arr: any[], iterator: any, ...extraArgs: any) {
  const promiseReducer = (prev: any, current: any, idx: any) =>
    prev.then(() => iterator(current, idx, ...extraArgs));
  return Array.from(arr).reduce(promiseReducer, Promise.resolve());
}

export function exclude<T extends string>(
  obj: Record<T, any>,
  keys: T[]
): Record<T, any> {
  const res = {} as Record<T, any>;
  for (const key in obj) {
    if (keys.indexOf(key) === -1) {
      res[key] = obj[key];
    }
  }
  return res;
}

export function isElementType(
  element: any,
  component: any,
  name: string
): boolean {
  const elementType = element && element.type;
  if (!elementType) {
    return false;
  }

  return elementType === component || elementType.displayName === name;
}

export function isBackspaceElement(element: any): boolean {
  return isElementType(element, Backspace, "Backspace");
}

export function isDelayElement(element: any) {
  return isElementType(element, Delay, "Delay");
}

export function extractTextFromElement(element: any) {
  const stack = element ? [element] : [];
  const lines = [];

  while (stack.length > 0) {
    const current = stack.pop();
    if (React.isValidElement(current)) {
      if (isBackspaceElement(current) || isDelayElement(current)) {
        // If it is a `Backspace` or `Delay` element, we want to keep it in our
        // `textLines` state. These will serve as markers when updating the
        // state of the text
        lines.unshift(current);
      } else {
        React.Children.forEach((current.props as any).children, (child) => {
          stack.push(child);
        });
      }
    } else if (Array.isArray(current)) {
      for (const el of current) {
        stack.push(el);
      }
    } else {
      lines.unshift(current);
    }
  }

  return lines;
}

export function cloneElement(element: any, children: any) {
  const tag = element.type;
  const props = exclude(element.props, ["children"]);
  const getMilliseconds = new Date().getUTCMilliseconds();
  const randomStamp = getMilliseconds + Math.random() + Math.random();
  // eslint-disable-next-line
  (props as any).key = `Typist-element-${tag}-${randomStamp}`;
  return React.createElement(tag, props, ...children);
}

function cloneElementWithSpecifiedTextAtIndex(
  element: any,
  textLines: any,
  textIdx: any
): any {
  if (textIdx >= textLines.length) {
    return [null, textIdx];
  }

  let idx = textIdx;
  const recurse = (el: any) => {
    const [child, advIdx] = cloneElementWithSpecifiedTextAtIndex(
      el,
      textLines,
      idx
    );
    idx = advIdx;
    return child;
  };

  const isNonTypistElement =
    React.isValidElement(element) &&
    !(isBackspaceElement(element) || isDelayElement(element));

  if (isNonTypistElement) {
    const clonedChildren =
      React.Children.map(element.props.children, recurse) || [];
    return [cloneElement(element, clonedChildren), idx];
  }

  if (Array.isArray(element)) {
    const children = element.map(recurse);
    return [children, idx];
  }

  // Anything that isn't a React element or an Array is interpreted as text
  return [textLines[idx], idx + 1];
}

export function cloneElementWithSpecifiedText({ element, textLines }: any) {
  if (!element) {
    return undefined;
  }

  return cloneElementWithSpecifiedTextAtIndex(element, textLines, 0)[0];
}
