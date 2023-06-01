---
title: Tabs
description: Tabs may be used to navigate between multiple URLs. Tabs are intended as page-level navigation.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/53/2a/58/532a582ec88923c308981698ea921ce7.png" alt="an example of tabs"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - To break up a large collection of content into logical, digestible views.
      - To switch between different, yet related views, such as Updates and Messages.
  </Group>
  <Group>
  <Dont title="When not to use" />
    - When any UI or content above the Tabs is altered upon selection. Use Link instead. 
    - To break up content that is not related to each other or is not on the same hierarchical level. 
    - To filter content. Consider SegmentedControl instead.
  </Group>
</TwoCol>

## Best practices

- Place Tabs directly above the relevant content. 
- Avoid using more than 6 Tabs. Consider using a different component like Sheet.
- Order Tabs by relevance - the first tab should be the most logical starting view.

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/55/7a/d8/557ad8eec26e2cba4281430ac17a4f9b.png" alt="example with concise tab labels"/>
    <Do title="Do" />
    Keep Tab labels short and concise, one or two words.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/1c/07/51/1c075150e78c4e55b403424786d659ab.png" alt="example of only one tab"/>
    <Dont title="Don't" />
    Hide or disable Tabs if that Tab’s content is empty. Additionally, there should always be at least two tabs.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/ce/cd/a3/cecda350757cfb6370705f46b2f64516.png" alt="example of tabs scrolling horizontally"/>
    <Do title="Do" />
    Allow tabs to scroll horizontally.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/fb/a9/a5/fba9a5d63809b6217dc2e76a8121dffc.png" alt="example of tabs with truncated labels"/>
    <Dont title="Don't" />
    Truncate tabs to fit within a view.
  </Group>
</TwoCol>

## Accessibility

People use Android’s accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessbile design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

## Design tokens
<iframe style={{border:0}} width="100%" height="1100" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19415%253A37878%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

## Anatomy
<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19415%253A37718%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Default tabs**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19415%253A38295%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Filled tabs**
</Group>
</TwoCol>

## Variants

### Alignment

Tabs can be aligned to either the start or end point depending on language direction or centered.

1. **Start or end aligned (Default)**
Use if you have more than three tabs. Start or end aligned tabs will scroll horizontally if content is long enough to flow out of the frame. 
2. **Center aligned**
This variant may be used if you have two or three tabs. Center aligned Tabs should not be used if labels are long or if you have more than three Tabs. The center-aligned style of Tabs is used primarily for navigational Tabs and sits in the header of the screen.

<TwoCol>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/55/e2/ad/55e2addac3e74b55e61833a91da185f5.png" alt="start aligned tabs"/>
    **Start or end aligned (Default)**
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/de/a4/0f/dea40fda2ea9af1a06fec7faa719f90f.png" alt="center aligned tabs"/>
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
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19415%253A37796%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Default tabs**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="300" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19415%253A38507%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Filled tabs**
</Group>
</TwoCol>

## Localization
Be sure to localize the tab text. Note that localization can lengthen text by 20 to 30 percent.
<br/>
<ImgContainer src="https://i.pinimg.com/originals/00/a4/ce/00a4cef58fafd51e28808e8a46c4f5b6.png" alt="start aligned tabs"/>

## Animation

By default, Sheet animates in from the bottom of the screen. It animates out when the header close button is pressed, the user swipes down or the user taps outside of the sheet. Visit Material Design for more information on [container motion](https://material.io/design/motion/the-motion-system.html#container-transform).
