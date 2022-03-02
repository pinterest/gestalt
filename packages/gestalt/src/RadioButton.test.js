// @flow strict
import { create } from 'react-test-renderer';
import RadioButton from './RadioButton.js';
import Box from './Box.js';
import Image from './Image.js';

test('RadioButton', () => {
  const tree = create(<RadioButton id="id" label="Name" onChange={() => {}} value="" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton without label', () => {
  const tree = create(<RadioButton id="id" onChange={() => {}} value="" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton checked', () => {
  const tree = create(<RadioButton checked id="id" onChange={() => {}} value="" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton small', () => {
  const tree = create(
    <RadioButton size="sm" id="id" label="Name" onChange={() => {}} value="" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton disabled', () => {
  const tree = create(
    <RadioButton disabled id="id" label="Name" onChange={() => {}} value="" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton disabled small', () => {
  const tree = create(
    <RadioButton size="sm" disabled id="id" label="Name" onChange={() => {}} value="" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton with subtext', () => {
  const tree = create(
    <RadioButton size="sm" id="id" label="Name" subtext="More Info" onChange={() => {}} value="" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton with image', () => {
  const tree = create(
    <RadioButton
      size="sm"
      id="id"
      label="Name"
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
      onChange={() => {}}
      value=""
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
