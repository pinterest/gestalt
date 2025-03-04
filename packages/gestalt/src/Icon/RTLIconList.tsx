import rtlIconListJson from 'gestalt-design-tokens/src/utils/rtlIconList.json';
import icons from '../icons/index';
import compactIconsVR from '../icons-vr-theme/compact/index';

type IconName = keyof typeof icons | keyof typeof compactIconsVR;

const swapOnRtlIconNames = Object.freeze(rtlIconListJson.swapOnRtlIconNames) as ReadonlyArray<
  IconName | undefined
>;
const flipOnRtlIconNames = Object.freeze(rtlIconListJson.flipOnRtlIconNames) as ReadonlyArray<
  IconName | undefined
>;

export { flipOnRtlIconNames, swapOnRtlIconNames };
