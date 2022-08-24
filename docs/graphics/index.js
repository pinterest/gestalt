// @flow strict
import AvatarGroup from './general/AvatarGroup.svg';
import IconButton from './general/IconButton.svg';
import Button from './general/Button.svg';

const illustrations = Object.freeze({
  'avatar-group': AvatarGroup,
  'icon-button': IconButton,
  'button': Button,
});

export type IllustrationTypes = $Keys<typeof illustrations>;

export default illustrations;
