// @flow strict
import { type Node as ReactNode } from 'react';
import { Text } from 'gestalt';
import Page from '../../../../docs-components/Page.js';
import PageHeader from '../../../../docs-components/PageHeader.js';

export default function ToolingPage(): ReactNode {
  return (
    <Page title="Tooling">
      <PageHeader name="iOS Tooling" type="guidelines" />
      <Text>Coming Soon!</Text>
    </Page>
  );
}
