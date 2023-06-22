// @flow strict
import { type Node } from 'react';
import { Image, Toast } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Toast
      primaryAction={{ accessibilityLabel: 'Test', label: 'Undo', size: 'lg' }}
      text="Home decor"
      thumbnail={{
        image: (
          <Image
            alt="Modern ceramic vase pin."
            naturalHeight={564}
            naturalWidth={564}
            src="https://i.ibb.co/Lx54BCT/stock1.jpg"
          />
        ),
      }}
    />
  );
}
