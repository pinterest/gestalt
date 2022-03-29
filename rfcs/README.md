# Gestalt RFCs

Many changes, including bug fixes and documentation improvements can be
implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are "substantial", and we ask that these be put
through a bit of a design process and produce a consensus among the Gestalt team.

The "RFC" (request for comments) process is intended to provide a
consistent and controlled path for new features to enter the design system.

Furthermore, Gestalt's RFC repository is a source of institutional knowledge around Gestalt's decision process and development. Engineers will be able to read the discussion and decision process behind some implementations and patterns found in the system.

## When you need to follow this process

You need to follow this process if you intend to make "substantial"
changes to any of the Gestalt packages or its documentation.

What constitutes a "substantial" change may include the following:

- A new Gestalt building-block component that solves complex library issues (such as [ScrollBoundaryContainer](https://gestalt.pinterest.systems/scrollboundarycontainer) or [Z-Index classes](https://gestalt.pinterest.systems/zindex_classes)) and/or adds new developing patterns to Gestalt users (such as [Flex](https://gestalt.pinterest.systems/flex) or [TapArea](https://gestalt.pinterest.systems/taparea)).
- A new Gestalt utility component (such as [OnLinkNavigationProvider](https://gestalt.pinterest.systems/onlinknavigationprovider) or [useReducedMotion](https://gestalt.pinterest.systems/usereducedmotion)).
- A new feature that creates new API surface area (such as [OnLinkNavigationProvider](https://gestalt.pinterest.systems/onlinknavigationprovider) and `dangerouslyDisableOnNavigation`).
- The introduction of new idiomatic usage, conventions, or patterns (such as [Gestalt design tokens](https://gestalt.pinterest.systems/design_tokens), [boint units](https://gestalt.pinterest.systems/faq#Component-usage), or subcomponents modularity patterns like [Table](https://gestalt.netlify.app/table#Props) or [Dropdown](https://gestalt.netlify.app/dropdown) subcomponents).
- Technology migrations (such as the [migration to Next.js](https://github.com/pinterest/gestalt/pull/1642))

Some changes do not require an RFC:

- Rephrasing, reorganizing or refactoring
- New general components
- Additions that strictly improve objective, numerical quality
  criteria (speedup, better browser support)

If you submit a pull request to implement a new feature without going
through the RFC process, it will be archived.

## How to submit an RFC

1. Create a directory inside this `rfcs` directory. The directory name should begin with the year and month and include a meaningful description, such as `rfcs/2022-03-onInteraction-new-feature`.
2. Copy the [template.md](https://github.com/pinterest/gestalt/tree/master/rfcs/template.md) file from this rfcs directory into your newly created subdirectory (such as `rfcs/2022-03-onInteraction-new-feature/README.md`). Be sure to name your file README.md so it is easily viewable in the GitHub interface.
3. If you want to include images in your RFC, place them in the same directory as the README.md.
4. Fill in the RFC. Please fill in every section in the template with as much detail as possible.
5. Submit a pull request to this repo with all of your files.
6. RFCs are meant to be a discussion, not a statement. You will receive feedback both from the Gestalt team. You should be prepared to update your RFC based on this feedback. The goal is to build consensus on the best way to implement the suggested change.
7. When all feedback has been incorporated, the Gestalt team will determine whether or not to accept the RFC. RFCs that are accepted will be merged directly into this repo; RFCs that are not accepted will have their pull requests closed without merging.

## The RFC life-cycle

Once an RFC is merged into this repo, then the authors may implement it and submit a pull request. Note that the implementation still needs to be reviewed separate from the RFC, so you should expect more feedback and iteration.

If the RFC authors choose not to implement the RFC, then the RFC will be removed from the RFC repository.

Changes to the design during implementation should be reflected by updating the related RFC. The goal is to have RFCs to look back on to understand the motivation and design of shipped Gestalt features.

Finally, When a pull request has implemented an RFC, the RFC should be updated with a link to the PR implementing it.

## Gathering feedback before submitting

It's often helpful to get feedback on your concept before diving into the level of API design detail required for an RFC. You may open an issue on this repo to start a high-level discussion, with the goal of eventually formulating an RFC pull request with the specific implementation design.

**Thanks to the [Ember RFC process](https://github.com/emberjs/rfcs), [ESLint RFC Process](https://github.com/eslint/rfcs/), and [Spectrum RFC Process](https://github.com/adobe/react-spectrum/tree/main/rfcs) and the for the inspiration for Gestalt's RFC process.**
