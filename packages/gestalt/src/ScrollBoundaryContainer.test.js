// @flow strict
import { create } from 'react-test-renderer';
import ScrollBoundaryContainer from './ScrollBoundaryContainer.js';
import Box from './Box.js';

describe('ScrollBoundaryContainer', () => {
  it('renders', () => {
    const tree = create(
      <ScrollBoundaryContainer>
        <Box />
      </ScrollBoundaryContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ScrollBoundaryContainer correctly sets height and overflow props', () => {
    const props = { height: 200, overflow: 'scroll' };

    const component = create(
      <ScrollBoundaryContainer {...props}>
        <Box />
      </ScrollBoundaryContainer>,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const instance = component.root;
    // eslint-disable-next-line testing-library/await-async-query -- Please fix the next time this file is touched!
    const element = instance.findByType('div');
    expect(element.props.className.includes('overflowScroll')).toBe(true);
    expect(element.props.style.height).toEqual(200);
  });
});
