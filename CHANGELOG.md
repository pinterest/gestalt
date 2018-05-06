## [Unreleased]

<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

### Minor

### Patch

* Internal: update `yarn.lock` (#152)
* Docs: include images in repo (#151)

</details>

## 0.68.0 (May 3, 2018)

### Minor

* Button / SearchField / SegmentedControl / SelectList / Tabs / TextField: consistent sizing + improve Windows compatibility (#148)
* Icon: Add new prop to Icon -- dangerouslySetSvgPath (#142)

## 0.67.0 (April 25, 2018)

### Minor

* Flyout: make IE11 compatible (#138)
* Icon: Add new GIF icon (#143)

### Patch

* Box: Fixed negative margins for Box marginStart and marginEnd
* Docs: Add a link to the sandbox

## 0.66.0 (April 24, 2018)

### Minor

* Box: Added right to left language aware marginStart & marginEnd (#122)

### Patch

* Switch: Disallow width shrinking in flex layouts
* Masonry: Removed the unused "serverRender" prop
* Docs: Updated Box docs to include marginStart and marginEnd

## 0.65.0 (April 16, 2018)

### Minor

* Link: Remove duplicate CSS declaration (#118)
* Pulsar: Fix default prop value for size to match new design (#126)

### Patch

* Docs: Updated Masonry "comp" definition to be more descriptive
* Docs: Updated Pulsar docs to use new default size
* Internal: Added some header comments to internal components/utils
* Internal: Fixed a subtle bug in throttle that would cause longer than intended delays
* Masonry: Fixed a timing bug where Masonry's handleResize could be called after unmount
* Masonry: Added a debounce method and moved over some Masonry methods to use it

## 0.64.0 (April 12, 2018)

### Minor

* Icon: 4 new icons related to analytic stats (#105)
* GroupAvatar: Fix when there are no collaborators (#112)
* Flyout: Fix positioning during resize (#111)
* Modal: Update heading size + fix docs (#114)
* Pulsar: New blue ring design, size change from 96 to 136px (#115)
* Icon: 1 icon (circle-arrow-down) for search (#119)

### Patch

* Docs: Add live docs to TextField / TextArea (#116)
* Internal: Fix navigation to allow opening in new tabs (#120)

## 0.63.0 (March 26, 2018)

### Minor

* Masonry: Promotes ExperimentalMasonry to be Masonry. Complete re-write of
  measuring etc. (#101)
* Internal: Gestalt now is React 16.2.0 compatible. (#101)

## 0.62.1 (March 22, 2018)

### Patch

* Internal: Fix publish script to work for new Gestalt directory structure (#94)
* Heading / Text / SegmentedControl: Fix flow types when truncation is enabled (#98)

## 0.62.0 (March 21, 2018)

### Minor

* Heading / Text / SegmentedControl: Add `title` when `truncate` is set (#82)

### Patch

* Docs: Masonry locally on port `3000` + update the `README` with the latest commands (#89)
* Internal: No downtime when releasing the docs (#97)

## 0.61.0 (March 20, 2018)

### Minor

* Image: Don't show `alt` text when loading the image in FireFox. (#80)(#84)
* Tabs: Update the background color to be transparent for unselected tabs (#79)

### Patch

* Docs: Add live docs to Toast (#87)
* Internal: Convert `BrowserRouter` to `HashRouter` - fixes directly going to a component (#88)
* Docs: Add live docs to SegmentedControl (#90)

## 0.60.0 (March 13, 2018)

### Minor

* Masonry: Revert promotion of ExperimentalMasonry to be Masonry.
* Internal: Revert React 16 support

## 0.59.0 (March 13, 2018)

### Minor

* Masonry: Promotes ExperimentalMasonry to be Masonry. Complete re-write of
  measuring etc. (#46)
* Sticky: Fallback to position relative in IE11 (#51)
* Internal: Gestalt now is React 16.2.0 compatible (#53)
* SelectList: Hardcode 40px height for consistency (#57)

### Patch

* Internal: Split docs & integration tests into individual packages (#22)
* Flyout: Update the docs with correct flowtypes (#37)
* Internal: Removes [corkboard](https://yarnpkg.com/en/package/corkboard) from the docs (#41)
* Internal: User prettier for markdown and css (#45)
* Internal: Add script to run watcher & docs build concurrently (#49)
* Docs: Readme update to start docs server (#47)
* Docs: fix github source link (#50)
* Internal: IE11 fixes: fix images in docs / fix scrollbar always showing on proptable (#51)
* Docs: Use [create-react-app](https://github.com/facebook/create-react-app) to build and run the docs (#42)
* Docs: Add live docs for Tooltip (#63)
* Docs: Add live docs to Tabs (#65)
* Docs: Add live docs to Spinner (#66)
* Docs: Add live docs to SelectList (#69)
* Flow: Update the Flow typing for `children` prop to be up to date with Flow version (#70)
* ErrorFlyout / Toast / Tooltip: Add missing React proptyping to components (#73)
* Flow: Upgrade flow-bin to version 0.66.0 (#74)

## [0.58.0] (Feb 26, 2018)

### Minor

* Card: Adds an extra "image" property to help separate content (#19)
* GroupAvatar: Update sizes to be in line with other components (#30)
* Touchable: Adds support for `fullHeight` prop (#31)
* Toast: Fix Safari 9 thumbnail/text overlap (#33)

### Patch

* GroupAvatar: Fix text sizes for 1 collaborator (#32)
* Internal: Adds [Danger](http://danger.systems/js/) to pull requests. (#27)
* TextField: Remove duplicate logic opening the error flyout (#34)
* Internal: Re-exports flowtypes (#35)

## [0.57.1] (Feb 22, 2018)

### Patch

* Internal: Fix docs (StateRecorder) + run development mode locally + fix propType error #25

## [0.57.0] (Feb 22, 2018)

## Minor

* Sticky: Add zIndex support (#21)
* SearchField: Add custom `onBlur` prop / Rename syntheticEvent => event / Use stricter flowtype on event to remove if check (#17)
* Flyout: Allow for custom width (#16)
* ExperimentalMasonry: Reference measurementStore from props instead of instance (#14)

## Patch

* Docs: Netlify: Live preview with every PR (#18)
* Docs: Updates Heading, Image, Label & Text to use Example (#10)
* Docs: Container / ErrorFlyout / IconButton / Label / Pog / SearchField: add live docs (#12)
* Docs: Flyout / Mask / Pulsar: add live docs (#15)
* Docs: Readme updates (#3) (#8)
* Docs: Publish docs when releasing (#1)
* Docs: Fixes syntax errors in a few live examples (#6)
* Docs: Move .corkboard/ to docs/ and isolate components (#9)
* Docs: Removes function syntax from cards (#7)
* Build: Fixes repo url in docs build script (#4)
* Internal: Webpack 3 upgrade (#11)

[0.57.1]: https://deploy-preview-26--gestalt.netlify.com/
[0.57.0]: https://deploy-preview-24--gestalt.netlify.com/
