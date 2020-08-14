# Frequently Asked Questions

## Gestalt Components Usage

### How can I visualize which components use Gestalt?

Use [Gestalt Usage Visualizer](https://codepen.io/christianv/pen/BxmOBe).

#### Installation

Drag this link: <a href="javascript:(function(){if(!document.getElementById('gestalt-usuage-visualizer')) {var script = document.createElement('script');script.id = 'gestalt-usuage-visualizer';script.src = 'https://unpkg.com/gestalt-usage-visualizer/index.js';document.head.appendChild(script);}})();">Gestalt Usage Visualiser</a> into your bookmarks toolbar.

If you don't see the bookmarks toolbar, go to View and select 'Show Bookmarks Bar'.

#### Usage

Click the link in the bookmark bar.

Red is bad: all places that aren't using gestalt will have a red border around them.

Everything else is (or using inline styles).


### What is a boint?

A boint is a Pinterest specific unit of spacing that is equivalent to 4px. 1 boint = 4px, 2 boints = 8px, etc. 

Gestalt component props such as `margin` and `padding` work with boint units.

```bash
padding  0 .. 12
```

### How can add a new Icon?

If you need an Icon that is not listed on our [Icon docs](https://pinterest.github.io/gestalt/#/Icon) for an experiment, use the ``{{dangerouslySetSvgPath}}` prop on Icon. If the asset is ready, we will happily add the Icon to Gestalt! 

To add it to Gestalt, get a streamlined & optimized version of the SVG not contain strokes / transforms / ...

Do not add property fill, `fill="#767676"`. The property doesn't do anything since we only use the path in from the SVG.

### How do I add Gestalt as a dependency? 
Import exact versions. ^1.37.0 is imprecise and could import v1.38.0 which could affect snapshots from version to version. Check [this resource](https://devhints.io/semver) for hints on the differences.


### How do I import components from Gestalt?

```js
import { Button, Text } from 'gestalt';
```

## Gestalt Components Development

### How do I get access to the Gestalt repo?

The [Gestalt repository](https://github.com/pinterest/gestalt) is public and you don't need special permissions to make pull requests.

### What is Gestalt Teachings and how do I add a video?
[Gestalt Teachings](https://www.youtube.com/playlist?list=PLbmG-F9A233J1ID2Nl-zwfYNnhazHLZzV) is a youtube video playlist containing tips and tricks on how to use Gestalt. Use [this special collaboration link](https://www.youtube.com/playlist?list=PLbmG-F9A233J1ID2Nl-zwfYNnhazHLZzV&jct=cIfcNOunrGwHcEAbFodTthlHYhkvWw) to add your own videos to this list.

## Automated Releases

### How often does Gestalt release a new version? 

Gestalt releases happen on every merge to master. Check the [release log](https://github.com/pinterest/gestalt/releases).

### Do I still need to make manual updates to [CHANGELOG.md](http://changelog.md/)?

No, those updates happen automatically once the PR is merged.

### My Pull Request fails on "Semver / Require Label (pull_request)", how do I fix it?

Nothing you can do to fix it.

A Gestalt Core maintainer will add a semver label (patch release / minor release / major release) when reviewing a PR.

### How do these automated releases work under the hood?

Automated releases use [GitHub actions](https://github.com/features/actions) with the [these release steps](https://github.com/pinterest/gestalt/blob/455e6d3bdc7caad0ca0991d692fb65219eea8353/.github/workflows/release.yml) for every merge on master:

* Fetch semver label for the associated PR (patch / minor / major)
* Check out the repository
* Setup Node.js
* Bump package.json version
* Update CHANGELOG.md file
* Create GitHub release
* Publish to npm
* Update [Gestalt Documentation](https://pinterest.github.io/gestalt/)
