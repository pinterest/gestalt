// @flow strict
import { type Node } from 'react';
import { SideNavigation } from 'gestalt';
import { useRouter } from 'next/router';

function convertNamesForURL(name) {
  return name.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
}

const useGetSideNavItems = (sectionInfo: Node): $ReadOnlyArray<Node> => {
  const router = useRouter();

  let nestingLevel = 0;
  const getNavItems = (navItem, previousSectionName) => {
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
                  active={router.pathname === href ? 'page' : undefined}
                  label={pageInfo}
                  onClick={() => {}}
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
          {navItem.pages.map((nestedPage, j) => {
            if (typeof nestedPage === 'string') {
              const href = `/${convertNamesForURL(previousSectionName)}/${convertNamesForURL(
                navItem.sectionName,
              )}/${convertNamesForURL(nestedPage)}`;
              return (
                <SideNavigation.NestedItem
                  active={router.pathname === href ? 'page' : undefined}
                  label={nestedPage}
                  onClick={() => {}}
                  key={`${nestedPage}--${j}`}
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
        {navItem.pages.map((nestedPage, j) => {
          if (typeof nestedPage === 'string') {
            const href = `/${convertNamesForURL(previousSectionName)}/${convertNamesForURL(
              navItem.sectionName,
            )}/${convertNamesForURL(nestedPage)}`;
            return (
              <SideNavigation.NestedItem
                active={router.pathname === href ? 'page' : undefined}
                label={nestedPage}
                onClick={() => {}}
                key={`${nestedPage}--${j}`}
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

  return getNavItems(sectionInfo, '');
};

export default useGetSideNavItems;
