// @flow strict
import AvatarGroup from './general/AvatarGroup.svg';
import Button from './general/Button.svg';
import Icon from './general/Icon.svg';
import Dropdown from './general/Dropdown.svg';
import Popover from './general/Popover.svg';
import SegmentedControl from './general/SegmentedControl.svg';
import Sheet from './general/Sheet.svg';
import Tooltip from './general/Tooltip.svg';

const illustrations = Object.freeze({
  'avatar-group': AvatarGroup,
  'button': Button,
  'dropdown': Dropdown,
  'icon': Icon,
  'popover': Popover,
  'segmented-control': SegmentedControl,
  'sheet': Sheet,
  'tooltip': Tooltip,
});

export type IllustrationTypes = $Keys<typeof illustrations>;

export default illustrations;
