---
title: Gestalt 2023 Q1 newsletter
description: The Gestalt team has been hard at work in the first quarter of 2023. While a lot of the magic we have cooked up this year is still simmering, we’ve shipped some big updates to the system. Below are our biggest accomplishments
fullwidth: true
---

## Q1 highlight: Pinterest content standards
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/9e/e7/23/9ee7233a5aa45cc43d97f89bcf6daf9b.jpg" alt="Illustration of white and black speech bubbles." />
<br />
For years, Content Design standards lived separately from Product Design standards. This meant that if you wanted to know the rules for the visuals of a button, and you wanted to know the rules for the copy of a button, you had to look in two different places. During H2 2022 a small team of ICs across Content Design and Gestalt got together to move the Content Design Standards into the Gestalt framework—for good. This has had big impact in aligning our teams and making the Content Design Standards more easily accessible.

In 2023, Content Design are leading a refresh of the Content Design Standards themselves—keep an eye out for more updates on this later this half!

**[Check out Pinterest’s content standards](https://gestalt.pinterest.systems/foundations/content_standards/voice)**

## Components and tokens

### Featured component: Mobile modal
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/9b/52/96/9b52969c983d07d792ae6ea5f7c57b49.jpg" alt="Illustration of gestalt modals." />
<br />
We plan to vastly improve Gestalt’s support for the mobile web experience in 2023. Our first step towards that goal was the creation of a mWeb adaptive version of Modal. This new feature within Modal makes it easier to build features that gracefully adapt from desktop to mobile devices. This work should lead to more consistent experiences in our mobile web product built with less code in less time. 

**Go check out Gestalt's [mobile-adaptive Modal](https://gestalt.pinterest.systems/web/modal#Mobile)**

<TwoCol>
<Group>
### Toast and Badge updates
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/68/3d/c7/683dc73b42ff332c49bc3e96719182c6.jpg" alt="Illustration of a toaster oven." />
<br />
We’ve been working behind the scenes to ship refinements to Toast and Badge on our Web platform. After successful experiments, we’re excited to announce they’ve both been officially shipped to Gestalt. Toast is now slimmer, meaning less of the screen is occluded when it’s displayed. On the opposite end, Badge now slightly larger due to a higher font size. 

Subtle as these changes may seem, we expect to see some serious usability gains from these updates.

**View [Toast](https://gestalt.pinterest.systems/web/toast) and [Badge](https://gestalt.pinterest.systems/web/badge) in our docs**
</Group>

<Group>
### New PopoverEducational component
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/c9/02/d8/c902d8ba94674ff897ba2e5f726ad8cc.jpg" alt="Illustration of a popover with graduation cap." />
<br />
The new PopverEducational component represents our continued focus on making Gestalt more opinionated. In the past, displaying in-product education required a decent amount of configuration of our existing Popover to follow our standards. This led to more work and more opportunities for accidental inconsistencies. 

PopoverEducation removes the overhead by being purpose-built to support in-product education with less configuration and headaches. 

**Check out [PopoverEducational](https://gestalt.pinterest.systems/web/popovereducational)**
</Group>
</TwoCol>

<TwoCol>
<Group>
### New HelpButton component
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/df/f6/0b/dff60b1867edec731869be5847001e46.jpg" alt="Illustration of a help sign." />
<br />
Speaking of opinionated components, we added a small-but-mighty component called HelpButton. This component is intended to make it just that much easier to provide help/guidance at the individual element level. 

We shipped this component on the early side, meaning we think there’s room for improvement, but we’ve confident that it’ll be a major help and worth going out the door. We look forward to sharing more HelpButton-related updates in the future. 

**View [HelpButton](https://gestalt.pinterest.systems/web/helpbutton)**
</Group>

<Group>
### 20+ new icons
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/62/f4/75/62f475b5858ae017bea0311e66807e4e.jpg" alt="Illustration of new icons." />
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
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/23/5e/ca/235eca334aad0a5eb1e8c4eb9555c54c.jpg" alt="Illustration of books on a shelf." />
<br />
Our biggest documentation update for the quarter was the addition of Form guidelines to our documentation. Forms can be super tricky. Our goal with these guidelines is to take the mystery out of creating effective forms with Gestalt while also beginning to suss out our official point of view on the subject. 

**Read [Gestalt’s Form guidelines](https://gestalt.pinterest.systems/foundations/forms/overview)**
</Group>
<Group>
### Illustration guidelines
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/e2/7f/b2/e27fb20b346f1595988990a9fb1fbe94.jpg" alt="Illustration of an open book." />
<br />
We took our first step towards providing official Gestalt illustrations in late 2022. We continue to make strong progress towards supporting illustration use cases by publishing Gestalt’s illustration guidelines. These best practices should set a strong foundation as we continue to grow our support in this space.

**Check out [Gestalt’s Illustration guidelines](https://gestalt.pinterest.systems/foundations/illustration)**
</Group>

</TwoCol>
<TwoCol>
<Group>
### Team support section
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/b7/04/12/b704122562845dcef374be348e9519c5.jpg" alt="Illustration of two speech bubbles." />
<br />
We know the design system is all about collaboration and service. And, to improve our collaboration process, we just published a set of resources and guidelines to help you build consistent product surfaces and collaborate with us!

We defined a straightforward process to receive, centralize and manage your component’s requests and updates, making it easier for you to follow your request’s progress and understand how it fits in our roadmap.

**Go have a look at Gestalt’s [Team support pages](https://gestalt.pinterest.systems/team_support/overview)**
</Group>
<Group>
### Android component doc updates
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/c4/6b/87/c46b8739a72f4d9f20b18acd52d9d156.jpg" alt="Illustration of an android phone pointing to an android book." />
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
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/a7/8e/d7/a78ed765ecb562d14c57e513820b6655.jpg" alt="Illustration of a map with a location pin." />
<br />
We made two big improvements to our Figma primary navigation component for mobile web. First, we updated the component to reflect our up-to-date treatment in product and we also added a variant for our unauthenticated experience.
</Group>

<Group>
### Reaction and Montage components
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/63/a1/a8/63a1a8ea73131c487f1c36e534b6dbf2.jpg" alt="Illustration of reactions in a grid." />
<br />
We’ve included new Reaction and Montage components to cover some common product use cases. 

Our Reaction component handles the affordances for reacting to content as well as seeing how many people have reacted to content.

Montage represents common image collection layouts within the product. We’ve included a MontageGrid (what’s commonly seen in Boards) and MontageRow (typically used for Sections or general editorial content).
</Group>
</TwoCol>
<TwoCol>
<Group>
### Handoff kit improvements
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/23/af/95/23af95c6031d91914b2a69d75321ec4d.jpg" alt="Illustration of the gestalt logo in a file." />
<br />
We made some fixes to nested components in our flow connectors to link to the main source file and included support for dark mode.
</Group>

<Group>
### Inclusive imagery fill styles
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/54/8b/ab/548bab93a2bd837ba82f6cf0ad926575.jpg" alt="Illustration of imagery in a set of pins." />
<br />
We updated our imagery styles in the Gestalt foundations Figma library to bring more realistic and diverse pins. It also includes two new categories, Beauty and DYI. All the images are drawn from our brand assets, so they are rights-ready for mock-ups that need to be shown in external docs or marketing campaigns.
</Group>
</TwoCol>

## What’s coming in Q2? 
### Production-ready mobile components
<ImgHero width={1050} height={590} src="https://i.pinimg.com/originals/53/ed/b0/53edb0846e365b457e8c44eec37c84e0.jpg" alt="Illustration of a conveyor belt making components." />
<br />
We have been working with Android and iOS teams to begin the buildout of mobile components for a while now, but Q2 is when you’re really going to see the fruits of our labor. It’s been a long time coming, but in Q2 2023, we will be shipping a number of mobile Gestalt components.

For Android, we plan to work on ButtonGroup, Icon, IconButton, IconButtonFloating, SearchField,Text, TextArea and Toast. For iOS, we’ll be working on Text and Icon. 
<TwoCol>
<Group>
### mWeb Sheet component
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/46/fb/a2/46fba202364bf3f373d15afad1eec4cc.jpg" alt="Illustration of a sheet component." />
<br />
Our initial work on mWeb Modal gave us the learnings we needed to begin work on a mobile sheet. No, not this Sheet, but a brand new mobile web specific Sheet. We’re planning to land this new component in early Q2, so be on the look out!
</Group>
<Group>
### ActionBar and Video control revamps
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/72/47/e3/7247e3b75e58191c63e16d1306c33d29.jpg" alt="Illustration of a clapperboard." />
<br />
We plan to revamp two critical components in Q2, namely ActionBar and Video controls. These two UI elements have had some great work done to them in product and we plan to reflect those changes within Gestalt. Given how much these elements are used in the Pinterest product, we’re super excited to deliver these!
</Group>
</TwoCol>
<TwoCol>
<Group>
### Data visualization guidelines
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/2c/0b/8e/2c0b8e458df15e392bd9cc6e7477848a.jpg" alt="Illustration of a clipboard with a line graph going up." />
<br />
We plan to ship data visualization Gestalt components in the second half of 2023 (yay). As a tasty hors d’oeuvre, we’ll be publishing new and improved data visualization guidelines to our docs. These guidelines will give everyone a clear idea of where we’re headed and what you can expect to see in component form later this year.
</Group>
<Group>
### TileData component
<ImgHero width={525} height={350} src="https://i.pinimg.com/originals/94/fd/ec/94fdec6b0186d7aee830751fa6635627.jpg" alt="Illustration of a checkerboard of TileData components." />
<br />
Speaking of data viz... TileData is the beginning of our expansion into the data visualization universe! It’s a visually rich way of selecting and/or comparing data categories and displays at-a-glance data for a user to quickly view key metrics. This component will be a perfect pair with our upcoming charts and graphs.
</Group>
</TwoCol>
