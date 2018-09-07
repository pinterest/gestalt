## [Unreleased]

<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

### Minor

### Patch

</details>

## 0.80.0 (September 7, 2018)

### Minor

- Internal: Update flow-typed def for jest to match jest version (#346)
- Masonry: new MasonryInfiniteBeta and MasonryBeta (#329)

## 0.79.2 (September 5, 2018)

### Minor

- Button: Fix transparent button on blue background (#316)
- Flyout: Add new prop `shouldFocus` to override focus on open behavior. *Has codemod* (#325)
- Icon: Add camera roll icon (#317)
- Video: Make a11y label props required in Video component (#321)
- Internal: Add in greenkeeper-lockfile for auto updates (#327)
- Masonry: Remove mention of server rendering (#342)

### Patch

- Modal: set content width to 100% to prevent overflow bug in IE (#315)
- Modal: change Box width from using column to width property (#338)

## 0.79.1 (August 24, 2018)

### Patch

- Masonry: Add missing defaultProps and handleResize (#313)

## 0.79.0 (August 22, 2018)

### Minor

- Masonry: MasonryInfinite for infinite fetching (#307)

## 0.78.0 (August 20, 2018)

### Minor

- Internal: Turn on sketchy-number flow lint rules as an error (#293)
- TextArea: Add an onKeyDown prop (#303)
- TextField: Add an onKeyDown prop (#303)
- Internal: Add flow types to `Box` transform functors (#299)
- Icon: Fix cog icon rotation (#308)

## 0.77.0 (July 30, 2018)

### Minor

- Checkbox: Add error prop and styling (#287)
- Internal: Bump flow version to 0.77.0 (#289)
- Internal: Add flow typed definitions for node-fetch and filesize (#290)
- Collage: Add new Collage component to Gestalt (#291)
- Internal: Turn on all non-sketchy flow lint rules as errors (#292)
- Masonry: Add configurable virtual bounds (#294)

## 0.76.1 (July 17, 2018)

### Patch

- Masonry: Fix React prop typing for `layout` (#284)

## 0.76.0 (July 17, 2018)

### Minor

- Icon: reduce filesize of each icon with 40% + add new icons (#269)
- Colors: Darken gray and darkGray so they're AA accessible at smaller sizes (#276)
- Video: Add a gradient overlay on the control bar (#27)
- Layer: Layer component is now exported for use and has documentation
- TextArea: Add a hasError prop (#280)
- Icon: Add new `megaphone` icon (#281)

### Patch

- Icon: Fix `envelope` icon + add `gmail` (#270)
- Internal: Fix release script for gh-pages (#266)
- Flow: Bump Flow to version 0.75.0 in gestalt (#268)
- Internal: Bump all eslint plugin packages in prep for eslint5 (#273)

## 0.75.0 (Jun 27, 2018)

### Minor

- Box: Add `visuallyHidden` as a display option (#262)
- Icon: Add one new icon (globe-checked) for claimed website (#264)

### Patch

- Docs: Fix "fit" labels in Image docs example (#259)
- Internal: Set up pre-commit hooks for linting and testing (#258)
- Internal: Fix peer dependency issues with stylint and jest-pupeteer (#260)
- Internal: Add eslint-import/no-relative-parent-imports rule (#261)

## 0.74.0 (Jun 13, 2018)

### Minor

- ErrorFlyout: Deprecate component and remove from Gestalt (#251)

### Patch

- Danger: Separate danger rules out into separate files (#253)
- Modal: Fix issue with outside click error bubbling (#254)

## 0.73.0 (Jun 8, 2018)

### Minor

- Masonry: Makes Masonry React Async compatible (#227)
- SegmentedControl: Change flow type of `items` to `React.Node` (#230)
- Video: Add jsdom browser specific tests (#205)
- Flyout: Merge ErrorFlyout abilities into Flyout (#242)
- Flyout: Support blue Flyouts (#249)
- Card: Make Card explicitely use box-sizing: content-box (#243)
- GroupAvatar: Text sizes are consistent with Avatar and `size` prop is now optional. (#244)
- Video: Move initial video setup calls to componentDidMount (#245)

### Patch

- Internal: add better basic test coverage (#231)
- Modal: Refactor internals and remove responsive behavior (#218)
- Internal: update to jsdom only tests (#232)
- Internal: Upgrade to Jest 23 (#233)
- Internal: Upgrade to Stylelint 9.2.1 (#235)
- Avatar/GroupAvatar: Add additional tests for 100% coverage (#236)
- Avatar: fix error when name is falsey (#248)
- Button/Icon: Add additional tests for 100% coverage (#237)
- Flyout/SegmentedControl: Add additional tests for 100% coverage (#238)
- Touchable: Add additional tests for 100% coverage (#239)
- Internal: Add Codecov badge to README (#241)

## 0.72.0 (May 30, 2018)

### Minor

- Video: Added new `onSeek` callback prop to `Video` component (#209)
- Video: Added new `onReady` callback prop to `Video` component (#210)
- Internal: Remove dead example code from docs (#211)
- Internal: Fix react router dependencies (#212)
- Internal: Fix package.json dependency locations (#213)
- Flow: Fix Flow errors in the `docs/` directory (#214)
- Flow: Fix remaining errors in the `docs/` directory and enable Flow (#215)
- Docs: Fix indentation on gestalt docs code examples (#219)
- Docs: Fix broken Link component in docs app (#220)
- SelectList: Makes SelectList React Async compatible (#221)
- TextArea: Makes TextArea React Async compatible (#222)
- TextField: Makes TextField React Async compatible (#223)
- ScrollContainer: Makes ScrollContainer React Async compatible (#224)
- Video: Fix Video playback on SSR if playing is true on first mount (#225)

## 0.71.0 (May 23, 2018)

### Minor

- Drop support for React 15 and bump React 16 version (#168)
- Colors: Update blue color (#193)
- Video: Fix background color for fullscreen video playback (#198)
- Internal: Refactor Modal docs to kill StateRecorder (#199)
- Internal: Add eslint-plugin-eslint-comments with recommended settings (#200)
- Video: Makes `aspectRatio` a required prop for `Video` (#201)
- Video: Pass events through to callback functions (#203)
- Touchable: Add event targets to Flow typing for callbacks (#204)
- Video: Add new `onEnded` prop for media end event (#207)

### Patch

- Internal: Add code coverage to PRs (#185)
- Internal: Internal: Convert ghostjs to puppeteer (#182)
- Internal: Update Jest and use multi-project runner (#158)
- Internal: Fix import path for boxperf script (#188)
- Internal: Turn on eslint-plugin-import rules already being followed (#189)
- Docs: Add live docs to Letterbox (#190)
- Docs: Move CardPage rendering into the Route render prop (#191)
- Internal: Turn on all react recommended linters (#192)
- Internal: Merge jest-pupeteer eslint file into main one (#193)
- Docs: Rewrite Column doc to remove scope prop from Example (#196)
- Video: Fix broken equality check for Video `src` prop (#202)
- Internal: Move stylelint config to separate file (#206)

## 0.70.0 (May 15, 2018)

### Minor

- Avatar / GroupAvatar: make outline configurable(#173)
- Masonry: Update non-virtualized Masonry to render all items regardless of the window
- ExperimentalMasonry: remove component (#183)
- Internal: Add flow-typed files for third party packages (#174)
- Internal: Remove unused linter suppressions (#180)
- Internal: Add eslint-plugin-jest with recommended settings (#181)
- Internal: Add Flow type checking to Jest test files (#184)
- Video: Better existing callbacks, new playback rate prop, new loading callback (#174)
- Internal: Turn the [import/first](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md) rule back on (#186)

## 0.69.0 (May 10, 2018)

### Minor

- Sticky: Expand threshold options to take string values (#166)
- Avatar: Fall back to default letter if image does not load (#156)
- Video: Add new Video component to Gestalt (#150)
- Video: Add `aspectRatio` prop to Video and hide fullscreen on unsupported browsers (#171)

### Patch

- Internal: Add bundle size impact reporting (#146)
- Pulsar: Updated styles to use border box so pulsar doesn't extend out of container div (#169)
- Docs: Fix home link (#170)

## 0.68.1 (May 8, 2018)

### Patch

- Masonry: Don't pass Infinity as style value (#163)
- Internal: Generate stats file during build (#160)
- Flow: Upgrade flow-bin to version 0.71.0 (#155)
- Internal: update `yarn.lock` (#152)
- Docs: include images in repo (#151)
- Docs: updated design (#154)

## 0.68.0 (May 3, 2018)

### Minor

- Button / SearchField / SegmentedControl / SelectList / Tabs / TextField: consistent sizing + improve Windows compatibility (#148)
- Icon: Add new prop to Icon -- dangerouslySetSvgPath (#142)

## 0.67.0 (April 25, 2018)

### Minor

- Flyout: make IE11 compatible (#138)
- Icon: Add new GIF icon (#143)

### Patch

- Box: Fixed negative margins for Box marginStart and marginEnd
- Docs: Add a link to the sandbox

## 0.66.0 (April 24, 2018)

### Minor

- Box: Added right to left language aware marginStart & marginEnd (#122)

### Patch

- Switch: Disallow width shrinking in flex layouts
- Masonry: Removed the unused "serverRender" prop
- Docs: Updated Box docs to include marginStart and marginEnd

## 0.65.0 (April 16, 2018)

### Minor

- Link: Remove duplicate CSS declaration (#118)
- Pulsar: Fix default prop value for size to match new design (#126)

### Patch

- Docs: Updated Masonry "comp" definition to be more descriptive
- Docs: Updated Pulsar docs to use new default size
- Internal: Added some header comments to internal components/utils
- Internal: Fixed a subtle bug in throttle that would cause longer than intended delays
- Masonry: Fixed a timing bug where Masonry's handleResize could be called after unmount
- Masonry: Added a debounce method and moved over some Masonry methods to use it

## 0.64.0 (April 12, 2018)

### Minor

- Icon: 4 new icons related to analytic stats (#105)
- GroupAvatar: Fix when there are no collaborators (#112)
- Flyout: Fix positioning during resize (#111)
- Modal: Update heading size + fix docs (#114)
- Pulsar: New blue ring design, size change from 96 to 136px (#115)
- Icon: 1 icon (circle-arrow-down) for search (#119)

### Patch

- Docs: Add live docs to TextField / TextArea (#116)
- Internal: Fix navigation to allow opening in new tabs (#120)

## 0.63.0 (March 26, 2018)

### Minor

- Masonry: Promotes ExperimentalMasonry to be Masonry. Complete re-write of
  measuring etc. (#101)
- Internal: Gestalt now is React 16.2.0 compatible. (#101)

## 0.62.1 (March 22, 2018)

### Patch

- Internal: Fix publish script to work for new Gestalt directory structure (#94)
- Heading / Text / SegmentedControl: Fix flow types when truncation is enabled (#98)

## 0.62.0 (March 21, 2018)

### Minor

- Heading / Text / SegmentedControl: Add `title` when `truncate` is set (#82)

### Patch

- Docs: Masonry locally on port `3000` + update the `README` with the latest commands (#89)
- Internal: No downtime when releasing the docs (#97)

## 0.61.0 (March 20, 2018)

### Minor

- Image: Don't show `alt` text when loading the image in FireFox. (#80)(#84)
- Tabs: Update the background color to be transparent for unselected tabs (#79)

### Patch

- Docs: Add live docs to Toast (#87)
- Internal: Convert `BrowserRouter` to `HashRouter` - fixes directly going to a component (#88)
- Docs: Add live docs to SegmentedControl (#90)

## 0.60.0 (March 13, 2018)

### Minor

- Masonry: Revert promotion of ExperimentalMasonry to be Masonry.
- Internal: Revert React 16 support

## 0.59.0 (March 13, 2018)

### Minor

- Masonry: Promotes ExperimentalMasonry to be Masonry. Complete re-write of
  measuring etc. (#46)
- Sticky: Fallback to position relative in IE11 (#51)
- Internal: Gestalt now is React 16.2.0 compatible (#53)
- SelectList: Hardcode 40px height for consistency (#57)

### Patch

- Internal: Split docs & integration tests into individual packages (#22)
- Flyout: Update the docs with correct flowtypes (#37)
- Internal: Removes [corkboard](https://yarnpkg.com/en/package/corkboard) from the docs (#41)
- Internal: User prettier for markdown and css (#45)
- Internal: Add script to run watcher & docs build concurrently (#49)
- Docs: Readme update to start docs server (#47)
- Docs: fix github source link (#50)
- Internal: IE11 fixes: fix images in docs / fix scrollbar always showing on proptable (#51)
- Docs: Use [create-react-app](https://github.com/facebook/create-react-app) to build and run the docs (#42)
- Docs: Add live docs for Tooltip (#63)
- Docs: Add live docs to Tabs (#65)
- Docs: Add live docs to Spinner (#66)
- Docs: Add live docs to SelectList (#69)
- Flow: Update the Flow typing for `children` prop to be up to date with Flow version (#70)
- ErrorFlyout / Toast / Tooltip: Add missing React proptyping to components (#73)
- Flow: Upgrade flow-bin to version 0.66.0 (#74)

## [0.58.0] (Feb 26, 2018)

### Minor

- Card: Adds an extra "image" property to help separate content (#19)
- GroupAvatar: Update sizes to be in line with other components (#30)
- Touchable: Adds support for `fullHeight` prop (#31)
- Toast: Fix Safari 9 thumbnail/text overlap (#33)

### Patch

- GroupAvatar: Fix text sizes for 1 collaborator (#32)
- Internal: Adds [Danger](http://danger.systems/js/) to pull requests. (#27)
- TextField: Remove duplicate logic opening the error flyout (#34)
- Internal: Re-exports flowtypes (#35)

## [0.57.1] (Feb 22, 2018)

### Patch

- Internal: Fix docs (StateRecorder) + run development mode locally + fix propType error #25

## [0.57.0] (Feb 22, 2018)

## Minor

- Sticky: Add zIndex support (#21)
- SearchField: Add custom `onBlur` prop / Rename syntheticEvent => event / Use stricter flowtype on event to remove if check (#17)
- Flyout: Allow for custom width (#16)
- ExperimentalMasonry: Reference measurementStore from props instead of instance (#14)

## Patch

- Docs: Netlify: Live preview with every PR (#18)
- Docs: Updates Heading, Image, Label & Text to use Example (#10)
- Docs: Container / ErrorFlyout / IconButton / Label / Pog / SearchField: add live docs (#12)
- Docs: Flyout / Mask / Pulsar: add live docs (#15)
- Docs: Readme updates (#3) (#8)
- Docs: Publish docs when releasing (#1)
- Docs: Fixes syntax errors in a few live examples (#6)
- Docs: Move .corkboard/ to docs/ and isolate components (#9)
- Docs: Removes function syntax from cards (#7)
- Build: Fixes repo url in docs build script (#4)
- Internal: Webpack 3 upgrade (#11)

[0.57.1]: https://deploy-preview-26--gestalt.netlify.com/
[0.57.0]: https://deploy-preview-24--gestalt.netlify.com/
