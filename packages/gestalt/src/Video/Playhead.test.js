// @flow strict
import { create } from 'react-test-renderer';
import VideoPlayhead from './Playhead';

test('VideoPlayhead', () => {
  const tree = create(
    <VideoPlayhead
      accessibilityProgressBarLabel="Progress bar"
      currentTime={50}
      duration={100}
      onPlayheadDown={() => {}}
      onPlayheadUp={() => {}}
      seek={() => {}}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
