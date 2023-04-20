// @flow strict
import { create } from 'react-test-renderer';
import Text from '../Text.js';
import InternalPopover from './InternalPopover.js';

describe('InternalPopover', () => {
  it('renders correctly', () => {
    const element = document.createElement('div');
    const component = create(
      <InternalPopover accessibilityLabel="text" anchor={element} onDismiss={jest.fn()}>
        <Text>text</Text>
      </InternalPopover>,
      {
        createNodeMock: () => true,
      },
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does not render when the anchor is null', () => {
    const tree = create(
      <InternalPopover accessibilityLabel="text" anchor={null} onDismiss={() => {}}>
        <Text>text</Text>
      </InternalPopover>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
