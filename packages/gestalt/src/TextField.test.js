// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import TextField from './TextField.js';

describe('TextField', () => {
  it('Renders an FormErrorMessage if an error message is passed in', () => {
    const component = create(
      <TextField errorMessage="Error message" id="test" onChange={jest.fn()} />
    );
    expect(JSON.stringify(component.toJSON())).toContain('Error message');
  });

  it('Does not render an FormErrorMessage when errorMessage is null', () => {
    const component = create(<TextField id="test" onChange={jest.fn()} />);
    expect(JSON.stringify(component.toJSON())).not.toContain('Error message');
  });

  it('TextField normal', () => {
    const tree = create(
      <TextField
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with error', () => {
    const tree = create(
      <TextField
        errorMessage="error message"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with hasError', () => {
    const tree = create(
      <TextField
        hasError
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with name', () => {
    const tree = create(
      <TextField
        name="email"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with autocomplete', () => {
    const tree = create(
      <TextField
        name="email"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
