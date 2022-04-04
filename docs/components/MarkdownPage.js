// ignoring: since we do in fact want to render each component md block again
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-unstable-nested-components */
// @flow strict
import { Text, Box } from 'gestalt';
import { MDXProvider } from '@mdx-js/react';

import Page from './Page.js';
import PageHeader from './PageHeader.js';
import MainSection from './MainSection.js';

import { MAX_WIDTH } from './MainSectionSubsection.js';

type Props = {|
  children: Node,
  meta: {|
    title: string,
    badge: 'pilot' | 'deprecated',
    component?: boolean,
    description: string,
  |},
  pageSourceUrl?: string,
|};

export default function MarkdownPage({ children, meta, pageSourceUrl }: Props): Node {
  const components = {
    pre: (props) => <MainSection.Card defaultCode={props.children.props.children} />,

    h2: (props) => (
      <Box marginTop={12} marginBottom={4}>
        <MainSection name={props.children} />
      </Box>
    ),
    h3: (props) => (
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
    ),
    Card: (props) => {
      const newProps = { ...props };
      newProps.description = undefined;
      return <MainSection.Card {...newProps} />;
    },
    Code: (props: {| removeMarginBottom: boolean |}) => {
      const newProps = { ...props };
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
    Group: (props) => <Box marginBottom={12}>{props.children}</Box>,
    Do: (props: {| title: string |}) => (
      <MainSection.Card type={props.title || 'do'} title="Do" removeMarginBottom />
    ),
    Dont: (props: {| title: string |}) => (
      <MainSection.Card type={props.title || "don't"} title="Don't" removeMarginBottom />
    ),
    TwoCol: (props) => (
      <MainSection.Subsection columns={2}>{props.children}</MainSection.Subsection>
    ),
    ThreeCol: (props) => (
      <MainSection.Subsection columns={3}>{props.children}</MainSection.Subsection>
    ),
  };

  const maxWidth = meta.component ? 'none' : `${MAX_WIDTH}px`;

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
