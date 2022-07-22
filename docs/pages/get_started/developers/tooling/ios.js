// @flow strict
import { Text } from 'gestalt';
import { type Node } from 'react';
import Page from '../../../../components/Page.js';
import PageHeader from '../../../../components/PageHeader.js';

export default function ToolingPage(): Node {
  return (
    <Page title="Tooling">
      <PageHeader name="iOS Tooling" type="guidelines" />
      <Text>Coming Soon!</Text>
    </Page>
  );
}
