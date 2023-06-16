---
title: Card.Pins
description: The Boards preview block utilizes two of the Board and Section components to present a collection of imagery that typically represents Card.Boards.
fullwidth: true
---

<ImgContainer src="https://github.com/pinterest/gestalt/assets/96082362/ec0692aa-cc1a-42df-80c9-f0e212100fe4" alt="Example of a Card container with a Card.Boards preview that contains two Card.Boards representations." noPadding color="background-elevation-accent"/>


## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use"/>
- To present multiple entry points into a single destination containing Pins (ex: stream)
- When the user goal is best supported by focusing them on one Pin at a time (ex: watching videos in a related stream, evaluating Pins with a high intent mindset)

</Group>
<Group>
<Dont title="When not to use" />
- When each tap target leads to a different destination (ex: different streams)
- When the goal is to direct Pinners to a landing experience that displays more than one Pin (e.g. a topical Pin feed). 
</Group>
</TwoCol>

## Best practices
<TwoCol>
<Group>
<Do title="Do"/>
- Flex Pin previews to different common aspect ratios so that the best dimensions can be used to preview different media types
- Flex Pin previews to different sizes to support various levels of visual prominence
- Make all images within the preview block equal in size
- Use a single tap target for each preview within the preview block that leads to the same destination

</Group>
<Group>
<Dont title="Don't" />
- Make the entire scrolling preview block a single tap target. Each Pin preview should be an individual tap target.
</Group>
</TwoCol>

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Design tokens
<iframe style={{border:0}} width="100%" height="178" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A76699%26t%3DaliDwdC0C3b2VkAb-1" allowFullScreen></iframe>

## Anatomy

<iframe style={{border:0}} width="100%" height="312" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A76473%26t%3DaliDwdC0C3b2VkAb-1" allowFullScreen></iframe>
*1. Image one / 2. Image two / 3. Image three*

## Variants
The Card.Boards preview block utilizes the [Gestalt Board and Section Figma component](http://pinch.pinadmin.com/section-and-board-component-figma-iOS). The Card.Boards preview block accepts all of Board and Sections variants except for CTAs. Optional elements include: lock icon, plus icon, pretext, Card.Boards name, collaborators and subtext.

## Dark mode
<iframe style={{border:0}} width="100%" height="312" width="800" height="312" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A78570%26t%3DaliDwdC0C3b2VkAb-1" allowfullscreen></iframe>

## Scrolling
<iframe style={{border:0}} width="100%" height="312" width="800" height="312" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D22128%253A76406%26t%3DaliDwdC0C3b2VkAb-1" allowfullscreen></iframe>
