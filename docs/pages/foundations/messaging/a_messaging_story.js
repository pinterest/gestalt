// @flow strict
import { Heading, Text, Flex, Box, Image } from 'gestalt';
import React, { type Node } from 'react';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

type StoryItemProps = {|
  heading: string,
  imageUrl: string,
  imageWidth: string,
  imageHeight: string,
  text: string | Node,
  format?: 'twoColImgLeft' | 'twoColImgRight' | 'oneCol'
|};

function ImageBox({imageUrl, imageWidth, imageHeight, format = 'oneCol'}: StoryItemProps): Node {
  return (
    <Box width={format === 'oneCol' ? '100%' : '50%' } padding={4} display="flex" flex="grow" justifyContent='center'>
      <Box maxWidth={format === 'oneCol' ? '100%' : 320 } width="100%">
        <Image src={imageUrl} naturalWidth={imageWidth} naturalHeight={imageHeight} />
      </Box>
    </Box>
  )
}

function ContentBox({heading, text, format = 'oneCol'}: StoryItemProps): Node {
  return (
    <Box width={format === 'oneCol' ? '100%' : '50%' } padding={4}><Heading size={400}>{heading}</Heading><Text>{text}</Text></Box>
  )
}

function StoryItem({ heading, imageUrl, imageWidth, imageHeight, text, format = 'oneCol' }: StoryItemProps): Node {
  //  const img = <ImageBox imageUrl={imageUrl} imageWidth={imageWidth} imageHeight={imageHeight} format={format} />
  const img =
  <Box width='100%' padding={4} display="flex" flex="grow" justifyContent='center' alignItems='center'>
    <Box maxWidth={format === 'oneCol' ? '100%' : 320 } width="100%">
      <Image src={imageUrl} naturalWidth={imageWidth} naturalHeight={imageHeight} />
    </Box>
  </Box>
  const contentMobile = <Box width='100%' padding={4} lgDisplay="none" display="block"><Heading size={400}>{heading}</Heading><Text>{text}</Text></Box>
  const contentDesktop = <Box width='100%' padding={4} lgDisplay="block" display="none"><Heading size={400}>{heading}</Heading><Text>{text}</Text></Box>
  // const contentDesktop = <ContentBox heading={heading} text={text} format={format} />
  // const contentMobile = <ContentBox heading={heading} text={text} format={format} />
  const lockup = format === 'twoColImgRight' ? <React.Fragment>{contentDesktop}{img}{contentMobile}</React.Fragment> : <React.Fragment>{img}{contentDesktop}{contentMobile}</React.Fragment>
  return (
    <Box display='flex' direction='column' lgDirection={format === 'oneCol' ? 'column' : 'row'} alignItems="center">
      {lockup}
    </Box>
  );
}

export default function MessagingStoryPage(): Node {
  return (
    <Page title="A messaging story">
      <PageHeader name="A messaging story" type="guidelines" />

      <Flex direction="column" maxWidth={678} gap={8}>
        <Box color='inverse'>
          <Flex alignItems='center'>
            <Box width='100%' padding={8}>
              <Heading color='light' size={400}>Meet Claire</Heading>
              <Text color='light'>Claire Ọyáwálé is a Pinner who loves architecture and fine art. She also has a Pinterest Business account through her employer—a high-end shoe brand.</Text>
            </Box>
            <Box width='40%'>
              <Image src='https://i.pinimg.com/originals/fb/94/a7/fb94a7630c03b9542a3ce732940f4a6f.png' naturalWidth={1388} naturalHeight={1687} />
            </Box>
          </Flex>
        </Box>
        <StoryItem
            format='twoColImgLeft'
            heading='Alert indicator'
            text={`
Claire opens Pinterest on her phone to see a red dot on her Avatar.

This isn’t a highly urgent issue, so we don’t throw a modal, banner or other message component in her face just yet; just a little nudge that tells her she needs to look at her profile.
`}
            imageUrl='https://i.pinimg.com/originals/09/99/84/0999846e77dd4a685a1a107a3d9a3787.png'
            imageWidth={528}
            imageHeight={840}
            />
            <StoryItem
            format='twoColImgRight'
            heading='Warning callout'
            text={`
Tapping on her profile leads her to a warning banner about needing to set a password for better security. Being that it’s prominent and at the top of the page, she figures it’s important, so she taps on the primary banner button to update her password.
            `}
            imageUrl='https://i.pinimg.com/originals/2e/21/87/2e21878240de8826781b260cf79c7e39.png'
            imageWidth={404}
            imageHeight={840}
            />
            <StoryItem
            format='twoColImgLeft'
            heading='Success toast'
            text={`
After setting her new password, Claire gets a short and brief success toast just to verify that the changes went through. She is now ready to start pinning!
            `}
            imageUrl='https://i.pinimg.com/originals/77/37/86/77378631a5f9fddb7c40034463308bbf.png'
            imageWidth={404}
            imageHeight={840}
            />
            <StoryItem
            format='twoColImgRight'
            heading='Error modal'
            text={`
As she pins, Claire accidentally taps a link that leads to harmful content. Luckily, we can stop this by throwing an AlertModal letting her know why she can’t continue.

Claire goes back to find some other pins, then decides it’s time to get back to work.
            `}
            imageUrl='https://i.pinimg.com/originals/b2/ad/7f/b2ad7fe51119776f35248bf124f88c2b.png'
            imageWidth={404}
            imageHeight={840}
            />
            <StoryItem
            format='oneCol'
            heading='Recommendation banner'
            text={`
Claire goes to her desktop to resume ads work for her employer, Dressy. She opens her Pinterest Business account on her desktop and navigates to the ads page. A recommendation message is placed right beneath the ad campaign that it refers to so she knows which ad campaign could use improvements.

The recommendation is dismissible since it’s not required and may get in the way of glancing at all the other campaigns.
            `}
            imageUrl='https://i.pinimg.com/originals/c5/07/97/c507977a2f7b1542784dde6bf179086f.png'
            imageWidth={1492}
            imageHeight={900}
            />
            <StoryItem
            format='oneCol'
            heading='Confirmation modal'
            text={`
Claire decides to skip the recommendation for a moment and create an Idea Pin that needs more attention for an Ad campaign. As she organizes and deletes images and videos in her pins, she gets a confirmation modal confirming that she wants to delete an image, as this is irreversible. Being that this may happen multiple times in her edit flows, the option to not show again also appears. *For destructive, irreversible tasks that are not part of creating and editing, we don’t provide a “don’t show again” option.*
            `}
            imageUrl='https://i.pinimg.com/originals/cb/d2/4d/cbd24d53a98235748c647d37a5d2415b.png'
            imageWidth={1492}
            imageHeight={900}
            />
            <StoryItem
            format='oneCol'
            heading='Success banner vs Toast'
            text={`
Claire completes the Idea Pin and turns it into an ad campaign. After publishing it, she gets a Success Banner at the top of the page instead of a Toast since the messaging requires more wording for clarity. Luckily, the banner is still dismissible.
            `}
            imageUrl='https://i.pinimg.com/originals/b8/95/f1/b895f1b1976aabd8ce9302278515de5d.png'
            imageWidth={1492}
            imageHeight={900}
            />
        <Flex>
          <Box>https://i.pinimg.com/originals/f9/2f/97/f92f97cff5b2a5ede604e956cdd5825e.png</Box>
          <Box>
            <Heading size={400}>Time to relax</Heading>
            <Text>After a clear and easy messaging session, it’s time for Claire to relax and call it a day. Have fun Claire!</Text></Box>
        </Flex>
      </Flex>
    </Page>
  );
}
