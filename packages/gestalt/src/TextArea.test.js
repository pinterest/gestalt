// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import TextArea from './TextArea.js';

describe('TextArea', () => {
  it('Renders an FormErrorMessage if an error message is passed in', () => {
    const component = create(
      <TextArea errorMessage="Error message" id="test" onChange={jest.fn()} />
    );
    expect(JSON.stringify(component.toJSON())).toContain('Error message');
  });

  it('Does not render an FormErrorMessage when errorMessage is null', () => {
    const component = create(<TextArea id="test" onChange={jest.fn()} />);
    expect(JSON.stringify(component.toJSON())).not.toContain('Error message');
  });

  it('TextArea normal', () => {
    const tree = create(
      <TextArea
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextArea with error', () => {
    const tree = create(
      <TextArea
        errorMessage="error message"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextArea with hasError', () => {
    const tree = create(
      <TextArea
        hasError
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextArea with rows', () => {
    const tree = create(
      <TextArea id="test" onChange={jest.fn()} rows={5} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
