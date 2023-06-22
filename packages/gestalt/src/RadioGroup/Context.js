// @flow strict
import { type Context, createContext, useContext } from 'react';

type RadioGroupContextType = {|
  parentName: string,
|};

const initialContextState = {
  parentName: '',
};

const context: Context<RadioGroupContextType> =
  createContext<RadioGroupContextType>(initialContextState);

const RadioGroupContextProvider = context.Provider;

function useRadioGroupContext(): RadioGroupContextType {
  const contextContent = useContext(context);
  return contextContent;
}

export { RadioGroupContextProvider, useRadioGroupContext };
