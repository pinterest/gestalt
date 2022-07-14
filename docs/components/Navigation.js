// @flow strict
import { type Node } from 'react';
import { Box, SideNavigation } from 'gestalt';
import { useRouter } from 'next/router';
import sidebarIndex from './sidebarIndex.js';
import { useNavigationContext } from './navigationContext.js';
import SidebarCategorizationButton from './buttons/SidebarCategorizationButton.js';

export const MIN_NAV_WIDTH_PX = 280;

function getAlphabetizedComponents() {
  return Array.from(
    new Set(
      sidebarIndex
        .map((section) => section.pages)
        .flat()
        .sort(),
    ),
  );
}

function DocsSideNavigation({ border }: {| border?: boolean |}): Node {
  const { sidebarOrganisedBy, setSidebarOrganizedBy } = useNavigationContext();
  const router = useRouter();

  return (
    <SideNavigation
      accessibilityLabel="Page navigation"
      showBorder={border}
      header={
        <nav label="Sidenav sort">
          <SidebarCategorizationButton
            onClick={() =>
              setSidebarOrganizedBy(
                sidebarOrganisedBy === 'categorized' ? 'alphabetical' : 'categorized',
              )
            }
            sidebarOrganisedBy={sidebarOrganisedBy}
          />
        </nav>
      }
    >
      {sidebarOrganisedBy === 'categorized'
        ? sidebarIndex.map((section, idx) => (
            <SideNavigation.Section
              key={`${section.sectionName}--${idx}`}
              label={section.sectionName}
            >
              {section.pages.map((componentName, i) => {
                const href = `/${componentName.replace(/ /g, '_').replace(/'/g, '').toLowerCase()}`;
                return (
                  <SideNavigation.TopItem
                    active={router.pathname === href ? 'page' : undefined}
                    label={componentName}
                    onClick={() => {}}
                    key={`${componentName}--${i}`}
                    href={href}
                  />
                );
              })}
            </SideNavigation.Section>
          ))
        : getAlphabetizedComponents().map((componentName, i) => {
            const href = `/${componentName.replace(/ /g, '_').replace(/'/g, '').toLowerCase()}`;

            return (
              <SideNavigation.TopItem
                active={router.pathname === href ? 'page' : undefined}
                label={componentName}
                key={`${sidebarOrganisedBy}-${i}`}
                href={href}
              />
            );
          })}
    </SideNavigation>
  );
}

export default function Navigation(): Node {
  const { isSidebarOpen } = useNavigationContext();

  return isSidebarOpen ? (
    <Box height={350} overflow="scroll" display="block" mdDisplay="none" paddingY={2} paddingX={4}>
      <DocsSideNavigation />
    </Box>
  ) : (
    <Box
      display="none"
      mdDisplay="block"
      position="fixed"
      overflow="auto"
      maxHeight="calc(100% - 100px)"
      minWidth={MIN_NAV_WIDTH_PX}
      marginTop={2}
    >
      <DocsSideNavigation border />
    </Box>
  );
}
