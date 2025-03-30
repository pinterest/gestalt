import { useDangerouslyInGestaltExperiment } from 'gestalt';

export default function useExperimentalTheme() {
  const isInVR01Experiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const isInCA1Experiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  return {
    MAIN: isInVR01Experiment ?? isInCA1Experiment,
    VR01: isInVR01Experiment,
    CA01: isInCA1Experiment,
  };
}
