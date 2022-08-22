// @flow strict
import AvatarGroup from './general/AvatarGroup.svg';

const illustrations = Object.freeze({
  'avatar-group': AvatarGroup,
});

export type IllustrationTypes = $Keys<typeof illustrations>;

export default illustrations;
