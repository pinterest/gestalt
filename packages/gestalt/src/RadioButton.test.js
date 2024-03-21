// @flow strict
import { create } from 'react-test-renderer';
import Box from './Box';
import Image from './Image';
import RadioButton from './RadioButton';

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
    <RadioButton id="id" label="Name" onChange={() => {}} size="sm" value="" />,
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
    <RadioButton disabled id="id" label="Name" onChange={() => {}} size="sm" value="" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton with subtext', () => {
  const tree = create(
    <RadioButton id="id" label="Name" onChange={() => {}} size="sm" subtext="More Info" value="" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('RadioButton with image', () => {
  const tree = create(
    <RadioButton
      id="id"
      image={
        <Box>
          <Image
            alt=""
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/FY2MKr5/stock6.jpg"
          />
        </Box>
      }
      label="Name"
      onChange={() => {}}
      size="sm"
      value=""
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
