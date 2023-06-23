---
title: Card.Pins
description: Card.Pins is a preview block used to present a collection of imagery that represent a landing experience of Pins (e.g. feed, stream). There are two preview arrangements (fixed and scrolling), each with its own usage guidelines detailed below.
fullwidth: true
---

## Fixed preview

Card.Pins with a fixed preview communicates that the entire preview area is a tap target. It is used when the goal is to direct Pinners to a single destination (e.g. topical Pin feed) where they can scan a breadth of and/or compare related ideas.

<ImgContainer src="https://github.com/pinterest/gestalt/assets/96082362/ec0692aa-cc1a-42df-80c9-f0e212100fe4" alt="Example of a Card container with a Card.Pins preview that contains two Card.Pins representations." noPadding color="background-elevation-accent"/>

### Fixed: Usage guidelines

<TwoCol>
<Group>
<Do title="When to use"/>
- To recommend a single landing experience containing related Pins (e.g. topical Pin feed, more ideas for your board) to a user based on their engagement, interests, boards, demographic information or other signals

</Group>
<Group>
<Dont title="When not to use" />
- To suggest Pins that are not related or within a defined grouping
- When recommending more than one landing experience (e.g. 2 or more topical Pin feeds)
- When the goal is to direct Pinners to a specific place in a destination (e.g. a slot position within a stream).
</Group>
</TwoCol>

### Fixed: Best practices

<TwoCol>
<Group>
<Do title="Do"/>
- All images should be equal in size, whether 2up, 3up or 4up
- The entire Card.Pins preview block is a single tap target that directs Pinners to a single destination

</Group>
<Group>
<Dont title="Don't" />
- Make each image its own tap target. The entire Card.Pins preview block should be a single tap target.
</Group>
</TwoCol>

For general specifications, refer to the [MontageGrid & MontageRow documentation](https://www.figma.com/file/AHcKJDgb7E7YswlgW1wY8E/Gestalt-for-iOS?node-id=19102%3A71831&t=uAttTYuo18hxKqUw-1).

### Fixed: Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

### Fixed: Design tokens

<iframe style={{border:0}} width="100%" height="178" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D33462%253A75994%26mode%3Ddesign%26t%3DIclHzfbakvSzsqp8-1" allowFullScreen></iframe>

### Fixed: Anatomy

<iframe style={{border:0}} width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A79954%26mode%3Ddesign%26t%3DmAYek1WBSRRnRvq3-1" allowFullScreen></iframe>

### Fixed: Variants

#### 2-up

<iframe style={{border:0}} width="100%" height="360" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19826%253A75261%26mode%3Ddesign%26t%3DmAYek1WBSRRnRvq3-1" allowFullScreen></iframe>

#### 3-up (default)

<iframe style={{border:0}} width="100%" height="360" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A76866%26mode%3Ddesign%26t%3DIclHzfbakvSzsqp8-1" allowFullScreen></iframe>

#### 4-up

<iframe style={{border:0}} width="100%" height="360" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19826%253A75351%26mode%3Ddesign%26t%3DmAYek1WBSRRnRvq3-1" allowFullScreen></iframe>

### Fixed: Dark mode

<iframe style={{border:0}} width="100%" height="312" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A76589%26mode%3Ddesign%26t%3DIclHzfbakvSzsqp8-1" allowFullScreen></iframe>

## Scrolling preview

Card.Pins with a scrolling preview communicates that each preview is an individual tap target that all lead to the same destination (e.g. every preview takes you to a specific slot position within a stream).

Use scrolling preview when the user goal is best supported by focusing them on one Pin at a time.

<ImgContainer src="https://i.pinimg.com/originals/18/43/1e/18431e06763f4b84448cbfc38ea3e8c9.png" alt="Example of a Card container with a scrolling preview." noPadding color="background-elevation-accent"/>

### Scrolling: Usage guidelines

<TwoCol>
<Group>
<Do title="When to use"/>
- To present multiple entry points into a single destination containing Pins (e.g. stream)
- When the user goal is best supported by focusing the user on one Pin at a time (e.g. watching videos in a related stream, evaluating Pins with a high intent mindset)

</Group>
<Group>
<Dont title="When not to use" />
- When each tap target leads to a different destination (e.g. different streams)
- When the goal is to direct Pinners to a landing experience that displays more than one Pin (e.g. a topical Pin feed).
</Group>
</TwoCol>

### Scrolling: Best practices

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

### Scrolling: Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size, to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

### Scrolling: Design tokens

<iframe style={{border:0}} width="100%" height="624" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19801%253A75095%26mode%3Ddesign%26t%3DmAYek1WBSRRnRvq3-1" allowFullScreen></iframe>

### Scrolling: Anatomy

<iframe style={{border:0}} width="100%" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A76473%26mode%3Ddesign%26t%3DmAYek1WBSRRnRvq3-1" allowFullScreen></iframe>
*1. Image one | 2. Image two | 3. Image three | 4. Image four*

### Scrolling: Dark mode

<iframe style={{border:0}} width="100%" height="312" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D19800%253A80068%26mode%3Ddesign%26t%3DmAYek1WBSRRnRvq3-1" allowFullScreen></iframe>
