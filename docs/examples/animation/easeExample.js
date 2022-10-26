// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text, Divider } from 'gestalt';

function GestaltLogo() {
  return (
    <svg
      aria-label="Home"
      fill="none"
      height={100}
      viewBox="0 0 500 500"
      width={100}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M410 249.924H250L410 409.848V249.924Z" fill="#26C0B4" />
      <path
        clipRule="evenodd"
        d="M90 249.924C90 338.248 161.635 409.848 250 409.848V249.924H90Z"
        fill="#75BFFF"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M250.019 90C161.653 90 90.0186 161.601 90.0186 249.924H250.019V90Z"
        fill="#00857C"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default function Example(): Node {
  return (
    <Box padding={6} width={550}>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes move-right {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(400px, 0, 0);
            }
          }

          @media (prefers-reduced-motion: no-preference) {
            .logoFirst {
              animation: move-right 2.5s linear infinite;
            }

            .logoSecond {
              animation: move-right 2.5s ease infinite;
            }

            .logoThird {
              animation: move-right 2.5s ease-in infinite;
            }

            .logoFourth {
              animation: move-right 2.5s ease-out infinite;
            }
            .logoFifth {
              animation: move-right 2.5s cubic-bezier(0.5, 0.5, 0.4, 1.2) infinite;
            }
          }

              `,
        }}
      />
      <Flex gap={6} direction="column">
        <Box>
          <Text size="400" weight="bold">
            Linear
          </Text>
          <div className="logoFirst">
            <GestaltLogo />
          </div>
          <Divider />
        </Box>
        <Box>
          <Text size="400" weight="bold">
            Ease
          </Text>
          <div className="logoSecond">
            <GestaltLogo width={100} height={100} />
          </div>
          <Divider />
        </Box>
        <Box>
          <Text size="400" weight="bold">
            Ease-in
          </Text>
          <div className="logoThird">
            <GestaltLogo width={100} height={100} />
          </div>
          <Divider />
        </Box>
        <Box>
          <Text size="400" weight="bold">
            Ease-out
          </Text>

          <div className="logoFourth">
            <GestaltLogo width={100} height={100} />
          </div>
          <Divider />
        </Box>
        <Box>
          <Text size="400" weight="bold">
            Bounce
          </Text>
          <Text italic>cubic-bezier(0.5, 0.5, 0.4, 1.2)</Text>
          <div className="logoFifth">
            <GestaltLogo width={100} height={100} />
          </div>
          <Divider />
        </Box>
      </Flex>
    </Box>
  );
}
