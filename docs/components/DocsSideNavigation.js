// @flow strict
import { type Node } from 'react';
import { SideNavigation } from 'gestalt';
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

export default function DocsSideNavigation({ border }: {| border?: boolean |}): Node {
  const { sidebarOrganisedBy, setSidebarOrganizedBy, setIsSidebarOpen } = useNavigationContext();

  const router = useRouter();

  const closeSideNavigation = () => setIsSidebarOpen(false);

  return (
    <SideNavigation
      accessibilityLabel="Page navigation"
      showBorder={border}
      title="Menu"
      dismissButton={{
        onDismiss: closeSideNavigation,
        tooltip: {
          text: 'Close navigation',
        },
      }}
      header={
        <SidebarCategorizationButton
          onClick={() =>
            setSidebarOrganizedBy(
              sidebarOrganisedBy === 'categorized' ? 'alphabetical' : 'categorized',
            )
          }
          sidebarOrganisedBy={sidebarOrganisedBy}
        />
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
                    onClick={closeSideNavigation}
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
                onClick={closeSideNavigation}
                key={`${sidebarOrganisedBy}-${i}`}
                href={href}
              />
            );
          })}
    </SideNavigation>
  );
}
