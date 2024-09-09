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

test('validate data test id for radiogroup', () => {
  const component = create(
    <RadioButton
      dataTestId="test-radiobutton"
      disabled
      id="id"
      label="Outside of group"
      onChange={() => {}}
      size="sm"
      value=""
    />,
  ).root;
  expect(
    component
      .findAll((element) => element.type === 'input')
      .filter((node) => node.props['data-test-id'] === 'test-radiobutton'),
  ).toHaveLength(1);
  expect(
    component
      .findAll((element) => element.type === 'div')
      .filter((node) => node.props['data-test-id'] === 'test-radiobutton-label'),
  ).toHaveLength(1);
});
