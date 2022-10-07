// @flow strict
import { type Node, type Element } from 'react';
import { Badge, Box, Flex, Heading, Text, Tooltip, SlimBanner, Link } from 'gestalt';
import COMPONENT_DATA from './COMPONENT_DATA.js';
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

const componentData = [
  ...COMPONENT_DATA.buildingBlockComponents,
  ...COMPONENT_DATA.generalComponents,
  ...COMPONENT_DATA.utilityComponents,
];

type Props = {|
  badge?: 'pilot' | 'deprecated',
  children?: Node,
  /**
   * @deprecated : Use `children` instead of `defaultCode`
   */
  defaultCode?: string,
  description?: string,
  /**
   * Only use if name !== file name
   */
  fileName?: string,
  /**
   * Only use if name !== file name and the link should point to a directory
   */
  folderName?: string,
  margin?: 'default' | 'none',
  name: string,
  shadedCodeExample?: boolean,
  showCode?: boolean,
  slimBanner?: Element<typeof SlimBanner> | null,
  type?: 'guidelines' | 'component' | 'utility',
|};

export default function PageHeader({
  badge,
  children,
  defaultCode,
  description = '',
  fileName,
  folderName,
  margin = 'default',
  name,
  shadedCodeExample,
  showCode = true,
  slimBanner = null,
  type = 'component',
}: Props): Node {
  const sourcePathName = folderName ?? fileName ?? name;
  let sourceLink = buildSourceLinkUrl(sourcePathName);
  if (folderName) {
    // Strip the file extension if linking to a folder
    sourceLink = sourceLink.replace(/\.js$/, '');
  }

  const { aliases } = componentData.find((component) => component.name === name) ?? {};

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
        <Flex direction="column" gap={3}>
          <Flex alignItems="baseline" justifyContent="between" wrap>
            <Flex direction="column" gap={1}>
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

              {aliases && (
                <Text italic>
                  {/* using heading level to indicate to Algolia search that this is important */}
                  <div role="heading" aria-level="3">
                    also known as {aliases.join(', ')}
                  </div>
                </Text>
              )}
            </Flex>

            {/* Enable this when we have a consistent directory structure */}
            {['component' /* 'utility' */].includes(type) && (
              <Link
                href={sourceLink}
                onClick={() => trackButtonClick('View source on GitHub', sourcePathName)}
                target="blank"
                underline="always"
              >
                <Text>View source on GitHub</Text>
              </Link>
            )}
          </Flex>

          <Flex direction="column" gap={6}>
            {description && <Markdown text={description} />}
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
