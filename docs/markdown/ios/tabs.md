---
title: Tabs
description: Tabs may be used to navigate between multiple URLs. Tabs are intended for page-level navigation.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/28/5e/77/285e77d2e30f2ab48c3e18c464e80f67.png" alt="an example of tabs"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - To break up a large collection of information or pages into logical, digestible views.
      - To switch between different, yet related views, such as Updates and Messages.
  </Group>
  <Group>
  <Dont title="When not to use" />
    - Any UI elements above the Tabs are altered upon selection. Use [Link](/web/link) instead. 
    - To break up chunks of information that aren't related to each other or aren't on the same hierarchical level. 
    - To filter information. Consider [SegmentedControl](/web/segmentedcontrol) instead.
  </Group>
</TwoCol>

## Best practices

- Place Tabs directly above the relevant information.
- Avoid using more than six Tabs. Consider using a different component like [Sheet](/android/sheet).
- Order Tabs by relevance—the first tab should be the most logical starting view.

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/f5/7f/85/f57f85ccb677cca5372f3419feb4d7f1.png" alt="example with concise tab labels"/>
    <Do title="Do" />
    Keep Tab labels short and concise, one or two words.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/34/48/4f/34484faabaf959cac956ff2e85c8cc48.png" alt="example of only one tab"/>
    <Dont title="Don't" />
    Hide or disable Tabs if that Tab is empty. Additionally, there should always be at least two tabs.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/0a/78/0e/0a780ed4af7d051e3cc0858cd6f94c6b.png" alt="example of tabs scrolling horizontally"/>
    <Do title="Do" />
    Allow tabs to scroll horizontally.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/f4/92/6a/f4926a15c54ff1d39165a60a78d77bd6.png" alt="example of tabs with truncated labels"/>
    <Dont title="Don't" />
    Truncate tabs to fit within a view.
  </Group>
</TwoCol>

## Accessibility

People use Apple’s accessibility features, such as reduced transparency, VoiceOver, and increased text size to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Apple’s Human Interface Guidelines and documentation about accessibility for iOS:

[Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/introduction/)
[Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

## Design tokens
<iframe style={{border:0}} width="100%" height="1100" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D36455%253A76944%26mode%3Ddesign%26t%3DcknTIxWUcjXmmy2J-1" allowFullScreen></iframe>

## Anatomy
<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D36455%253A76621%26mode%3Ddesign%26t%3DcknTIxWUcjXmmy2J-1" allowFullScreen></iframe>
**Default tabs**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D36455%253A76697%26mode%3Ddesign%26t%3DcknTIxWUcjXmmy2J-1" allowFullScreen></iframe>
**Filled tabs**
</Group>
</TwoCol>

## Variants

### Alignment

Tabs can be aligned to either the start or end point depending on language direction or centered.

1. **Start or end aligned (Default)**
Use if you have more than three tabs. Start or end-aligned tabs will scroll horizontally if information is long enough to flow out of the frame.
2. **Center aligned**
This variant may be used if you have two or three tabs. Center-aligned Tabs shouldn't be used if labels are long or if you have more than three Tabs. The center-aligned style of Tabs is used primarily for navigational Tabs and sits in the header of the screen.

<TwoCol>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/14/9f/bb/149fbbdaea9804901a88bbadaa086814.png" alt="start aligned tabs"/>
    **Start or end aligned (Default)**
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/a1/6a/d8/a16ad89fc328d3e46411c1fa2682030e.png" alt="center aligned tabs"/>
    **Center aligned**
  </Group>
</TwoCol>

### Style

Tabs can be aligned to either the start or end point depending on language direction or centered.

1. **Underline**
The underline style of Tabs sits primarily in the header of the screen.
2. **Filled (Default)**
This is the default tab style. Use the filled style for any Tabs that sit within a screen.
<br/>
<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D36455%253A76775%26mode%3Ddesign%26t%3DcknTIxWUcjXmmy2J-1" allowFullScreen></iframe>
**Default tabs**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAHcKJDgb7E7YswlgW1wY8E%2FGestalt-for-iOS%3Ftype%3Ddesign%26node-id%3D36455%253A76855%26mode%3Ddesign%26t%3DcknTIxWUcjXmmy2J-1" allowFullScreen></iframe>
**Filled tabs**
</Group>
</TwoCol>

## Localization
Be sure to localize the tab text. Note that localization can lengthen text by 20 to 30%.
<br/>
<ImgContainer src="https://i.pinimg.com/originals/00/a4/ce/00a4cef58fafd51e28808e8a46c4f5b6.png" alt="start aligned tabs"/>
