// @flow strict
import { type Node } from 'react';
import { SideNavigation } from 'gestalt';
import { useRouter } from 'next/router';
import { type siteIndexType } from './siteIndex.js';
import { useNavigationContext } from './navigationContext.js';

function convertNamesForURL(name) {
  return name.replace(/ - /g, '/').replace(/ /g, '_').replace(/'/g, '').toLowerCase();
}

const useGetSideNavItems = ({ sectionInfo }: {| sectionInfo: siteIndexType |}): Node => {
  const { pathname } = useRouter();
  const { setIsSidebarOpen } = useNavigationContext();

  let nestingLevel = 0;
  const getNavItems = (navItem: siteIndexType, previousSectionName: string) => {
    if (nestingLevel === 0) {
      return (
        <SideNavigation.Section key={`${navItem.sectionName}`} label={navItem.sectionName}>
          {navItem.pages.map((pageInfo, i) => {
            if (typeof pageInfo === 'string') {
              const href = `/${convertNamesForURL(navItem.sectionName)}/${convertNamesForURL(
                pageInfo,
              )}`;
              return (
                <SideNavigation.TopItem
                  active={pathname === href ? 'page' : undefined}
                  label={pageInfo}
                  onClick={() => setIsSidebarOpen?.(false)}
                  key={`${pageInfo}--${i}`}
                  href={href}
                />
              );
            }
            nestingLevel += 1;
            return getNavItems(pageInfo, navItem.sectionName);
          })}
        </SideNavigation.Section>
      );
    }
    if (nestingLevel === 1) {
      return (
        <SideNavigation.Group key={`${navItem.sectionName}`} label={navItem.sectionName}>
          {navItem.pages.map((nestedPage, i) => {
            if (typeof nestedPage === 'string') {
              const href = `/${convertNamesForURL(previousSectionName)}/${convertNamesForURL(
                navItem.sectionName,
              )}/${convertNamesForURL(nestedPage)}`;
              return (
                <SideNavigation.NestedItem
                  active={pathname === href ? 'page' : undefined}
                  label={nestedPage}
                  onClick={() => setIsSidebarOpen?.(false)}
                  key={`${nestedPage}--${i}`}
                  href={href}
                />
              );
            }
            nestingLevel += 1;
            const previousURL = `${previousSectionName}/${navItem.sectionName}`;
            return getNavItems(nestedPage, previousURL);
          })}
        </SideNavigation.Group>
      );
    }
    return (
      <SideNavigation.NestedGroup key={`${navItem.sectionName}`} label={navItem.sectionName}>
        {navItem.pages.map((nestedPage, i) => {
          if (typeof nestedPage === 'string') {
            const href = `/${convertNamesForURL(previousSectionName)}/${convertNamesForURL(
              navItem.sectionName,
            )}/${convertNamesForURL(nestedPage)}`;
            return (
              <SideNavigation.NestedItem
                active={pathname === href ? 'page' : undefined}
                label={nestedPage}
                onClick={() => setIsSidebarOpen?.(false)}
                key={`${nestedPage}--${i}`}
                href={href}
              />
            );
          }
          // no more levels allowed
          return null;
        })}
      </SideNavigation.NestedGroup>
    );
  };

  return getNavItems((sectionInfo: siteIndexType), '');
};

export default useGetSideNavItems;
