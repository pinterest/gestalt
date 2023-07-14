---
title: Sheet
description: Sheets are bottom-anchored overlays that that allow the user to easily return to the previous screen. They are meant for temporary focused tasks. Sheets are the mobile equivalent of the modal or overlay on web.
fullwidth: true
---

<ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/fd/6e/db/fd6edb6190b3b20a78ceff1ea7c799c4.png" alt="Example of a sheet receding off the view of the image"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />
      - Performing an optional sub-task within a larger task
      - Presenting help info while maintaining the current page and its context
      - Requesting minimal amounts of information from a user (1-2 fields only)
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
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/30/a6/ad/30a6ad96aca8c75257fa114322da9695.png" alt="a partial sheet with a close button and a grabber to allow for multiple ways to close and collapse"/>
    <Do title="Do" />
    Provide a collapse or a close affordance&mdash;multiple if possible. This could include an X, back arrow, grabber or close button.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/90/a5/20/90a520154834ee4d9a1eea0b6dd9ed20.png" alt="a partial sheet with a button in the top right corner of the header"/>
    <Dont title="Don't" />
    Include Buttons in the header of Sheet as this can lead to sizing and internationalization problems.
  </Group>
</TwoCol>

<TwoCol>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/78/09/18/7809189c7e2b229302f9325ca245e5d7.png" alt="a partial sheet with a grabber to help resize"/>
    <Do title="Do" />Utilize a grabber for Partial sheets that are able to be resized.
  </Group>
  <Group>
    <ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/7e/67/ab/7e67ab782d7cfc7441a7d790ce1c9924.png" alt="a full sheet with rounded corners"/>
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
</Group>

<Group>
**Full sheet**
1. Sheet container
2. Close icon button
3. Header/Sheet title
4. Navigation icon button or button
5. Composable content area 
6. Composable footer
</Group>
</TwoCol>

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A34240%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
</Group>
<Group>
**Partial sheet**
1. Sheet container
2. Grabber
3. Close icon button
4. Header/Sheet title
5. Navigation icon button or button
6. Composable content area 
7. Composable footer
8. (Optional) Scrim wash
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
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A34025%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Partial sheet**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19415%253A35799%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Full sheet**
</Group>
</TwoCol>

### Footer

Sheet footers are optional for both partial and full sheets.

<TwoCol>
<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D20848%253A47234%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Partial sheet**
</Group>

<Group>
<iframe style={{border:0}} width="100%" height="500" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19415%253A36388%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>
**Full sheet**
</Group>
</TwoCol>

### With wash

The Partial Sheet may be used with an optional background wash. Full sheet does not use a wash.
<br/>
<ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/69/ae/8d/69ae8db0839d832bbabd09f1265a0ac3.png" alt="Example of a sheet receding off the view of the image"/>
<br/>

### Navigation

Sheets can utilize several navigation actions. To improve accessibility, it is advised to use at least two different navigation elements per sheet.

1. **Close**
   To close a sheet, use an icon button in the top left corner with the “close” icon.

2. **Back**
   On Android, to return to a previous screen, use an icon button in the top left corner with an “directional-arrow-left” icon.

3. **Button**
   An inline Button is available for a variety of purposes, back, close, next, save, etc. However we advise caution when using due to potential localization issues. 

4. **Grabber**
   A Grabber is a short gray line at the top of the sheet that tells the user that the sheet can be dragged to either collapse of expand.

5. **Outside tap**
   For the Partial Sheet, the user may be able to tap outside of the sheet to exit.

## Color
<iframe style={{border:0}} width="100%" height="600" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Ftype%3Ddesign%26node-id%3D19400%253A35930%26t%3DF4E0KD9MxAS99vGZ-1" allowFullScreen></iframe>

## Localization
Be sure to localize the header, body content and any footer items. Note that localization can lengthen text by 20 to 30 percent.
<br/>
<ImgContainer color="gray-roboflow-100" src="https://i.pinimg.com/originals/e8/49/65/e849656ad7870ca554554a73723c0b28.png" alt="Example of a sheet receding off the view of the image"/>

## Animation
By default, Sheet animates in from the bottom of the screen. It animates out when the header close button is pressed, the user swipes down or the user taps outside of the sheet. Visit Material Design for more information on [container motion](https://material.io/design/motion/the-motion-system.html#container-transform).
