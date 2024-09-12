import { Context, createContext, useContext } from 'react';

type Experiment = {
  anyEnabled: boolean;
  group: string;
};

type ExperimentContextType = {
  [experimentName: string]: Experiment;
};

const ExperimentContext: Context<ExperimentContextType> = createContext<ExperimentContextType>({});

/**
 * *ALPHA - DO NOT USE YET - MAY HAVE BREAKING CHANGES IN THE NEAR FUTURE*
 */
const ExperimentProvider = ExperimentContext.Provider;
export default ExperimentProvider;

export function useExperimentContext(experimentName: string): Experiment {
  const experiments = useContext(ExperimentContext) ?? {};
  return (
    experiments[experimentName] ?? {
      anyEnabled: false,
      group: '',
    }
  );
}
