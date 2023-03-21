---
title: Gestalt 2023 Q1 newsletter
description: The Gestalt team has been hard at work in the first quarter of 2023. While a lot of the magic we have cooked up this year is still simmering, we’ve shipped some big updates to the system. Below are our biggest accomplishments
fullwidth: true
---

## Q1 highlight: Pinterest content standards
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
For years, Content Design standards lived separately from Product Design standards. This meant that if you wanted to know the rules for the visuals of a button, and you wanted to know the rules for the copy of a button, you had to look in two different places. During H2 2022 a small team of ICs across Content Design and Gestalt got together to move the Content Design Standards into the Gestalt framework—for good. This has had big impact in aligning our teams and making the Content Design Standards more easily accessible.

In 2023, Content Design are leading a refresh of the Content Design Standards themselves—keep an eye out for more updates on this later this half!

**[Check out Pinterest’s content standards](https://gestalt.pinterest.systems/foundations/content_standards/voice)**

## Components and tokens

### Featured component: Mobile modal
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
We plan to vastly improve Gestalt’s support for the mobile web experience in 2023. Our first step towards that goal was the creation of a mWeb adaptive version of Modal. This new feature within Modal makes it easier to build features that gracefully adapt from desktop to mobile devices. This work should lead to more consistent experiences in our mobile web product built with less code in less time. 

**Go check out Gestalt's [mobile-adaptive Modal](https://gestalt.pinterest.systems/web/modal#Mobile)**

<TwoCol>
<Group>
### Toast and Badge updates
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
We’ve been working behind the scenes to ship refinements to Toast and Badge on our Web platform. After successful experiments, we’re excited to announce they’ve both been officially shipped to Gestalt. Toast is now slimmer, meaning less of the screen is occluded when it’s displayed. On the opposite end, Badge now slightly larger due to a higher font size. 

Subtle as these changes may seem, we expect to see some serious usability gains from these updates.

**View [Toast](https://gestalt.pinterest.systems/web/toast) and [Badge](https://gestalt.pinterest.systems/web/badge) in our docs**
</Group>

<Group>
### New PopoverEducational component
<ImgContainer src="https://i.pinimg.com/originals/6e/da/6b/6eda6b3f5412607b31d58446b97d57c1.png" alt="a large red button that says Save"/>
<br />
The new PopverEducational component represents our continued focus on making Gestalt more opinionated. In the past, displaying in-product education required a decent amount of configuration of our existing Popover to follow our standards. This led to more work and more opportunities for accidental inconsistencies. 

PopoverEducation removes the overhead by being purpose-built to support in-product education with less configuration and headaches. 

**Check out [PopoverEducational](https://gestalt.pinterest.systems/web/popovereducational)**
</Group>
</TwoCol>

<TwoCol>
<Group>
### New HelpButton component
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
Speaking of opinionated components, we added a small-but-mighty component called HelpButton. This component is intended to make it just that much easier to provide help/guidance at the individual element level. 

We shipped this component on the early side, meaning we think there’s room for improvement, but we’ve confident that it’ll be a major help and worth going out the door. We look forward to sharing more HelpButton-related updates in the future. 

**View [HelpButton](https://gestalt.pinterest.systems/web/helpbutton)**
</Group>

<Group>
### 20+ new icons
<ImgContainer src="https://i.pinimg.com/originals/6e/da/6b/6eda6b3f5412607b31d58446b97d57c1.png" alt="a large red button that says Save"/>
<br />
Who doesn’t like more icons? The answer (backed by science) is no one. We continue to work on improving parity between our design icon library and what’s in code. There’s still room for improvement, but we’ve filled in 20+ gaps this quarter. 

Check out our Icon library if you’re interested in seeing the full list of icons we currently support in code.

**Visit [Gestalt’s Icon library](https://gestalt.pinterest.systems/foundations/iconography/library)**
</Group>
</TwoCol>


## Documentation
<TwoCol>
<Group>
### Form guidelines
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
Our biggest documentation update for the quarter was the addition of Form guidelines to our documentation. Forms can be super tricky. Our goal with these guidelines is to take the mystery out of creating effective forms with Gestalt while also beginning to suss out our official point of view on the subject. 

**Read [Gestalt’s Form guidelines](https://gestalt.pinterest.systems/foundations/forms/overview)**
</Group>
<Group>
### Illustration guidelines
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
We took our first step towards providing official Gestalt illustrations in late 2022. We continue to make strong progress towards supporting illustration use cases by publishing Gestalt’s illustration guidelines. These best practices should set a strong foundation as we continue to grow our support in this space.

**Check out [Gestalt’s Illustration guidelines](https://gestalt.pinterest.systems/foundations/illustrations/overview)**
</Group>

</TwoCol>
<TwoCol>
<Group>
### Icon library keywords
<ImgContainer src="https://i.pinimg.com/originals/6e/da/6b/6eda6b3f5412607b31d58446b97d57c1.png" alt="a large red button that says Save"/>
<br />
OK, we’ll fess up. Finding the icon you’re looking for in Gestalt is not great. We know it’s a pain and we plan to fix it. Our first step towards that goal is the addition of search keywords for each icon in our Icon library. For example, searching for “notifications” will return the Bell icon.

This is the first step in what we hope will be a slew of improvements to Gestalt’s iconography and the know-how on how to use it.

**Check out our [Icon library](https://gestalt.pinterest.systems/foundations/iconography/library)**
</Group>
<Group>
### Android component doc updates
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
As we ramp up development of mobile component development (yes, it’s happening), we’re trying something new by adding design specifications straight into our documentation. You can see this in action with our Android Icon and IconButton component docs. 

The goal of this work is to speed up component development by making our docs even more of a source of truth.

**Check out [Icon](https://gestalt.pinterest.systems/android/icon) and [IconButton](https://gestalt.pinterest.systems/android/iconbutton) Android docs**
</Group>
</TwoCol>

## Figma updates
<TwoCol>
<Group>
### Updated mobile web primary navigation
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
We made two big improvements to our Figma primary navigation component for mobile web. First, we updated the component to reflect our up-to-date treatment in product and we also added a variant for our unauthenticated experience.
</Group>

<Group>
### Reaction and Montage components
<ImgContainer src="https://i.pinimg.com/originals/6e/da/6b/6eda6b3f5412607b31d58446b97d57c1.png" alt="a large red button that says Save"/>
<br />
We’ve included new Reaction and Montage components to cover some common product use cases. 

Our Reaction component handles the affordances for reacting to content as well as seeing how many people have reacted to content.

Montage represents common image collection layouts within the product. We’ve included a MontageGrid (what’s commonly seen in Boards) and MontageRow (typically used for Sections or general editorial content).
</Group>
</TwoCol>
<TwoCol>
<Group>
### Handoff kit improvements
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
We made some fixes to nested components in our flow connectors to link to the main source file and included support for dark mode.
</Group>

<Group>
### Inclusive imagery fill styles
<ImgContainer src="https://i.pinimg.com/originals/6e/da/6b/6eda6b3f5412607b31d58446b97d57c1.png" alt="a large red button that says Save"/>
<br />
We updated our imagery styles in the Gestalt foundations Figma library to bring more realistic and diverse pins. It also includes two new categories, Beauty and DYI. All the images are drawn from our brand assets, so they are rights-ready for mock-ups that need to be shown in external docs or marketing campaigns.
</Group>
</TwoCol>

## What’s coming in Q2? 
### Production-ready mobile components
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
We have been working with Android and iOS teams to begin the buildout of mobile components for a while now, but Q2 is when you’re really going to see the fruits of our labor. It’s been a long time coming, but in Q2 2023, we will be shipping a number of mobile Gestalt components.

For Android, we plan to work on , ButtonGroup, Icon, IconButton, IconButtonFloating, SearchField,Text, TextArea and Toast. For iOS, we’ll be working on Text and Icon. 

<TwoCol>
<Group>
### mWeb Sheet component
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
Our initial work on mWeb Modal gave us the learnings we needed to begin work on a mobile sheet. No, not this Sheet, but a brand new mobile web specific Sheet. We’re planning to land this new component in early Q2, so be on the look out!
</Group>

<Group>
### TileData component
<ImgContainer src="https://i.pinimg.com/originals/6e/da/6b/6eda6b3f5412607b31d58446b97d57c1.png" alt="a large red button that says Save"/>

</Group>
</TwoCol>

<TwoCol>
<Group>
### Illustration guidelines
<ImgContainer src="https://i.pinimg.com/originals/33/8b/84/338b84c2f282d39a9fe20dcf7b3b9622.png" alt="a small red button that says Save" />
<br />
The Gestalt team landed its first set of official Gestalt illustrations in late 2022 and we’re not done on this subject. We’ll be publishing illustration guidelines to help provide best practices for how/when/where/why to use illustrations in our product. 
</Group>

<Group>
### TBD
<ImgContainer src="https://i.pinimg.com/originals/6e/da/6b/6eda6b3f5412607b31d58446b97d57c1.png" alt="a large red button that says Save"/>

</Group>
</TwoCol>
