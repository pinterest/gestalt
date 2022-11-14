// @flow strict
import { Text, Flex, Box, Link } from 'gestalt';
import { type Node } from 'react';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function MessagingComponentsPage(): Node {
  return (
    <Page title="Imagery and illustrations">
      <PageHeader badge="pilot" name="Imagery and illustrations" type="guidelines" />
      <MainSection name="Types of images">Foo</MainSection>
      <MainSection name="Accessibility">Foo</MainSection>
      <MainSection name="Localization">Foo</MainSection>
      <MainSection name="Voice and tone">Foo</MainSection>
    </Page>
  );
}
