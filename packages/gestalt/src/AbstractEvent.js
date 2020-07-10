// @flow strict
export type AbstractEvent<
  T: SyntheticEvent<HTMLElement> | Event,
  U = {||}
> = ({|
  ...U,
  +event: T,
|}) => mixed;
