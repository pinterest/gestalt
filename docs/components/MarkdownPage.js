// @flow strict

// ignoring: since we do in fact want to render each component md block again
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-unstable-nested-components */
import { Text, Box, Link, Flex, Icon } from 'gestalt';
import Image from 'next/image';
import { MDXProvider } from '@mdx-js/react';
import { type Node } from 'react';

import Page from './Page.js';
import PageHeader from './PageHeader.js';
import MainSection from './MainSection.js';

import LockIcon from './LockIcon.js';
import { MAX_WIDTH } from './MainSectionSubsection.js';

import 'highlight.js/styles/a11y-light.css';
import Highlighter from './highlight.js';

type Props = {|
  children: Node,
  meta: {|
    title: string,
    badge: 'pilot' | 'deprecated',
    fullwidth?: boolean,
    description: string,
    component: boolean,
  |},
  pageSourceUrl?: string,
|};

export default function MarkdownPage({ children, meta, pageSourceUrl }: Props): Node {
  const components = {
    small: (props) => <Text size="100">{props.children}</Text>,
    pre: (props: {|
      children: {| props: {| className: string[], children: string | null |} |},
    |}) => (
      <Highlighter classNames={props.children.props.className}>
        {props.children.props.children}
      </Highlighter>
    ),
    figure: (props: {| src: string, caption?: string |}) => (
      <Flex wrap justifyContent="center">
        <Box as="figure" width={400}>
          <Image
            src={props.src}
            alt="image"
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
          <Text size="100" align="center">
            <Box as="figcaption" marginTop={3}>
              {props.caption || ''}
            </Box>
          </Text>
        </Box>
      </Flex>
    ),
    h2: (props) => (
      <Box marginTop={12} marginBottom={0}>
        <MainSection name={props.children} />
      </Box>
    ),
    hr: () => (
      <Box marginTop={8} marginBottom={8}>
        <hr />
      </Box>
    ),
    PrivateLink: (props: {| href: string, children: string | null |}) => (
      <Link href={props.href} target="blank">
        <Flex alignItems="baseline" gap={1}>
          <Text underline>{props.children}</Text>
          <LockIcon size={16} />
        </Flex>
      </Link>
    ),
    Hint: (props: {| icon?: Icons, children: string | null |}) => (
      <div
        className="md-hint"
        style={{
          padding: '1rem',
          backgroundColor: 'var(--g-colorGray100)',
          marginTop: '16px',
          marginBottom: '16px',
        }}
      >
        <Flex gap={2} alignItems="center" width="full">
          <Icon accessibilityLabel="Hint" icon={props.icon ? props.icon : 'lightbulb'} size={16} />
          <Text>{props.children}</Text>
        </Flex>
      </div>
    ),
    h3: (props) => (
      <Box>
        <MainSection.Subsection title={props.children} marginBottom="compact" />
      </Box>
    ),
    img: (props: {| src: string |}) => (
      <Image
        src={props.src}
        alt="image"
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />
    ),
    Card: (props) => <MainSection.Card {...props} description={undefined} />,
    Code: (props: {| marginBottom: 'default' | 'none', children: string | null |}) => {
      const newProps = { ...props };
      newProps.children = null;
      // may not need to this in the future
      return (
        <MainSection.Card
          {...newProps}
          defaultCode={props.children || ''}
          marginBottom={props.marginBottom || 'none'}
        />
      );
    },
    Group: (props) => <Box marginBottom={12}>{props.children}</Box>,
    Do: (props: {| title: string |}) => (
      <MainSection.Card type="do" title={props.title || 'Do'} marginBottom="none" />
    ),
    Dont: (props: {| title: string |}) => (
      <MainSection.Card type="don't" title={props.title || "Don't"} marginBottom="none" />
    ),
    TwoCol: (props) => (
      <MainSection.Subsection columns={2}>{props.children}</MainSection.Subsection>
    ),
  };

  const maxWidth = meta.fullwidth ? 'none' : `${MAX_WIDTH}px`;

  return (
    <MDXProvider components={components}>
      <Page title={meta.title} pageSourceUrl={pageSourceUrl}>
        <PageHeader
          name={meta.title}
          badge={meta.badge}
          description={meta.description}
          margin="none"
          type={meta.component ? 'component' : 'guidelines'}
        />
        <Text>
          <article
            className="Markdown"
            style={{ maxWidth, marginTop: meta.description ? '0px' : '-32px' }}
          >
            {children}
          </article>
        </Text>
      </Page>
    </MDXProvider>
  );
}
