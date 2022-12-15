// @flow strict
import { create } from 'react-test-renderer';
import List from './List.js';
import Text from './Text.js';

describe('List', () => {
  it('renders a bare unordered list', () => {
    const tree = create(
      <List label="label test" type="bare">
        <List.Item text="List item text">
          <List.Item text="List item text">
            <List.Item text="List item text">
              <List.Item text="List item text">
                <List.Item text="List item text">
                  <List.Item text="List item text" />
                </List.Item>
              </List.Item>
            </List.Item>
          </List.Item>
        </List.Item>
      </List>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an unordered list', () => {
    const tree = create(
      <List label="label test" type="unordered">
        <List.Item text="List item text">
          <List.Item text="List item text">
            <List.Item text="List item text">
              <List.Item text="List item text">
                <List.Item text="List item text">
                  <List.Item text="List item text" />
                </List.Item>
              </List.Item>
            </List.Item>
          </List.Item>
        </List.Item>
      </List>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders an ordered list', () => {
    const tree = create(
      <List label="label test" type="ordered">
        <List.Item text="List item text">
          <List.Item text="List item text">
            <List.Item text="List item text">
              <List.Item text="List item text">
                <List.Item text="List item text">
                  <List.Item text="List item text" />
                </List.Item>
              </List.Item>
            </List.Item>
          </List.Item>
        </List.Item>
      </List>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders an mixed list', () => {
    const tree = create(
      <List label="label test" type="ordered">
        <List.Item text="List item text" />
        <List.Item text="List item text">
          <List.NestedList type="unordered">
            <List.Item text="List item text" />
            <List.Item text="List item text">
              <List.Item text="List item text" />
              <List.Item text="List item text">
                <List.NestedList type="ordered">
                  <List.Item text="List item text" />
                  <List.Item text="List item text" />
                </List.NestedList>
              </List.Item>
            </List.Item>
            <List.Item text="List item text" />
          </List.NestedList>
        </List.Item>
        <List.Item text="List item text" />
      </List>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders an list with a custom label', () => {
    const tree = create(
      <List label={<Text weight="bold">label test</Text>} type="ordered">
        <List.Item text="List item text" />
      </List>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders an list with a hidden label', () => {
    const tree = create(
      <List labelDisplay="hidden" label="label test" type="ordered">
        <List.Item text="List item text" />
      </List>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders an condensed list', () => {
    const tree = create(
      <List spacing="condensed" label="label test" type="ordered">
        <List.Item text="List item text" />
      </List>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders an list item with custom text', () => {
    const tree = create(
      <List spacing="condensed" label="label test" type="ordered">
        <List.Item text={<Text weight="bold">List item text</Text>} />
      </List>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
