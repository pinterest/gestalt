// @flow strict
import renderer from 'react-test-renderer';
import BannerSlim from './BannerSlim';
import Table from './Table';
import Text from './Text';

test('renders correctly with drawer', () => {
  const tree = renderer
    .create(
      <Table accessibilityLabel="Table Row Drawer">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text>TestA</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text>TestB</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text>TestC</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text>TestD</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.RowDrawer
            id="drawerTest"
            drawerContents={
              <BannerSlim
                type="recommendation"
                iconAccessibilityLabel="test"
                message="Test BannerSlim"
              />
            }
          >
            <Table.Cell>
              <Text>Row1A</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Row1B</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Row1C</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Row1D</Text>
            </Table.Cell>
          </Table.RowDrawer>
          <Table.Row>
            <Table.Cell>
              <Text>Row2A</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Row2B</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Row2C</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Row2D</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
