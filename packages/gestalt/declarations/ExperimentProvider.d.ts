/// <reference types="react" />
declare type Experiment = {
    anyEnabled: boolean;
    group: string;
};
/**
 * *ALPHA - DO NOT USE YET - MAY HAVE BREAKING CHANGES IN THE NEAR FUTURE*
 */
declare const ExperimentProvider: import("react").Provider<Record<string, Experiment>>;
export default ExperimentProvider;
export declare function useExperimentContext(experimentName: string): Experiment;
