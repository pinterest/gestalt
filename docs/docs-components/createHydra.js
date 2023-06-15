// @flow strict

/* As we further embrace React contexts over alternatives like Redux or props drilling, the "hydra" pattern becomes more useful.
Since all of our hydras tend to follow the same boilerplate setup, createHydra abstracts the setup.

`createHydra` is a generic function that returns a context provider and consumers
in the form of render props, hooks.

To create a hydra, you must specify a non-optional object type that represents the context value
and pass a prop name as a function parameter with the format `____Context` (e.g. requestContext).

Example usage:

export type TrackingParametersContextType = {| foo: number |};

const {
  Provider: TrackingParametersContextProvider,
  Consumer: TrackingParametersContextConsumer,
  useHook: useTrackingParametersContext,
} = createHydra<TrackingParametersContextType>();

export {
  TrackingParametersContextProvider,
  TrackingParametersContextConsumer,
  useTrackingParametersContext,
 };

Related articles:

https://americanexpress.io/hydra/
https://kentcdodds.com/blog/how-to-use-react-context-effectively */

import { type Context, createContext, type Node, useContext } from 'react';

export type Hydra<ContextType> = {|
  Provider: $PropertyType<Context<ContextType | void>, 'Provider'>,
  Consumer: ({| children: (ContextType) => Node |}) => Node,
  useHook: () => ContextType,
|};

function formatDisplayName(
  displayName: string,
  subjectDisplayName?: string,
): { [string]: string, ... } {
  let slicedDisplayName = displayName.slice(1);
  slicedDisplayName = slicedDisplayName.endsWith('Context')
    ? slicedDisplayName
    : `${slicedDisplayName}Context`;

  if (subjectDisplayName) {
    const hocDisplayName = `with${displayName[0].toUpperCase()}${slicedDisplayName}(${subjectDisplayName})`;
    return { hocDisplayName };
  }

  const propsDisplayName = `${displayName[0].toLowerCase()}${slicedDisplayName}`;
  const messageDisplayName = `${displayName[0].toUpperCase()}${slicedDisplayName}`;

  return { propsDisplayName, messageDisplayName };
}

export default function createHydra<ContextType>(
  displayName: string,
  defaultValue?: ContextType,
): Hydra<ContextType> {
  const context = createContext<ContextType | void>(defaultValue);
  const { messageDisplayName } = formatDisplayName(displayName);
  context.displayName = messageDisplayName;

  // Provider:
  const { Provider } = context;

  // Consumer: Render Prop
  const Consumer = ({ children }: { children: (ContextType) => Node, ... }) => {
    const contextValue = useContext(context);

    if (contextValue === undefined) {
      throw new Error(
        `${messageDisplayName}Consumer must be used within a ${messageDisplayName}Provider.`,
      );
    }
    return children(contextValue);
  };

  // Consumer: Hook
  function useHook(): ContextType {
    const contextValue = useContext(context);

    if (contextValue === undefined) {
      throw new Error(
        `use${messageDisplayName} must be used within a ${messageDisplayName}Provider.`,
      );
    }

    return contextValue;
  }

  Provider.displayName = `${messageDisplayName}Provider`;
  Consumer.displayName = `${messageDisplayName}Consumer`;

  return { Provider, Consumer, useHook };
}
