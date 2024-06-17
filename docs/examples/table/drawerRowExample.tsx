import { useState } from 'react';
import { BannerSlim, Box, Table, Text } from 'gestalt';

export default function Example() {
  const [showdrawer, setShowDrawer] = useState(true);

  return (
    <Box width="100%">
      <Table accessibilityLabel="Table.RowDrawer example">
        <colgroup>
          {/* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'. */}
          <col span="1" style={{ width: '60%' }} />
          {/* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'. */}
          <col span="1" style={{ width: '15%' }} />
          {/* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'. */}
          <col span="1" style={{ width: '15%' }} />
          {/* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'. */}
          <col span="1" style={{ width: '15%' }} />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Campaign</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text align="forceRight" weight="bold">
                Spend
              </Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text align="forceRight" weight="bold">
                Impressions
              </Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text align="forceRight" weight="bold">
                CTR
              </Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.RowDrawer
            drawerContents={
              showdrawer ? (
                <BannerSlim
                  iconAccessibilityLabel="Recommendation"
                  message="Increasing your daily spend could increase clicks by 20%"
                  onDismiss={() => setShowDrawer(false)}
                  primaryAction={{
                    accessibilityLabel: 'Apply for increasing your daily spend',
                    label: 'Apply',
                    onClick: () => {},
                    role: 'button',
                  }}
                  type="recommendation"
                />
              ) : null
            }
            id="drawerExample"
          >
            <Table.Cell>
              <Text>Training treats</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">$3,200</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">3.4k</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">0.07%</Text>
            </Table.Cell>
          </Table.RowDrawer>
          <Table.Row>
            <Table.Cell>
              <Text>Vegan cuisine</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">$4,200</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">5k</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">0.40%</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>Mexican cuisine</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">$5,000</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">20k</Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="forceRight">0.10%</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Box>
  );
}
