import Page from './Page';
import Markdown from './Markdown.js';
import PageHeader from './PageHeader';
import { Text, Box } from 'gestalt';
import MainSection from './MainSection';
import { MDXProvider } from '@mdx-js/react';
import ReactDOMServer from 'react-dom/server';

export default function MarkdownPage({ children, meta }) {
  const components = {
    pre: (props, meta) => {
      return <MainSection.Card defaultCode={props.children.props.children} />;
    },
    h2: (props, meta) => {
      return <MainSection name={props.children} />;
    },
    h3: (props, meta) => {
      return <MainSection.Subsection title={props.children} />;
    },
    Card: (props, meta) => {
      const newProps = Object.assign({}, props);
      newProps.description = undefined;
      return <MainSection.Card {...newProps} />;
    },
    Code: (props) => {
      const newProps = Object.assign({}, props);
      newProps.children = undefined;
      newProps.removeMarginBottom = undefined;
      return (
        <MainSection.Card
          {...newProps}
          defaultCode={props.children}
          removeMarginBottom={!('removeMarginBottom' in props) ? true : props.removeMarginBottom}
        />
      );
    },
    Group: (props) => {
      return <Box marginBottom={12}>{props.children}</Box>;
    },
    Do: (props) => {
      return <MainSection.Card type="do" title={props.title || 'Do'} removeMarginBottom />;
    },
    Dont: (props) => {
      return <MainSection.Card type="don't" title={props.title || "Don't"} removeMarginBottom />;
    },
    TwoCol: (props) => {
      return <MainSection.Subsection columns={2}>{props.children}</MainSection.Subsection>;
    },
    ThreeCol: (props) => {
      return <MainSection.Subsection columns={3}>{props.children}</MainSection.Subsection>;
    },
  };

  return (
    <MDXProvider components={components}>
      <Page title={meta.title} className="Markdown">
        <PageHeader name={meta.title} badge={meta.badge} description={meta.description} noMargin />
        <Text>
          <article className="Markdown">{children}</article>
        </Text>
      </Page>
    </MDXProvider>
  );
}
