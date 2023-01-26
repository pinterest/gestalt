#!/usr/bin/env node
/* eslint import/no-dynamic-require: 0, no-console: 0 */

const path = require('path');

require('@babel/register');

const chalk = require('chalk');

function logSuccess(message) {
  console.log(chalk.green(`✅ ${message}`));
}

(async function generateSlackBlockKitPost() {
  // eslint-disable-next-line global-require
  const latestBlogData = require(path.join(__dirname, '..', 'docs', 'pages', 'BlogPosts.json'))
    .digests[0];
  const startingString = `{
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "Gestalt weekly digest for ${latestBlogData.week}",
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Hey all, in the spirit of improving our communication, we're working to slim down our weekly comms to be more digestible and to the point. We're hoping this is an improvement - please sound off if you think this is a step in the right direction.\\n\\nNow, onto the updates!"
        }
      },`;

  const endingString = `{
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Visit our <https://gestalt.pinterest.systems/whats_new|*What's New page*> to view all our weekly updates or our <https://gestalt.pinterest.systems/roadmap|*Roadmap*> to see what we have planned for this year."
    }
  }
]
}`;

  const itemBlocks = latestBlogData.posts.map((post) => {
    const formattedContent = post.content
      .replaceAll(/\n/g, '\\n')
      .replaceAll(/\[([^\]]+)\]\(([^)]+)\)/g, `<$2|*$1*>`);

    return `{
    "type": "section",
    "accessory": {
      "type": "image",
      "image_url": "${post.imageSrc}",
      "alt_text": "${post.imageAltText}"
    },
    "text": {
      "type": "mrkdwn",
      "text": "*${post.title}* \\n${formattedContent}"
    }
  },
  {
    "type": "divider"
  },`;
  });

  logSuccess(startingString + itemBlocks.join(' ') + endingString);
})();
