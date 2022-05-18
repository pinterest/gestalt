// @flow strict
import { createContext, useContext, type Context } from 'react';

type RadioGroupContextType = {|
  parentName: string,
  hasError?: boolean,
|};

const initialContextState = {
  parentName: '',
  hasError: false,
};

const context: Context<RadioGroupContextType> =
  createContext<RadioGroupContextType>(initialContextState);

const RadioGroupContextProvider = context.Provider;

function useRadioGroupContext(): RadioGroupContextType {
  const { parentName } = useContext(context);
  return { parentName };
}

export { RadioGroupContextProvider, useRadioGroupContext };
