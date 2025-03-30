import useInExperiment from '../useInExperiment';

export default function useTapScaleAnimation() {
  const isInVR01Experiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const isInCA1Experiment = useInExperiment({
    webExperimentName: 'web_gestalt_calico01',
    mwebExperimentName: 'web_gestalt_calico01',
  });

  return {
    MAIN: isInVR01Experiment ?? isInCA1Experiment,
    VR01: isInVR01Experiment,
    CA01: isInCA1Experiment,
  };
}
