---
title: Sheet
description: Sheets are bottom-anchored overlays that that allow the user to easily return to the previous screen. They are meant for temporary focused tasks. Sheets are the mobile equivalent of the modal or overlay on web.
fullwidth: true
---

<ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/11/ab/a3/11aba3afb1a02f7d604d1bf22424b5ec.png" alt="Example of a sheet receding off the view of the image"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - Performing an optional sub-task within a larger task
      - Presenting help info while maintaining the current page and its context
      - Requesting minimal amounts of information froma user (1-2 fields only)
      - Capturing user’s full attention for something important
  </Group>
  <Group>
    <Dont title="When not to use" />
      - Displaying system errors or notices. Consider a [Callout](/web/callout) instead
      - Any time a separate, designated URL is desired
      - Any action that should not interrupt users from their current work stream
      - On top of another sheet, as this can create usability issues and confusion
  </Group>
</TwoCol>

## Best practices

- Sheets should be triggered by the users action, like tapping on a button.
- Use a sheet for non-immersive content and simple tasks.
- Sheets always sit in front of other UI elements.
<br/>
<TwoCol>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/ce/13/94/ce1394f470a86edaeb29978641c7c6e4.png" alt="a partial sheet with a close button and a grabber to allow for multiple ways to close and collapse"/>
    <Do title="Do" />
    Provide a collapse or a close affordance&mdash;multiple if possible. This could include an X, back arrow, grabber or close button.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/70/95/9b/70959b4f5d631bcbe014135dbeaf661d.png" alt="a partial sheet with a button in the top right corner of the header"/>
    <Dont title="Don't" />
    Include Buttons in the header of Sheet as this can lead to sizing and internationalization problems.
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/5a/7b/1c/5a7b1c7de2a285aaabfeba183b7ded6c.png" alt="a partial sheet with a grabber to help resize"/>
    <Do title="Do" />Utilize a grabber for Partial sheets that are able to be resized.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/66/b4/aa/66b4aa9ed823011e68c640174f62e2f2.png" alt="a full sheet with rounded corners"/>
    <Dont title="Don't" />
    Round the corners of full sheets. Only Partial and Action sheets should have rounded corners.
  </Group>
</TwoCol>

## Accessibility

People use Android’s accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their device. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
- [Accessible development on Android](hhttps://developer.android.com/guide/topics/ui/accessibility)

## Design tokens
<iframe style={{border:0}} width="100%" height="940" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A34356%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

## Anatomy
<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A35498%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Full sheet**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A34240%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Partial sheet**
</Group>
</TwoCol>

## Variants

### Size

Sheets are available in two sizes.

1. **Partial sheet**
   Partial sheet can be any height from 50% to 90% of the viewport. They are used when content on the sheet relates to the layer behind, therefore a background wash is optional. They are dismissed by swiping down or tapping outside of the sheet area.
2. **Full sheet**
   Full sheet is always the full height of the viewport. They need to be dismissed to interact with underlying content.

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19415%253A35799%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Partial sheet**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A34025%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Full sheet**
</Group>
</TwoCol>

### Footer

Sheet footers are optional for both partial and full sheets.

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20848%253A47234%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Full sheet**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19415%253A36388%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Partial sheet**
</Group>
</TwoCol>

### Navigation

Sheets can utilize several navigation actions.

1. **Close**
   To close a sheet, use an icon button in the top left corner with the “close” icon.
2. **Back**
   To return to a previous screen, use an icon button in the top left corner with an “arrow-back” icon.

3. **Button**
   An inline Button can be used for a variety of purposes, back, close, next, save, etc.

4. **Grabber**
   A Grabber is a short gray line at the top of the sheet that tells the user that the sheet can be collapsed or expanded.
5. **Outside click**
   For the Partial Sheet and Action Sheet the user may be able to tap outside of the sheet to exit.

## Color
<iframe style={{border:0}} width="100%" height="600" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A35930%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

## Localization
Be sure to localize the header, body content and any footer items. Note that localization can lengthen text by 20 to 30 percent.
<br/>
<ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/d3/3d/f0/d33df0c4e7fcfa4847785dfd23602e42.png" alt="Example of a sheet receding off the view of the image"/>

## Animation
By default, Sheet animates in from the bottom of the screen. It animates out when the header close button is pressed, the user swipes down or the user taps outside of the sheet. Visit Material Design for more information on [container motion](https://material.io/design/motion/the-motion-system.html#container-transform).
