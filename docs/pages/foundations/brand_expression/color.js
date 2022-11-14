// @flow strict
import { Text, Flex, Box, Link } from 'gestalt';
import { type Node } from 'react';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function MessagingComponentsPage(): Node {
  return (
    <Page title="Color">
      <PageHeader badge="pilot" name="Color" type="guidelines" />
      <MainSection name="We need a title here">Foo</MainSection>
      <MainSection name="Accessibility">Foo</MainSection>
    </Page>
  );
}
