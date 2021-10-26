/**
 * We use a common event payload across all components. Since it's different from standard events that people are used to from React, it's abstracted here to at least make it standard. If you have to learn something, you should only have to learn it once.
 *
 * Why is it non-standard? Gestalt components are controlled - meaning that the can contain state and when that changes it's reflected back to the parent. These state changes are propagated via. event handlers. Often this state doesn't represent what's in the DOM or we just want to abstract the DOM from the consumer. We felt this format struct a good balance between readability and predictability.
 */
export type AbstractEventHandler<
  T extends React.SyntheticEvent<HTMLElement> | Event,
  U = {}
> = (
  arg0: U & {
    readonly event: T;
  }
) => void;