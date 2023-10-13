// @flow strict
import { type Node } from 'react';

type Props = {
  height?: number,
  width?: number,
};

export default function GestaltLogo({ height, width }: Props): Node {
  return (
    <svg
      aria-label="Home"
      fill="none"
      height={height ?? 500}
      viewBox="0 0 500 500"
      width={width ?? 500}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M410 249.924H250L410 409.848V249.924Z" fill="#26C0B4" />
      <path
        clipRule="evenodd"
        d="M90 249.924C90 338.248 161.635 409.848 250 409.848V249.924H90Z"
        fill="#75BFFF"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M250.019 90C161.653 90 90.0186 161.601 90.0186 249.924H250.019V90Z"
        fill="#00857C"
        fillRule="evenodd"
      />
    </svg>
  );
}
