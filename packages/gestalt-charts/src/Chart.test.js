// @flow strict-local
import { create } from 'react-test-renderer';
import { Text } from 'gestalt';

describe('Chart', () => {
  it('renders', () => {
    const tree = create(<Text>123</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
