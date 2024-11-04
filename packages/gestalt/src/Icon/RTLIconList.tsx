import icons from '../icons/index';
import compactIconsVR from '../icons-vr-theme/compact/index';

type IconName = keyof typeof icons | keyof typeof compactIconsVR;

const swapOnRtlIconNames: ReadonlyArray<IconName> = Object.freeze(['list-numbered']);

const flipOnRtlIconNames: ReadonlyArray<IconName | undefined> = Object.freeze([
  'ads-stats',
  'ads-overview',
  'arrow-back',
  'arrow-circle-forward',
  'arrow-end',
  'arrow-forward',
  'arrow-start',
  'arrow-up-right',
  'compose',
  'chevron-left-circle',
  'chevron-right-circle',
  'directional-arrow-left',
  'directional-arrow-right',
  'flip-vertical',
  'hand-pointing',
  'link',
  'mute',
  'reorder-images',
  'send',
  'sound',
  'speech',
  'speech-ellipsis',
  'switch-account',
  'text-size',
  'visit',
]);

export { flipOnRtlIconNames, swapOnRtlIconNames };
