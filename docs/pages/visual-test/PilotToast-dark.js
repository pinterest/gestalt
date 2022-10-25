// @flow strict
import { type Node } from 'react';
import { PilotToast, Button, Image } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <PilotToast
      button={<Button key="button-key" text="Undo" size="lg" />}
      text="Home decor"
      thumbnail={
        <Image
          alt="Modern ceramic vase pin."
          naturalHeight={564}
          naturalWidth={564}
          src="https://i.ibb.co/Lx54BCT/stock1.jpg"
        />
      }
    />
  );
}
