// @flow strict
import AvatarGroup from './general/AvatarGroup.svg';
import Button from './general/Button.svg';
import Icon from './general/Icon.svg';
import Dropdown from './general/Dropdown.svg';
import Popover from './building-blocks/Popover.svg';
import SegmentedControl from './general/SegmentedControl.svg';
import OverlayPanel from './general/OverlayPanel.svg';
import Tooltip from './general/Tooltip.svg';

const illustrations = Object.freeze({
  'avatar-group': AvatarGroup,
  'button': Button,
  'dropdown': Dropdown,
  'icon': Icon,
  'popover': Popover,
  'segmented-control': SegmentedControl,
  'overlaypanel': OverlayPanel,
  'tooltip': Tooltip,
});

export type IllustrationTypes = $Keys<typeof illustrations>;

export default illustrations;
