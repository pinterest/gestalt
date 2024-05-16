import { ReactNode } from 'react';
import { Image, Toast } from 'gestalt';

export default function Snapshot() {
  return (
    // @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ primaryAction: { accessibilityLabel: string; label: string; size: "lg"; role: "button"; onClick: () => void; }; text: string; thumbnail: { image: Element; }; }' but required in type 'ToastProps'.
    <Toast
      primaryAction={{
        accessibilityLabel: 'Test',
        label: 'Undo',
        size: 'lg',
        role: 'button',
        onClick: () => {},
      }}
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
