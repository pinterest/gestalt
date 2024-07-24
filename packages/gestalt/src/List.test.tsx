import { create } from 'react-test-renderer';
import List from './List';
import Text from './Text';

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
          <List type="unordered">
            <List.Item text="List item text" />
            <List.Item text="List item text">
              <List.Item text="List item text" />
              <List.Item text="List item text">
                <List type="ordered">
                  <List.Item text="List item text" />
                  <List.Item text="List item text" />
                </List>
              </List.Item>
            </List.Item>
            <List.Item text="List item text" />
          </List>
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
      <List label="label test" labelDisplay="hidden" type="ordered">
        <List.Item text="List item text" />
      </List>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders an condensed list', () => {
    const tree = create(
      <List label="label test" spacing="condensed" type="ordered">
        <List.Item text="List item text" />
      </List>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders an list item with custom text', () => {
    const tree = create(
      <List label="label test" spacing="condensed" type="ordered">
        <List.Item text={<Text weight="bold">List item text</Text>} />
      </List>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a bare unordered list with data test id', () => {
    const component = create(
      <List label="label test" type="bare">
        <List.Item dataTestId="list-item-1" text="List item text">
          <List.Item dataTestId="list-item-2" text="List item text" />
        </List.Item>
      </List>,
    ).root;
    expect(
      component
        .findAll((element) => element.type === 'li')
        .filter((node) => node.props['data-test-id'] === 'list-item-1'),
    ).toHaveLength(1);
    expect(
      component
        .findAll((element) => element.type === 'li')
        .filter((node) => node.props['data-test-id'] === 'list-item-2'),
    ).toHaveLength(1);
  });
});
