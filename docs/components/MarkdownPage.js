import Page from './Page';
import Markdown from './Markdown.js';
import PageHeader from './PageHeader';
import { Text } from 'gestalt';
import MainSection from './MainSection';
import { MDXProvider } from '@mdx-js/react';
import ReactDOMServer from 'react-dom/server';

export default function MarkdownPage({ children, meta }) {
  const components = {
    pre: (props, meta) => {
      return <MainSection.Card defaultCode={props.children.props.children} />;
    },
    Card: (props, meta) => {
      const newProps = Object.assign({}, props);
      newProps.description = undefined;
      return <MainSection.Card {...newProps} />;
    },
    Code: (props) => {
      const newProps = Object.assign({}, props);
      newProps.children = undefined;
      return <MainSection.Card {...newProps} defaultCode={props.children} />;
    },
    Group: (props) => {
      return <div>{props.children}</div>;
    },
    Do: (props) => {
      return <MainSection.Card type="do" title={props.title} />;
    },
    Dont: (props) => {
      return <MainSection.Card type="don't" title={props.title} />;
    },
    TwoCol: (props) => {
      console.log(props);
      return <MainSection.Subsection columns={2}>{props.children}</MainSection.Subsection>;
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
