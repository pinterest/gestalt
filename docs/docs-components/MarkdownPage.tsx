import 'highlight.js/styles/a11y-light.css';
import { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import { TypeOptions } from 'packages/gestalt/src/Badge';
import { Badge, Box, ButtonLink, Datapoint, Flex, Icon, Link, List, Text } from 'gestalt';
import {
  TOKEN_COLOR_BACKGROUND_DEFAULT,
  TOKEN_COLOR_BACKGROUND_ELEVATION_ACCENT,
  TOKEN_COLOR_BACKGROUND_SECONDARY_BASE,
} from 'gestalt-design-tokens';
import AccessibilitySection from './AccessibilitySection';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import Highlighter from './highlight';
import IllustrationCard from './IllustrationCard';
import InternalOnlyIconButton from './InternalOnlyIconButton';
import MainSection from './MainSection';
import Page from './Page';
import PageHeader from './PageHeader';

type Props = {
  children: ReactNode;
  meta: {
    title: string;
    badge: 'pilot' | 'deprecated';
    fullwidth?: boolean;
    description: string;
    component: boolean;
  };
  pageSourceUrl?: string;
  platform: 'android' | 'ios' | 'web';
};

const isExternal: (arg1: string) => 'blank' | undefined = (href) => {
  if (href.startsWith('https://')) return 'blank';
  if (href.startsWith('http://pinch')) return 'blank';
  return undefined;
};

const components = {
  a: ({
    children,
    href,
  }: {
    href: string;
    children: string | null;
    display: 'inline' | 'inlineBlock' | 'block';
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
  // @ts-expect-error - TS7006 - Parameter 'props' implicitly has an 'any' type.
  ul: (props) => {
    const filtered = Object.values(props.children).filter((a) => a !== '\n');
    return (
      <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
        <List>
          {filtered.map((a, index) => (
            <List.Item
              // @ts-expect-error - TS2571 - Object is of type 'unknown'.
              key={JSON.stringify(a?.props.child ?? index)}
              // @ts-expect-error - TS2571 - Object is of type 'unknown'.
              text={<Text>{a?.props.children}</Text>}
            />
          ))}
        </List>
      </Box>
    );
  },
  // @ts-expect-error - TS7006 - Parameter 'props' implicitly has an 'any' type.
  ol: (props) => {
    const filtered = Object.values(props.children).filter((a) => a !== '\n');
    return (
      <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
        <List type="ordered">
          {filtered.map((a, index) => (
            <List.Item
              // @ts-expect-error - TS2571 - Object is of type 'unknown'.
              key={JSON.stringify(a?.props.child ?? index)}
              // @ts-expect-error - TS2571 - Object is of type 'unknown'.
              text={<Text>{a?.props.children}</Text>}
            />
          ))}
        </List>
      </Box>
    );
  },
  // @ts-expect-error - TS7006 - Parameter 'props' implicitly has an 'any' type.
  small: (props) => <Text size="100">{props.children}</Text>,
  pre: (props: {
    children: {
      props: {
        className: ReadonlyArray<string>;
        children: string | null;
      };
    };
  }) => (
    <Highlighter classNames={props.children.props.className}>
      {props.children.props.children}
    </Highlighter>
  ),
  figure: ({ src, caption }: { src: string; caption?: string }) => (
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
  // @ts-expect-error - TS7006 - Parameter 'props' implicitly has an 'any' type.
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
  // @ts-expect-error - TS7006 - Parameter 'props' implicitly has an 'any' type.
  p: (props) => <p style={{ maxWidth: DOCS_COPY_MAX_WIDTH_PX }}> {props.children} </p>,
  AccessibilitySection: ({
    children,
    designStatus,
    codeStatus,
    description
  }: {
    children: string | null;
    designStatus: string;
    codeStatus: string;
    description: string
  }) => (
    <Box marginBottom={(children) ? 8 : 0} marginTop={12}>
      <AccessibilitySection
        codeStatus={codeStatus}
        description={description}
        designStatus={designStatus}
      >
        {children}
      </AccessibilitySection>
    </Box>
  ),
  ActionButton: ({ children, href }: { href: string; children: string | null }) => (
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
    size?: 'lg' | 'md';
    title: string;
    value: string;
    trendValue: number;
    trendSentiment?: 'bad' | 'good' | 'neutral';
    trendAccessibilityLabel: string;
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
    href: string;
    children: string | null;
    display: 'inline' | 'inlineBlock' | 'block';
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
  // @ts-expect-error - TS7006 - Parameter 'props' implicitly has an 'any' type.
  Card: (props) => <MainSection.Card {...props} description={undefined} />,
  Code: (props: { marginBottom: 'default' | 'none'; children: string | null }) => {
    const newProps = { ...props } as const;
    // @ts-expect-error - TS2540 - Cannot assign to 'children' because it is a read-only property.
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
  Do: (props: { children?: ReactNode; title: string }) => (
    <MainSection.Card marginBottom="none" title={props.title || 'Do'} type="do">
      {props.children}
    </MainSection.Card>
  ),
  Dont: (props: { children?: ReactNode; title: string }) => (
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
    src: string;
    width: number;
    height: number;
    alt: string;
  }) => (
    // @ts-expect-error - TS2322 - Type '{ children: Element; style: { aspectRatio: `${number}/${number}`; }; width: string; }' is not assignable to type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'.
    <div style={{ aspectRatio: `${width}/${height}` }} width="100%">
      {/* @ts-expect-error - TS2322 - Type '{ alt: string; fill: true; height: number; src: string; width: number; }' is not assignable to type 'IntrinsicAttributes & Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref" | ... 4 more ... | "loading"> & { ...; }'. */}
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
    src: string;
    caption?: string;
    alt?: string;
    width?: number;
    height?: number;
    padding?: 'standard' | 'none';
    shaded?: boolean;
  }) => {
    const layout = width || height ? 'fixed' : 'fill';

    const colorStyle = {
      __style: {
        backgroundColor: shaded
          ? TOKEN_COLOR_BACKGROUND_ELEVATION_ACCENT
          : TOKEN_COLOR_BACKGROUND_DEFAULT,
      },
    } as const;

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
    children: ReactNode;
    spacing?: 'default' | 'expanded';
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
} as const;

export default function MarkdownPage({ children, meta, pageSourceUrl, platform }: Props) {
  const maxWidth = meta?.fullwidth ? 'none' : `${DOCS_COPY_MAX_WIDTH_PX}px`;

  return (
    // @ts-expect-error - TS2322 - Type '{ readonly a: ({ children, href, }: { href: string; children: string | null; display: "inline" | "block" | "inlineBlock"; }) => Element; readonly ul: (props: any) => Element; readonly ol: (props: any) => Element; ... 21 more ...; readonly ThreeCol: ({ children, spacing, }: { ...; }) => Element; }' is not assignable to type 'MDXComponents'.
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
