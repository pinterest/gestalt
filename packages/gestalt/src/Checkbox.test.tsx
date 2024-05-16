import { create } from 'react-test-renderer';
import Box from './Box';
import Checkbox from './Checkbox';
import Image from './Image';

test('Checkbox', () => {
  const tree = create(<Checkbox id="id" label="Name" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox without label', () => {
  const tree = create(<Checkbox id="id" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox checked', () => {
  const tree = create(<Checkbox checked id="id" label="Name" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox indeterminate', () => {
  const tree = create(<Checkbox id="id" indeterminate label="Name" onChange={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox small', () => {
  const tree = create(<Checkbox id="id" label="Name" onChange={() => {}} size="sm" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox disabled', () => {
  const tree = create(
    <Checkbox disabled id="id" label="Name" onChange={() => {}} size="sm" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox disabled & checked', () => {
  const tree = create(
    <Checkbox checked disabled id="id" label="Name" onChange={() => {}} size="sm" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox with error', () => {
  const tree = create(
    <Checkbox errorMessage="Error message" id="id" label="Name" onChange={() => {}} size="sm" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox with helperText', () => {
  const tree = create(
    <Checkbox helperText="Additional Info" id="id" label="Name" onChange={() => {}} size="sm" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Checkbox with an image', () => {
  const tree = create(
    <Checkbox
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
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
