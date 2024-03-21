// @flow strict
import { type ElementProps, type Node as ReactNode, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Icon,
  Layer,
  Link,
  Pog,
  RadioGroup,
  SearchField,
  TapArea,
  Text,
  Toast,
  Tooltip,
} from 'gestalt';
import iconCategoryData from './ICON_DATA.json';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';

const { icons } = Icon;
const CATEGORIES = [
  'Add',
  'Ads and measurement',
  'Alignment',
  'Arrows',
  'Media controls',
  'Platform specific',
  'Reactions and ratings',
  'Social',
  'Status',
  'Text',
  'Time',
  'Toggle',
  'Utility and tools',
];

function IconTile({
  iconName,
  iconDescription = 'Description coming soon',
  onTap,
}: {
  iconName: $NonMaybeType<$ElementType<ElementProps<typeof Icon>, 'icon'>>,
  iconDescription: string,
  onTap: () => void,
}) {
  const [hovered, setHovered] = useState<?boolean>();

  return (
    <Tooltip accessibilityLabel={iconDescription} idealDirection="down" text={iconDescription}>
      <TapArea
        onBlur={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTap={onTap}
        rounding={2}
        tapStyle="compress"
      >
        <Box
          borderStyle="sm"
          color={hovered ? 'inverse' : 'default'}
          height={110}
          padding={2}
          position="relative"
          rounding={2}
          width={150}
        >
          <Flex
            alignItems="center"
            direction="column"
            flex="grow"
            gap={2}
            height="100%"
            justifyContent="center"
          >
            <Icon
              accessibilityLabel=""
              color={hovered ? 'inverse' : 'default'}
              icon={iconName}
              size="24"
            />
            <Text color={hovered ? 'inverse' : 'default'} size="100">
              {iconName}
            </Text>
          </Flex>
          <Box
            bottom
            dangerouslySetInlineStyle={{
              __style: { bottom: '8px', right: '8px' },
            }}
            display={hovered ? 'block' : 'none'}
            position="absolute"
            right
          >
            <Pog
              bgColor="lightGray"
              icon="copy-to-clipboard"
              iconColor="darkGray"
              padding={1}
              size="xs"
            />
          </Box>
        </Box>
      </TapArea>{' '}
    </Tooltip>
  );
}

function findIconByCategory(icon?: string, category: string) {
  // This check ensures there is an actual matching icon in our component
  // so we don't accidentally show icons that are only in Figma.
  const iconComponentName = icons.find((name) => name === icon);

  return iconCategoryData.icons.find(
    ({ name, categories }) => name === iconComponentName && categories.includes(category),
  );
}

function iconHasKeyword(iconName?: string, searchTerm: string) {
  return (
    iconCategoryData.icons.find(
      ({ name, keywords }) =>
        name === iconName && keywords?.find((word) => word.includes(searchTerm)),
    ) !== undefined
  );
}

export default function IconPage(): ReactNode {
  const [showToastText, setShowToastText] = useState<void | string>();

  const iconOptions = icons
    .map((name, index) => ({
      label: name,
      value: `value${index}`,
    }))
    .sort(({ label: aName }, { label: bName }) => {
      if (aName < bName) return -1;
      if (aName > bName) return 1;
      return 0;
    });

  const [suggestedOptions, setSuggestedOptions] = useState(iconOptions);
  const [inputValue, setInputValue] = useState<void | string>();
  const [sortedAlphabetical, setSortedAlphabetical] = useState(true);

  const handleOnChange: $ElementType<React$ElementConfig<typeof SearchField>, 'onChange'> = ({
    value,
  }) => {
    setInputValue(value);
    setSuggestedOptions(
      value
        ? iconOptions.filter(
            ({ label }) =>
              label.toLowerCase().includes(value.toLowerCase()) || iconHasKeyword(label, value),
          )
        : iconOptions,
    );
  };

  const buildHandleIconClick = (iconName: string) => () => {
    try {
      navigator.clipboard.writeText(iconName);
      setShowToastText(`Icon name ("${iconName}") successfully copied!`);
      setTimeout(() => setShowToastText(), 3000);
    } catch (err) {
      // Not handling error
    }
  };

  const renderIconTiles = () =>
    sortedAlphabetical ? (
      <Flex gap={3} wrap>
        {(suggestedOptions || iconOptions).map(({ label: iconName }) => {
          const filteredIconData = iconCategoryData.icons.find((icon) => icon.name === iconName);

          return (
            <IconTile
              key={iconName}
              iconDescription={filteredIconData?.description ?? ''}
              iconName={iconName}
              onTap={buildHandleIconClick(iconName)}
            />
          );
        })}
      </Flex>
    ) : (
      CATEGORIES.map((category) => {
        const iconsToRenderByCategory = (suggestedOptions || iconOptions).map(
          ({ label: iconName }) => {
            const iconData = findIconByCategory(iconName, category);
            return iconData ? (
              <IconTile
                key={iconName}
                iconDescription={iconData.description ?? ''}
                iconName={iconData.name}
                onTap={buildHandleIconClick(iconData.name)}
              />
            ) : null;
          },
        );
        if (iconsToRenderByCategory.filter(Boolean).length === 0) {
          return null;
        }
        return (
          <Flex key={category} direction="column" gap={4}>
            <Heading accessibilityLevel={2} size="400">
              {category}
            </Heading>
            <Flex gap={3} wrap>
              {iconsToRenderByCategory}
            </Flex>
          </Flex>
        );
      })
    );

  const renderEmptyState = () => (
    <Flex direction="column" gap={3}>
      <Heading color="error" size="400">
        No result found
      </Heading>
      <Text>
        It appears we don&apos;t have an icon that matches your search. Check your spelling or try a
        different search term.
      </Text>
      <Text>
        Need a new icon?{' '}
        <Link display="inlineBlock" href="/team_support/get_help#Slack-channels">
          Reach out to us
        </Link>
        , and we can evaluate your request.
      </Text>
    </Flex>
  );

  return (
    <Page hideSideNav title="Icon library">
      <PageHeader
        description="Use the icon grid to visually search for icons. On click, the icon name will be copied. You can use the search input below to search icons by name, or filter your search by alphabetical or category."
        folderName="icons"
        name="Icon library"
        type="guidelines"
      />

      <Flex direction="column" gap={8} width="100%">
        <Flex alignItems="end" gap={6} wrap>
          <Flex.Item flex="grow" maxWidth={300}>
            <SearchField
              accessibilityClearButtonLabel="Clear search field"
              accessibilityLabel="Search icons by name"
              autoComplete="off"
              id="icon-search-field"
              label="Search icons by name"
              onChange={handleOnChange}
              value={inputValue}
            />
          </Flex.Item>
          <RadioGroup direction="row" id="directionExample" legend="Sort by">
            <RadioGroup.RadioButton
              checked={sortedAlphabetical}
              id="sortAlphabetical"
              label="Alphabetical"
              name="sortOrder"
              onChange={() => setSortedAlphabetical(true)}
              value="alphabetical"
            />
            <RadioGroup.RadioButton
              checked={!sortedAlphabetical}
              id="sortCategory"
              label="Category"
              name="sortOrder"
              onChange={() => setSortedAlphabetical(false)}
              value="category"
            />
          </RadioGroup>
        </Flex>
        <Box>
          <Flex direction="column" gap={8}>
            {suggestedOptions.length === 0 ? renderEmptyState() : renderIconTiles()}
          </Flex>
        </Box>
      </Flex>

      {showToastText && (
        <Layer>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: '50%',
                transform: 'translateX(-50%)',
              },
            }}
            fit
            paddingX={1}
            position="fixed"
          >
            <Toast text={showToastText} />
          </Box>
        </Layer>
      )}
    </Page>
  );
}
