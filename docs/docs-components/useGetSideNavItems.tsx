import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { SideNavigation } from 'gestalt';
import { useNavigationContext } from './navigationContext';
import { siteIndexType } from './siteIndex';

function convertNamesForURL(name: string) {
  return name.replace(/ - /g, '/').replace(/ /g, '_').replace(/'/g, '').toLowerCase();
}

const useGetSideNavItems = ({ sectionInfo }: { sectionInfo: siteIndexType }) => {
  const { pathname, query } = useRouter();
  const { setIsSidebarOpen } = useNavigationContext();

  const getNavItems = (
    navItem: siteIndexType,
    previousSectionName: string,
    nestingLevel: number = 0,
  ) => {
    // in nextjs, if it's a dynamic route, the dynamic route id will be passed as part of the query obj
    const { id: pathId } = query;
    const urlPath = pathId ? pathId.join('/') : '';

    const isActiveTab = (href: string) =>
      pathname === href || `/${urlPath}` === href ? 'page' : undefined;

    if (nestingLevel === 0) {
      return (
        <SideNavigation.Section key={`${navItem.sectionName}`} label={navItem.sectionName}>
          {navItem.pages.map((pageInfo) => {
            if (typeof pageInfo === 'string') {
              const href = `/${convertNamesForURL(navItem.sectionName)}/${convertNamesForURL(
                pageInfo,
              )}`;
              return (
                <SideNavigation.TopItem
                  key={pageInfo}
                  active={isActiveTab(href)}
                  href={href}
                  label={pageInfo}
                  onClick={() => setIsSidebarOpen?.(false)}
                />
              );
            }
            return getNavItems(pageInfo, navItem.sectionName, 1);
          })}
        </SideNavigation.Section>
      );
    }
    if (nestingLevel === 1) {
      return (
        <SideNavigation.Group key={`${navItem.sectionName}`} label={navItem.sectionName}>
          {navItem.pages.map((nestedPage) => {
            if (typeof nestedPage === 'string') {
              const href = `/${convertNamesForURL(previousSectionName)}/${convertNamesForURL(
                navItem.sectionName,
              )}/${convertNamesForURL(nestedPage)}`;
              return (
                <SideNavigation.NestedItem
                  key={nestedPage}
                  active={isActiveTab(href)}
                  href={href}
                  label={nestedPage}
                  onClick={() => setIsSidebarOpen?.(false)}
                />
              );
            }
            const previousURL = `${previousSectionName}/${navItem.sectionName}`;
            return getNavItems(nestedPage, previousURL, 2);
          })}
        </SideNavigation.Group>
      );
    }
    return (
      <SideNavigation.NestedGroup key={`${navItem.sectionName}`} label={navItem.sectionName}>
        {navItem.pages.map((nestedPage) => {
          if (typeof nestedPage === 'string') {
            const href = `/${convertNamesForURL(previousSectionName)}/${convertNamesForURL(
              navItem.sectionName,
            )}/${convertNamesForURL(nestedPage)}`;
            return (
              <SideNavigation.NestedItem
                key={nestedPage}
                active={isActiveTab(href)}
                href={href}
                label={nestedPage}
                onClick={() => setIsSidebarOpen?.(false)}
              />
            );
          }
          // no more levels allowed
          return null;
        })}
      </SideNavigation.NestedGroup>
    );
  };

  return getNavItems(sectionInfo as siteIndexType, '');
};

export default useGetSideNavItems;
