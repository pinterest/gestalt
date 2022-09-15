---
title: Creating and updating pages in Gestalt
description: The below steps detail the process for creating a new page, as well as considerations when moving or deleting a page
fullwidth: true
---

## Adding a new page

To add a new page, follow these 4 steps:


1. Create the page under the correct folder
    1. **Regular** page
        1. Create the new file in `docs/pages`
            1. The folder structure corresponds to the navigation structure of the site. For example, a new web component page should be created under `docs/pages/web`, and a new Tooling page should be found under `docs/pages/get_started/developers/tooling`
                1. The file path (and structure in `docs/docs-components/siteIndex.js`) create the URL path for the page, so both the file location and `siteIndex` structure *must* be accurate to get the expected URL
            2. Pages that do not fall under a main tab, like Roadmap, live at the root of `docs/pages`
    2. **Markdown** Page
        1. Create the file under the correct folder in `docs/markdown`
            1. The folder structure corresponds to the navigation structure of the site. For example, a new iOS component page should be created under `docs/markdown/ios`, and a new Tooling page should be found under `docs/markdown/get_started/developers/tooling`
2. Add the page name to `docs/docs-components/siteIndex.js`
    1. Find the appropriate section within the JSON object
3. Create an accessibility test for the new page in `playwright/accessibility`
    1. Create a file named `[NEW PAGE TITLE].spec.mjs` 
        1. The file name should match the page name
        2. If the page is a duplicate (like Avatar on Web and Avatar on iOS), add a suffix with the platform, like `Avatar_iOS.spec.mjs`
4. Update `docs/docs-components/COMPONENT_DATA.js`
    1. If this is a net new component, you’ll need to add data under the correct array
        1. The options are Building Blocks, General Components, Utilities, Figma-only, and Foundation guidelines. 
            1. This info affects the layout of the Component Overview page
        2. You may also need a new svg to represent this component on the [Overview pages](https://gestalt.pinterest.systems/web/overview). Reach out on Slack if you need assistance with the graphic.
    2. If this is a new page for an existing component, like the Android page for an existing Web component, update the corresponding data for the object that already exists for that component. ([See example](https://github.com/pinterest/gestalt/pull/2334/files#diff-19b5af995282361ea4311af93f9268393d56c1da8964523c5ee74933a1c60de1))


## Moving or Deleting a page

When moving or deleting a page, there are multiple updates needed: 

1. The organization of `docs/docs-components/siteIndex.js`
    1. Make sure the data stays in sync with your change
2. Any URLs within the docs or component pages referencing the page
    1. If you’re moving or deleting a page, update any references to that URL
3. Information in `docs/docs-components/COMPONENT_DATA.js`
    1. Ensure any updates are reflected in the JSON data
4. The associated `spec.mjs` accessibility test
    1. Update the URL or remove the file if deleting a page
5. List of redirects in `docs/redirects.js`
    1. A redirect *must* be added anytime a file is moved to help folks find the new location

