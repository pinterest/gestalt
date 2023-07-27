// @flow strict

import { render } from '@testing-library/react';
import Button from './Button.js';
import ButtonGroup from './ButtonGroup.js';

describe('ButtonGroup', () => {
  test('Renders nothing when no children are passed in', () => {
    const { container } = render(<ButtonGroup />);
    expect(container).toMatchSnapshot();
  });

  test('Renders the child without container when 1 child is passed in', () => {
    const { container } = render(
      <ButtonGroup>
        <Button text="Button 1" />
      </ButtonGroup>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Renders container with children when multiple children are passed in', () => {
    const { container } = render(
      <ButtonGroup>
        <Button text="Button 1" />
        <Button text="Button 2" />
      </ButtonGroup>,
    );
    expect(container).toMatchSnapshot();
  });
});
