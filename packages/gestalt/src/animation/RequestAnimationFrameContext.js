// @flow strict

import { createContext, type Context, type Element, type Node } from 'react';

export const ANIMATION_STATE = {
  animatedOpening: 'animatedOpening',
  animatedClosing: 'animatedClosing',
  unmount: 'unmount',
};

export type RequestAnimationFrameStateType =
  | null
  | 'animatedOpening'
  | 'animatedClosing'
  | 'unmount';

type RequestAnimationFrameType = {||};

type UseRequestAnimationFrameType = {||};

type RequestAnimationFrameProviderProps = {|
  children: Node,
|};

const initialState = {};

const RequestAnimationFrameContext: Context<RequestAnimationFrameType> =
  createContext<RequestAnimationFrameType>(initialState);

export default function RequestAnimationFrameProvider({
  children,
}: RequestAnimationFrameProviderProps): Element<
  typeof RequestAnimationFrameContext.Provider,
> | null {
  return (
    <RequestAnimationFrameContext.Provider value={{}}>
      {children}
    </RequestAnimationFrameContext.Provider>
  );
}

export function useAnimation(): UseRequestAnimationFrameType {
  return {};
}
