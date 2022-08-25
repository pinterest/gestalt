// @flow strict
import AvatarGroup from './general/AvatarGroup.svg';
import Button from './general/Button.svg';
import Icon from './general/Icon.svg';
import Dropdown from './general/Dropdown.svg';
import TextArea from './general/TextArea.svg';
import SelectList from './general/SelectList.svg';

const illustrations = Object.freeze({
  'avatar-group': AvatarGroup,
  'button': Button,
  'dropdown': Dropdown,
  'icon': Icon,
  'text-area': TextArea,
  'select-list': SelectList,
});

export type IllustrationTypes = $Keys<typeof illustrations>;

export default illustrations;
