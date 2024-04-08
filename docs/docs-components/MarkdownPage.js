// @flow strict
import 'highlight.js/styles/a11y-light.css';
import { type Node as ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import { Box, ButtonLink, Datapoint, Flex, Icon, Link, List, Text } from 'gestalt';
import {
  TOKEN_COLOR_BACKGROUND_DEFAULT,
  TOKEN_COLOR_BACKGROUND_ELEVATION_ACCENT,
  TOKEN_COLOR_BACKGROUND_SECONDARY_BASE,
} from 'gestalt-design-tokens';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import Highlighter from './highlight';
import IllustrationCard from './IllustrationCard';
import InternalOnlyIconButton from './InternalOnlyIconButton';
import MainSection from './MainSection';
import Page from './Page';
import PageHeader from './PageHeader';

type Props = {
  children: ReactNode,
  meta: {
    title: string,
    badge: 'pilot' | 'deprecated',
    fullwidth?: boolean,
    description: string,
    component: boolean,
  },
  pageSourceUrl?: string,
  platform: 'android' | 'ios' | 'web',
};

const isExternal: (string) => 'blank' | void = (href) => {
  if (href.startsWith('https://')) return 'blank';
  if (href.startsWith('http://pinch')) return 'blank';
  return undefined;
};

const components = {
  a: ({
    children,
    href,
  }: {
    href: string,
    children: string | null,
    display: 'inline' | 'inlineBlock' | 'block',
  }) => (
    <Link
      display="inline"
      externalLinkIcon={isExternal(href) === 'blank' ? 'default' : 'none'}
      href={href}
      target={isExternal(href)}
    >
      {children}
    </Link>
  ),
  // $FlowFixMe[missing-local-annot]
  ul: (props) => {
    const filtered = Object.values(props.children).filter((a) => a !== '\n');
    return (
      <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
        <List>
          {filtered.map((a, index) => (
            <List.Item
              key={JSON.stringify(a?.props.child ?? index)}
              text={<Text>{a?.props.children}</Text>}
            />
          ))}
        </List>
      </Box>
    );
  },
  // $FlowFixMe[missing-local-annot]
  ol: (props) => {
    const filtered = Object.values(props.children).filter((a) => a !== '\n');
    return (
      <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
        <List type="ordered">
          {filtered.map((a, index) => (
            <List.Item
              key={JSON.stringify(a?.props.child ?? index)}
              text={<Text>{a?.props.children}</Text>}
            />
          ))}
        </List>
      </Box>
    );
  },
  // $FlowFixMe[missing-local-annot]
  small: (props) => <Text size="100">{props.children}</Text>,
  pre: (props: {
    children: {
      props: { className: $ReadOnlyArray<string>, children: string | null },
    },
  }) => (
    <Highlighter classNames={props.children.props.className}>
      {props.children.props.children}
    </Highlighter>
  ),
  figure: ({ src, caption }: { src: string, caption?: string }) => (
    <Flex justifyContent="center" wrap>
      <Box as="figure" width={400}>
        <Image
          alt="image"
          height="100%"
          layout="responsive"
          objectFit="contain"
          src={src}
          width="100%"
        />
        <Text align="center" size="100">
          <Box as="figcaption" marginTop={3}>
            {caption || ''}
          </Box>
        </Text>
      </Box>
    </Flex>
  ),
  // $FlowFixMe[missing-local-annot]
  h2: (props) => (
    <Box marginBottom={0} marginTop={12}>
      <MainSection name={props.children} />
    </Box>
  ),
  hr: () => (
    <Box marginBottom={8} marginTop={8}>
      <hr />
    </Box>
  ),
  // $FlowFixMe[missing-local-annot]
  p: (props) => <p style={{ maxWidth: DOCS_COPY_MAX_WIDTH_PX }}> {props.children} </p>,
  ActionButton: ({ children, href }: { href: string, children: string | null }) => (
    <ButtonLink
      accessibilityLabel=""
      color="gray"
      href={href}
      target="blank"
      text={children || ''}
    />
  ),
  Datapoint: ({
    size,
    title,
    value,
    trendValue,
    trendSentiment,
    trendAccessibilityLabel,
  }: {
    size?: 'lg' | 'md',
    title: string,
    value: string,
    trendValue: number,
    trendSentiment?: 'bad' | 'good' | 'neutral',
    trendAccessibilityLabel: string,
  }) => (
    <Datapoint
      size={size}
      title={title}
      trend={{ value: trendValue, accessibilityLabel: trendAccessibilityLabel }}
      trendSentiment={trendSentiment}
      value={value}
    />
  ),
  PrivateLink: ({
    children,
    href,
    display,
  }: {
    href: string,
    children: string | null,
    display: 'inline' | 'inlineBlock' | 'block',
  }) => (
    <Text inline>
      <Link display={display || 'block'} href={href} target="blank">
        <Flex alignItems="baseline">
          {children}
          <InternalOnlyIconButton size="xs" />
        </Flex>
      </Link>
    </Text>
  ),
  Hint: ({ children }: { children: string | null }) => (
    <div
      className="md-hint"
      style={{
        padding: '1rem',
        backgroundColor: TOKEN_COLOR_BACKGROUND_SECONDARY_BASE,
      }}
    >
      <Flex
        alignItems="center"
        gap={{
          row: 2,
          column: 0,
        }}
        width="full"
      >
        <Icon accessibilityLabel="Hint" icon="lightbulb" size={16} />
        <Text>{children}</Text>
      </Flex>
    </div>
  ),
  h3: ({ children }: { children: string }) => (
    <Box>
      <MainSection.Subsection marginBottom="compact" title={children} />
    </Box>
  ),
  img: (props: { src: string }) => (
    <Image
      alt="image"
      height="100%"
      layout="responsive"
      objectFit="contain"
      src={props.src}
      width="100%"
    />
  ),
  IllustrationCard,
  // $FlowFixMe[missing-local-annot]
  Card: (props) => <MainSection.Card {...props} description={undefined} />,
  Code: (props: { marginBottom: 'default' | 'none', children: string | null }) => {
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
  Group: ({ children }: { children: ReactNode }) => <Box marginBottom={12}>{children}</Box>,
  Do: (props: { children?: ReactNode, title: string }) => (
    <MainSection.Card marginBottom="none" title={props.title || 'Do'} type="do">
      {props.children}
    </MainSection.Card>
  ),
  Dont: (props: { children?: ReactNode, title: string }) => (
    <MainSection.Card marginBottom="none" title={props.title || "Don't"} type="don't">
      {props.children}
    </MainSection.Card>
  ),
  TwoCol: ({ children }: { children: ReactNode }) => (
    <MainSection.Subsection columns={2}>{children}</MainSection.Subsection>
  ),
  ImgHero: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string,
    width: number,
    height: number,
    alt: string,
  }) => (
    <div style={{ aspectRatio: `${width}/${height}` }} width="100%">
      <Image alt={alt} fill height={height} src={src} width={width} />
    </div>
  ),
  ImgContainer: ({
    src,
    caption,
    alt,
    width,
    height,
    padding,
    shaded,
  }: {
    src: string,
    caption?: string,
    alt?: string,
    width?: number,
    height?: number,
    padding?: 'standard' | 'none',
    shaded?: boolean,
  }) => {
    const layout = width || height ? 'fixed' : 'fill';

    const colorStyle = {
      __style: {
        backgroundColor: shaded
          ? TOKEN_COLOR_BACKGROUND_ELEVATION_ACCENT
          : TOKEN_COLOR_BACKGROUND_DEFAULT,
      },
    };

    const defaultPadding = padding || 'none';

    return (
      <Box>
        <Box
          borderStyle="sm"
          dangerouslySetInlineStyle={colorStyle}
          height="250px"
          padding={defaultPadding === 'standard' ? 8 : 0}
          rounding={2}
        >
          <Box
            alignItems="center"
            display="flex"
            height="100%"
            justifyContent="center"
            position="relative"
            width="100%"
          >
            <Image
              alt={alt}
              height={layout === 'fill' ? undefined : height || '100%'}
              layout={layout}
              objectFit="contain"
              src={src}
              width={layout === 'fill' ? undefined : width || '100%'}
            />
          </Box>
        </Box>
        {caption && (
          <Text align="start" size="300">
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
  }: {
    children: ReactNode,
    spacing?: 'default' | 'expanded',
  }) => (
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

export default function MarkdownPage({
  children,
  meta,
  pageSourceUrl,
  platform,
}: Props): ReactNode {
  const maxWidth = meta?.fullwidth ? 'none' : `${DOCS_COPY_MAX_WIDTH_PX}px`;

  return (
    <MDXProvider components={components}>
      <Page pageSourceUrl={pageSourceUrl} title={meta.title}>
        <PageHeader
          badge={meta.badge}
          description={meta.description}
          margin="none"
          name={meta.title}
          platform={platform}
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
