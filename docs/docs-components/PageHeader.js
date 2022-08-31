// @flow strict
import { type Node, type Element } from 'react';
import { Badge, Box, Flex, Heading, Text, Tooltip, SlimBanner, Link } from 'gestalt';
import Markdown from './Markdown.js';
import MainSection from './MainSection.js';
import trackButtonClick from './buttons/trackButtonClick.js';
import PageHeaderQualitySummary from './PageHeaderQualitySummary.js';

const buildSourceLinkPath = (componentName) => {
  const packageName = componentName === 'DatePicker' ? 'gestalt-datepicker' : 'gestalt';
  return `packages/${packageName}/src/${componentName}.js`;
};

const buildSourceLinkUrl = (componentName) =>
  ['https://github.com/pinterest/gestalt/blob/master', buildSourceLinkPath(componentName)].join(
    '/',
  );

type Props = {|
  badge?: 'pilot' | 'deprecated',
  // DEPRECATED: Use `children` instead of `defaultCode`
  defaultCode?: string,
  description?: string,
  fileName?: string, // only use if name !== file name
  folderName?: string, // only use if name !== file name and the link should point to a directory
  showCode?: boolean,
  name: string,
  margin?: 'default' | 'none',
  shadedCodeExample?: boolean,
  slimBanner?: Element<typeof SlimBanner> | null,
  type?: 'guidelines' | 'component' | 'utils',
  children?: Node,
|};

export default function PageHeader({
  badge,
  children,
  defaultCode,
  margin = 'default',
  description = '',
  fileName,
  folderName,
  showCode = true,
  name,
  shadedCodeExample,
  slimBanner = null,
  type = 'component',
}: Props): Node {
  const sourcePathName = folderName ?? fileName ?? name;
  let sourceLink = buildSourceLinkUrl(sourcePathName);
  if (folderName) {
    // Strip the file extension if linking to a folder
    sourceLink = sourceLink.replace(/\.js$/, '');
  }

  const badgeMap = {
    pilot: {
      text: 'Pilot',
      tooltipText: `This is the initial version of ${name}, and additional (non-breaking) functionality is planned for the future. Any feedback is greatly appreciated!`,
    },
    deprecated: {
      text: 'Deprecated',
      tooltipText: `This component is deprecated and will be removed soon`,
      type: 'error',
    },
  };

  const showMargin = margin === 'default';
  const addGap = Boolean(defaultCode || children);

  return (
    <Box
      marginBottom={addGap || !showMargin ? 0 : 2}
      dangerouslySetInlineStyle={{
        __style: {
          paddingBottom: '1px',
        },
      }}
    >
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: addGap ? 8 : 0,
        }}
      >
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 2,
          }}
        >
          <Flex
            alignItems="baseline"
            direction="row"
            gap={{
              row: 2,
              column: 0,
            }}
            justifyContent="between"
            wrap
          >
            <Heading>
              {name}{' '}
              {badge ? (
                <Tooltip inline text={badgeMap[badge].tooltipText}>
                  <Badge
                    text={badgeMap[badge].text}
                    position="top"
                    type={badgeMap[badge].type || 'info'}
                  />
                </Tooltip>
              ) : null}
            </Heading>

            {type === 'component' && (
              <Link
                href={sourceLink}
                onClick={() => trackButtonClick('View source on GitHub', sourcePathName)}
                target="blank"
              >
                <Text underline>View source on GitHub</Text>
              </Link>
            )}
          </Flex>

          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 6,
            }}
          >
            {description && <Markdown text={description} allowCanonical />}
            {slimBanner}
            {type === 'component' ? <PageHeaderQualitySummary name={name} /> : null}
            {defaultCode && (
              <MainSection.Card
                cardSize="lg"
                defaultCode={defaultCode}
                shaded={shadedCodeExample}
                showCode={showCode}
                hideCodePreview
              />
            )}
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
