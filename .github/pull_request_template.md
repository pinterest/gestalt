# Pull Request Instructions

Thanks for creating a PR! 🎉

- Please follow this template and delete items/sections that are not relevant to your changes, _including these instructions_.
- Make sure your [PR title](https://github.com/pinterest/gestalt/#releasing) matches our format: `{ComponentName}: Description (mention platform if relevant)`. If there are changes to multiple components, use `{ComponentName}, {OtherComponentName}: Description (mention platform if relevant)`.
- Each PR needs a [label](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels) indicating which [semantic version](https://semver.org/) should be applied:
  - _Major_: Breaking changes to existing components (e.g. removing a prop, removing a prop value, removing a component).
  - _Minor_: New components, non-breaking changes to existing components (e.g. adding a new prop, adding a new prop value).
  - _Patch_: Bugfixes, internal refactors that don't change the component's API, most dependency upgrades, all docs updates.
- If you're updating a dependency, please also include the `dependencies` label.

## Pull Request Template

### Summary

#### What changed?

At a high level, what changes does this PR introduce?

#### Why?

What is the purpose of this PR? Please include the context around these changes for Future Us. In addition to _what_ is changing, we need to know _why_ these changes are needed. Imagine someone is looking at these changes a year from now and needs to know why they were made.

### Links

- [Jira](https://jira.pinadmin.com/browse/GESTALT-XXXX)
- [TDD](link to Paper doc)
- [Figma](link to Figma file)

### Checklist

- [ ] Added unit and Flow Tests
- [ ] Added documentation + accessibility tests
- [ ] Verified accessibility: keyboard & screen reader interaction
- [ ] Checked dark mode, responsiveness, and right-to-left support
- [ ] Checked stakeholder feedback (e.g. Gestalt designers, relevant feature teams)
