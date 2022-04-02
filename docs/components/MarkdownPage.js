import Page from './Page';
import Markdown from './Markdown.js';
import PageHeader from './PageHeader';
import { Text, Box } from 'gestalt';
import MainSection from './MainSection';
import { MDXProvider } from '@mdx-js/react';
import ReactDOMServer from 'react-dom/server';
import { MAX_WIDTH } from './MainSectionSubsection.js';

export default function MarkdownPage({ children, meta, pageProps, pageSourceUrl }) {
  const components = {
    pre: (props, meta) => {
      return <MainSection.Card defaultCode={props.children.props.children} />;
    },

    h2: (props, meta) => {
      return (
        <Box marginTop={12} marginBottom={4}>
          <MainSection name={props.children} />
        </Box>
      );
    },
    h3: (props, meta) => {
      return (
        <Box
          ref={(node) => {
            // eek, hacky. Getting around the .Markdown > h3 coloring css
            if (node) {
              node.classList.add('mdx-header');
            }
          }}
        >
          <MainSection.Subsection title={props.children} />{' '}
        </Box>
      );
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

  const maxWidth = meta.component ? 'none' : MAX_WIDTH + 'px';

  return (
    <MDXProvider components={components}>
      <Page title={meta.title} className="Markdown" pageSourceUrl={pageSourceUrl}>
        <PageHeader
          name={meta.title}
          badge={meta.badge}
          description={meta.description}
          noMargin
          showSourceLink={meta.component || false}
        />
        <Text>
          <article className="Markdown" style={{ maxWidth }}>
            {children}
          </article>
        </Text>
      </Page>
    </MDXProvider>
  );
}
