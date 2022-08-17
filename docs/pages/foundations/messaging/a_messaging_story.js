// @flow strict
import { Text } from 'gestalt';
import { type Node } from 'react';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function MessagingStoryPage(): Node {
  return (
    <Page title="A messaging story">
      <PageHeader name="A messaging story" type="guidelines" />
      <Text>Coming Soon!</Text>
    </Page>
  );
}
