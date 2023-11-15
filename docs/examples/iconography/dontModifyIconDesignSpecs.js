// @flow strict
import { type Node as ReactNode } from 'react';
import { Box } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <OutlinedPincode />
    </Box>
  );
}

function OutlinedPincode() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.6667 1.66667C17.6667 2.58667 16.92 3.33333 16 3.33333C15.08 3.33333 14.3333 2.58667 14.3333 1.66667C14.3333 0.746667 15.08 0 16 0C16.92 0 17.6667 0.746667 17.6667 1.66667Z"
        fill="currentColor"
      />
      <path
        d="M4.66667 8C6.508 8 8 6.508 8 4.66667C8 2.82533 6.508 1.33333 4.66667 1.33333C2.82533 1.33333 1.33333 2.82533 1.33333 4.66667C1.33333 6.508 2.82533 8 4.66667 8Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.66667 16C6.66667 10.8453 10.8453 6.66667 16 6.66667C21.1547 6.66667 25.3333 10.8453 25.3333 16C25.3333 21.1547 21.1547 25.3333 16 25.3333C10.8453 25.3333 6.66667 21.1547 6.66667 16ZM13.5092 22.5438C10.8731 21.5399 9 18.9884 9 16C9 12.1343 12.1343 9 16 9C19.8657 9 23 12.1343 23 16C23 19.8657 19.8657 23 16 23C15.2825 23 14.5907 22.8921 13.9385 22.6914C14.2214 22.237 14.6776 21.4367 14.8421 20.8043C14.9267 20.4788 15.2761 19.1477 15.2761 19.1477C15.5036 19.5811 16.1668 19.9486 16.8732 19.9486C18.9756 19.9486 20.4893 18.0154 20.4893 15.6138C20.4893 13.312 18.6104 11.5894 16.1931 11.5894C13.186 11.5894 11.5894 13.6077 11.5894 15.8063C11.5894 16.8283 12.1331 18.1006 13.0034 18.5054C13.1358 18.5672 13.2058 18.5398 13.2367 18.4127C13.2478 18.3658 13.281 18.231 13.3184 18.0792C13.3583 17.9173 13.403 17.7361 13.4304 17.6222C13.4473 17.5517 13.4386 17.4916 13.382 17.4222C13.0938 17.0728 12.8634 16.4311 12.8634 15.832C12.8634 14.2949 14.0272 12.808 16.0093 12.808C17.7214 12.808 18.9207 13.9741 18.9207 15.643C18.9207 17.5283 17.9682 18.8344 16.7297 18.8344C16.0461 18.8344 15.5339 18.2686 15.6978 17.575C15.769 17.2749 15.8643 16.9663 15.957 16.6663C16.1203 16.1377 16.2753 15.6359 16.2753 15.2545C16.2753 14.7196 15.9883 14.2733 15.3933 14.2733C14.6939 14.2733 14.1327 14.9967 14.1327 15.965C14.1327 16.5828 14.341 16.9998 14.341 16.9998C14.341 16.9998 13.6503 19.92 13.5238 20.4637C13.3767 21.096 13.445 21.9972 13.5092 22.5438Z"
        fill="currentColor"
      />
      <path
        d="M30.6667 4.66667C30.6667 6.508 29.1747 8 27.3333 8C25.492 8 24 6.508 24 4.66667C24 2.82533 25.492 1.33333 27.3333 1.33333C29.1747 1.33333 30.6667 2.82533 30.6667 4.66667Z"
        fill="currentColor"
      />
      <path
        d="M24 27.3333C24 25.492 25.492 24 27.3333 24C29.1747 24 30.6667 25.492 30.6667 27.3333C30.6667 29.1747 29.1747 30.6667 27.3333 30.6667C25.492 30.6667 24 29.1747 24 27.3333Z"
        fill="currentColor"
      />
      <path
        d="M1.33333 27.3333C1.33333 25.492 2.82533 24 4.66667 24C6.508 24 8 25.492 8 27.3333C8 29.1747 6.508 30.6667 4.66667 30.6667C2.82533 30.6667 1.33333 29.1747 1.33333 27.3333Z"
        fill="currentColor"
      />
      <path
        d="M1.66667 14.3333C2.58667 14.3333 3.33333 15.08 3.33333 16C3.33333 16.92 2.58667 17.6667 1.66667 17.6667C0.746667 17.6667 0 16.92 0 16C0 15.08 0.746667 14.3333 1.66667 14.3333Z"
        fill="currentColor"
      />
      <path
        d="M30.3333 14.3333C29.4133 14.3333 28.6667 15.08 28.6667 16C28.6667 16.92 29.4133 17.6667 30.3333 17.6667C31.2533 17.6667 32 16.92 32 16C32 15.08 31.2533 14.3333 30.3333 14.3333Z"
        fill="currentColor"
      />
      <path
        d="M16 28.6667C15.08 28.6667 14.3333 29.4133 14.3333 30.3333C14.3333 31.2533 15.08 32 16 32C16.92 32 17.6667 31.2533 17.6667 30.3333C17.6667 29.4133 16.92 28.6667 16 28.6667Z"
        fill="currentColor"
      />
    </svg>
  );
}
