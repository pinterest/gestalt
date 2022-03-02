// @flow strict
import { create } from 'react-test-renderer';
import VideoPlayhead from './VideoPlayhead.js';

test('VideoPlayhead', () => {
  const tree = create(
    <VideoPlayhead
      accessibilityProgressBarLabel="Progress bar"
      currentTime={50}
      duration={100}
      seek={() => {}}
      onPlayheadDown={() => {}}
      onPlayheadUp={() => {}}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
