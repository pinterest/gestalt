// @flow strict

// ignoring: since we do in fact want to render each component md block again

import { type Node } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Text, Box, Link, Flex, Icon, List, Button } from 'gestalt';
import Image from 'next/image';
import Highlighter from './highlight.js';
import IllustrationCard from './IllustrationCard.js';
import InternalOnlyIconButton from './InternalOnlyIconButton.js';
import MainSection from './MainSection.js';
import { MAX_WIDTH } from './MainSectionSubsection.js';
import Page from './Page.js';
import PageHeader from './PageHeader.js';

import 'highlight.js/styles/a11y-light.css';

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

const components = {
  ul: (props) => {
    const filtered = Object.values(props.children).filter((a) => a !== '\n');
    return (
      <List>
        {filtered.map((a, index) => (
          <List.Item
            // $FlowFixMe[incompatible-use]
            key={JSON.stringify(a?.props.child ?? index)}
            // $FlowFixMe[incompatible-use]
            text={<Text>{a?.props.children}</Text>}
          />
        ))}
      </List>
    );
  },
  ol: (props) => {
    const filtered = Object.values(props.children).filter((a) => a !== '\n');
    return (
      <List type="ordered">
        {filtered.map((a, index) => (
          <List.Item
            // $FlowFixMe[incompatible-use]
            key={JSON.stringify(a?.props.child ?? index)}
            // $FlowFixMe[incompatible-use]
            text={<Text>{a?.props.children}</Text>}
          />
        ))}
      </List>
    );
  },
  small: (props) => <Text size="100">{props.children}</Text>,
  pre: (props: {|
    children: {| props: {| className: $ReadOnlyArray<string>, children: string | null |} |},
  |}) => (
    <Highlighter classNames={props.children.props.className}>
      {props.children.props.children}
    </Highlighter>
  ),
  figure: ({ src, caption }: {| src: string, caption?: string |}) => (
    <Flex wrap justifyContent="center">
      <Box as="figure" width={400}>
        <Image
          src={src}
          alt="image"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
        <Text size="100" align="center">
          <Box as="figcaption" marginTop={3}>
            {caption || ''}
          </Box>
        </Text>
      </Box>
    </Flex>
  ),
  h2: ({ children }) => (
    <Box marginTop={12} marginBottom={0}>
      <MainSection name={children} />
    </Box>
  ),
  hr: () => (
    <Box marginTop={8} marginBottom={8}>
      <hr />
    </Box>
  ),
  ActionButton: ({ children, href }: {| href: string, children: string | null |}) => (
    <Button
      role="link"
      href={href}
      target="blank"
      text={children || ''}
      color="gray"
      accessibilityLabel=""
    />
  ),
  PrivateLink: ({
    children,
    href,
    display,
  }: {|
    href: string,
    children: string | null,
    display: 'inline' | 'inlineBlock' | 'block',
  |}) => (
    <Link href={href} target="blank" display={display || 'block'}>
      <Flex
        alignItems="baseline"
        gap={{
          row: 1,
          column: 0,
        }}
      >
        <Text underline>{children}</Text>
        <InternalOnlyIconButton size="sm" />
      </Flex>
    </Link>
  ),
  Hint: ({ children }: {| children: string | null |}) => (
    <div
      className="md-hint"
      style={{
        padding: '1rem',
        backgroundColor: 'var(--g-colorGray100)',
      }}
    >
      <Flex
        gap={{
          row: 2,
          column: 0,
        }}
        alignItems="center"
        width="full"
      >
        <Icon accessibilityLabel="Hint" icon="lightbulb" size={16} />
        <Text>{children}</Text>
      </Flex>
    </div>
  ),
  h3: ({ children }: {| children: string |}) => (
    <Box>
      <MainSection.Subsection title={children} marginBottom="compact" />
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
  IllustrationCard,
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
  Group: ({ children }: {| children: Node |}) => <Box marginBottom={12}>{children}</Box>,
  Do: (props: {| children?: Node, title: string |}) => (
    <MainSection.Card type="do" title={props.title || 'Do'} marginBottom="none">
      {props.children}
    </MainSection.Card>
  ),
  Dont: (props: {| children?: Node, title: string |}) => (
    <MainSection.Card type="don't" title={props.title || "Don't"} marginBottom="none">
      {props.children}
    </MainSection.Card>
  ),
  TwoCol: ({ children }: {| children: Node |}) => (
    <MainSection.Subsection columns={2}>{children}</MainSection.Subsection>
  ),
  ImgContainer: ({
    src,
    caption,
    alt,
    width,
    height,
    addPadding,
  }: {|
    src: string,
    caption?: string,
    alt?: string,
    width?: number,
    height?: number,
    addPadding?: boolean,
  |}) => {
    const layout = width || height ? 'fixed' : 'fill';

    return (
      <Box>
        <Box
          padding={addPadding ? 8 : 0}
          rounding={2}
          borderStyle="sm"
          height="250px"
          color="light"
        >
          <Box
            position="relative"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={src}
              alt={alt}
              width={layout === 'fill' ? undefined : width || '100%'}
              height={layout === 'fill' ? undefined : height || '100%'}
              layout={layout}
              objectFit="contain"
            />
          </Box>
        </Box>
        {caption && (
          <Text size="300" align="start">
            <Box as="figcaption" marginTop={3}>
              {caption}
            </Box>
          </Text>
        )}
      </Box>
    );
  },
  ThreeCol: ({
    children,
    spacing = 'default',
  }: {|
    children: Node,
    spacing?: 'default' | 'expanded',
  |}) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, .33fr))',
        gap: spacing === 'default' ? '2px' : '8px',
      }}
    >
      {children}
    </div>
  ),
};

export default function MarkdownPage({ children, meta, pageSourceUrl }: Props): Node {
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
            className="Markdown mdx-page"
            style={{ maxWidth, marginTop: meta.description ? '0px' : '-32px' }}
          >
            {children}
          </article>
        </Text>
      </Page>
    </MDXProvider>
  );
}
