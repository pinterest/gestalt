// @flow strict
import { useExperimentContext } from '../contexts/ExperimentProvider.js';
import { useDeviceType } from '../contexts/DeviceTypeProvider.js';

export default function useInExperiment({
  webExperimentName,
  mwebExperimentName,
}: {|
  webExperimentName: string,
  mwebExperimentName: string,
|}): boolean {
  const deviceType = useDeviceType();

  const { anyEnabled: inWebExp } = useExperimentContext(webExperimentName);
  const { anyEnabled: inMwebExp } = useExperimentContext(mwebExperimentName);

  let inExperiment = false;

  if (deviceType) {
    if (deviceType === 'desktop') {
      inExperiment = inWebExp;
    } else {
      inExperiment = inMwebExp;
    }
  }
  return inExperiment;
}
