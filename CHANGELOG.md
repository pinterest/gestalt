## [Unreleased]

<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

### Minor

* Masonry: Promotes ExperimentalMasonry to be Masonry. Complete re-write of
  measuring etc. (#46)

### Patch

* Internal: Split docs & integration tests into individual packages (#22)
* Flyout: Update the docs with correct flowtypes (#37)
* Internal: Removes [corkboard](https://yarnpkg.com/en/package/corkboard) from the docs (#41)
* Internal: User prettier for markdown and css (#45)
* Internal: Add script to run watcher & docs build concurrently (#49)
* Docs: Readme update to start docs server (#47)
* Docs: fix github source link (#50)

</details>

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
