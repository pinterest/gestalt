// @flow strict
import Video from './Video.js';

const Valid = (
  <Video
    aspectRatio={1}
    captions="https://media.w3.org/2010/05/sintel/captions.vtt"
    disableRemotePlayback
    onPlay={() => {}}
    onPlayError={() => {}}
    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
  />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <Video aspectRatio={1} />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Video nonexisting={33} />;
