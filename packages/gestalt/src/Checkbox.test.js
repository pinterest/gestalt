// @flow strict
import { create } from 'react-test-renderer';
import Checkbox from './Checkbox.js';
import Box from './Box.js';
import Image from './Image.js';

test('Checkbox', () => {
  const tree = create(<Checkbox id="id" label="Name" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox without label', () => {
  const tree = create(<Checkbox id="id" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox checked', () => {
  const tree = create(<Checkbox id="id" label="Name" onChange={() => {}} checked />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox indeterminate', () => {
  const tree = create(<Checkbox id="id" label="Name" onChange={() => {}} indeterminate />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox small', () => {
  const tree = create(<Checkbox size="sm" id="id" label="Name" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox disabled', () => {
  const tree = create(
    <Checkbox disabled size="sm" id="id" label="Name" onChange={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox disabled & checked', () => {
  const tree = create(
    <Checkbox disabled checked size="sm" id="id" label="Name" onChange={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox with error', () => {
  const tree = create(
    <Checkbox errorMessage="Error message" size="sm" id="id" label="Name" onChange={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox with helperText', () => {
  const tree = create(
    <Checkbox helperText="Additional Info" size="sm" id="id" label="Name" onChange={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox with an image', () => {
  const tree = create(
    <Checkbox
      image={
        <Box>
          <Image
            alt=""
            src="https://i.ibb.co/FY2MKr5/stock6.jpg"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>
      }
      size="sm"
      id="id"
      label="Name"
      onChange={() => {}}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
