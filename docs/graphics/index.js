// @flow strict
import AvatarGroup from './general/AvatarGroup.svg';
import Button from './general/Button.svg';
import Icon from './general/Icon.svg';
import Dropdown from './general/Dropdown.svg';
import SegmentedControl from './general/SegmentedControl.svg';

const illustrations = Object.freeze({
  'avatar-group': AvatarGroup,
  'button': Button,
  'dropdown': Dropdown,
  'icon': Icon,
  'segmented-control': SegmentedControl,
});

export type IllustrationTypes = $Keys<typeof illustrations>;

export default illustrations;
