---
title: Toast
description: Toasts are brief and small messages that overlay content, but do not block the user’s flow, as they are out of the way and ephemeral. Toasts do not require user action and primarily acknowledge that a user has performed an action or completed a task.
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/e5/8e/8c/e58e8c184b155e9d9bc1d40657f1bc27.jpg" noPadding alt="an example of toast"/>

## Usage guidelines

<TwoCol>
  <Group>
    <Do title="When to use" />    
    - Briefly acknowledging a user action without interrupting their flow
    - When acknowledging an action that relates to another surface, providing a link that navigates the user to that surface
    - To undo actions after acknowledgement, if there isn’t already a way to do so on the current surface
    - For system processes like showing that a process is loading, or when there are internet connectivity issues.
  </Group>
  <Group>
  <Dont title="When not to use" />
  - When, due to an error, a user can’t even continue performing basic tasks like browsing already loaded Pins.
  - When asking a user to confirm that they want to perform an action. Use [Sheet](/android/sheet) instead.
  - When you want to suggest a user spend more money or try new features; use [Upsell](/upsell) instead.
  - For errors that relate to a specific section or page. Use [Callout](/web/callout) or [SlimBanner](/slimbanner) instead.
  - To guide or educate the user. Use [Popover](/popover) or [Tooltip](/tooltip) instead.
  </Group>
</TwoCol>

## Best practices
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/69/d5/3f/69d53f0b5e459aeca189acba1949111a.jpg" alt="example with toast with unblocking placement"/>
    <Do title="Do" />
    Place Toasts out of the way so that a user can still navigate and complete tasks. Keep a bottom margin that is the same size as the left and right margins.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/8b/ae/9a/8bae9aff403a1a62baf18ea684eb8578.jpg" alt="example of with blocking placement"/>
    <Dont title="Don't" />
    Block navigation controls with Toasts or align too close to the edge of a navigation bar.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/b4/eb/3d/b4eb3d14e0997ca8cfc6495f951880e0.jpg" alt="example of showing one toast"/>
    <Do title="Do" />
    Show one Toast at a time, with errors and Acknowledgements taking priority.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/65/eb/4e/65eb4e3f85d7774955cfcd8f4d875d46.jpg" alt="example of showing multiple toasts"/>
    <Dont title="Don't" />
    Stack multiple toasts as that will block the user.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/5d/78/fc/5d78fc69a86c9c70311719f6842feaf4.jpg" alt="example of a dismissible toast"/>
    <Do title="Do" />
    Include a way to dismiss the toast when it is actionable or contains multiple lines of text. Mobile toasts can be dismissed via swiping on the toast in any direction.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/32/66/29/326629104e4376649ed9c910516423c2.jpg" alt="example of leaving a toast on screen"/>
    <Dont title="Don't" />
    Leave toasts on screen for a long time without a way to dismiss. Exceptions are blocking error toasts where a user can’t take any action until the error is resolved.
  </Group>
</TwoCol>

## Accessibility

People use Android's accessibility features, such as TalkBack and dynamic text sizing to personalize how they interact with their devices. Supporting these personalizations ensures that everyone has a great user experience. See Material Design and development documentation about accessibility for Android:

[Accessbile design on Android](https://material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)

### Duration
Some people may take longer to read toasts than others due to aging, low vision, or cognitive impairments. Use the guide below to set duration for Toasts:

- Brief text of approximately 10–15 words (including button text): 5 seconds
- Longer than 15 words: Slow readers can read about 125–200 words per minute. Base your duration on the slowest number. For example, a toast with 20 words should be set to 10s. [Source](https://capitalizemytitle.com/reading-time/3000-words/)

## Variants

### Type

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/d9/eb/56/d9eb56243a337584cebbb57e293b3d7f.jpg" noPadding alt="default toast"/>
    
    **Default**
    A generic acknowledgment after an action is taken.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/7f/c3/0d/7fc30d26a72b1c23f71f685f5bfbfc51.jpg" noPadding alt="error toast"/>
   
    **Error**
    Used rarely for connection issues or unknown errors where we don’t want to completely block the users flow, but want the message to persist if the user goes to another surface. Providing a way to solve the error or get help is recommended.
  </Group>
  
</TwoCol>

### Images & graphics

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/d9/eb/56/d9eb56243a337584cebbb57e293b3d7f.jpg" noPadding alt="text only toast"/>
    
    **Text only**
    A simple, generic acknowledgment after an action is taken These should not be actionable.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/17/59/a5/1759a50f10fc4a9540a689e7fd2a8f08.jpg" noPadding alt="toast with image"/>
    
    **Image**
    With an image for Pin or Board actions.
  </Group>
</TwoCol>
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/f1/f8/25/f1f82544879acb868b88b5c6d1c5ee0d.jpg" noPadding alt="toast with avatar"/>
    
    **Avatar**
    With an Avatar for Profile or Pinner-related messaging. An optional link can be included. When there’s a link on mWeb, the entire toast is tappable, using TapArea.
  </Group>
  <Group>

  </Group>
</TwoCol>

### Navigation

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/58/ab/9e/58ab9efbed6f56e9a0bfe85bd80edf5b.jpg" noPadding alt="toast with button"/>
    
    **Button**
    As a secondary element, to drive users to another surface, or change a recently completed action.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/17/59/a5/1759a50f10fc4a9540a689e7fd2a8f08.jpg" noPadding alt="toast with link"/>
    
    **Link**
    As a secondary element, to drive users to another surface.
  </Group>
</TwoCol>

### Placement

Placement is always centered at the top of the screen and not blocking any navigation or important buttons.

## Writing

<TwoCol>
  <Group>
    <Do title="Do" />      
  - Consider internationalization and how other languages may be take up more space
  - Be brief and concise
  - Use conversational language
  </Group>
  <Group>
  <Dont title="Don't" />
  - Use lengthy, technical jargon or local idioms that will be hard to translate to other languages
  </Group>
</TwoCol>
