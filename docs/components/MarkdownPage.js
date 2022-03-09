import Page from './Page';
import PageHeader from './PageHeader';
import { Text } from 'gestalt';
import MainSection from './MainSection';

export default function MarkdownPage({ children, meta }) {
  return (
    <Page title={meta.title} className="Markdown">
      <PageHeader name={meta.title} badge={meta.badge} description={meta.description} noMargin />
      <Text>
        <article className="Markdown">{children}</article>
      </Text>
    </Page>
  );
}
