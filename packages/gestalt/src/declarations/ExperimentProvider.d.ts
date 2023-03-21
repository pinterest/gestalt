/// <reference types="react" />
type Experiment = {
  anyEnabled: boolean;
  group: string;
};
type ExperimentContextType = Record<string, Experiment>;
/**
 * *ALPHA - DO NOT USE YET - MAY HAVE BREAKING CHANGES IN THE NEAR FUTURE*
 */
declare const ExperimentProvider: import('react').Provider<ExperimentContextType>;
export default ExperimentProvider;
export declare function useExperimentContext(experimentName: string): Experiment;
