import {createRef} from 'react';
import { render } from '@testing-library/react';
import RadioButton from './RadioButton';

const mockOnChange = jest.fn<[{
  checked: boolean,
  event: React.ChangeEvent<HTMLInputElement>
}], undefined>();

describe('RadioButton', () => {
  it('forwards a ref to <Box ref={ref}><input/></Box>', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <RadioButton ref={ref} checked id="testRadioButton" onChange={mockOnChange} value="test" />,
    );
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.checked).toEqual(true);
  });
});
