// @flow strict
import React, { type Node } from 'react';
import { Image, PageHeader } from 'gestalt';

export default function PageHeaderTitleExample(): Node {
  return (
    <PageHeader
      title="Pinterest app"
      badge={{ text: 'New', tooltipText: 'New integration' }}
      helperIconButton={{
        accessibilityControls: '',
        accessibilityExpanded: false,
        accessibilityLabel: 'Read more information about the new Pinterest integration',
        onClick: () => {},
      }}
      thumbnail={
        <Image
          alt="square"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/LQc8ynn/image.png"
        />
      }
    />
  );
}
