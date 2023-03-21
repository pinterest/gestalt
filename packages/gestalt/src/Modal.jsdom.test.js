// @flow strict
import { screen, render } from '@testing-library/react';
import Modal from './Modal.js';
import Flex from './Flex.js';
import Button from './Button.js';
import DeviceTypeProvider from './contexts/DeviceTypeProvider.js';

describe('Modal', () => {
  test('Desktop Modal renders', () => {
    const { baseElement } = render(
      <Modal
        heading="Heading"
        subHeading="Subheading"
        accessibilityModalLabel="Test modal"
        onDismiss={() => {}}
        size="sm"
        footer={
          <Flex justifyContent="end" gap={2}>
            <Button color="gray" text="Cancel" />
            <Button color="red" text="Next" />
          </Flex>
        }
      >
        Modal content
      </Modal>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('Desktop Modal contains all elements correctly', () => {
    render(
      <Modal
        heading="Heading"
        subHeading="Subheading"
        accessibilityModalLabel="Test modal"
        onDismiss={() => {}}
        size="sm"
        footer={
          <Flex justifyContent="end" gap={2}>
            <Button color="gray" text="Cancel" />
            <Button color="red" text="Next" />
          </Flex>
        }
      >
        Modal content
      </Modal>,
    );

    expect(screen.getByText('Heading')).toBeVisible();
    expect(screen.getByText('Subheading')).toBeVisible();
    expect(screen.getByText('Modal content')).toBeVisible();
    expect(screen.getByText('Cancel')).toBeVisible();
    expect(screen.getByText('Next')).toBeVisible();
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByLabelText('Test modal')).toBeVisible();
  });

  test('Mobile Modal renders', () => {
    const { baseElement } = render(
      <DeviceTypeProvider deviceType="mobile">
        <Modal
          heading="Heading"
          subHeading="Subheading"
          accessibilityModalLabel="Test modal"
          onDismiss={() => {}}
          size="sm"
          footer={
            <Flex justifyContent="end" gap={2}>
              <Button color="gray" text="Cancel" />
              <Button color="red" text="Next" />
            </Flex>
          }
        >
          Modal content
        </Modal>
      </DeviceTypeProvider>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('Mobile Modal contains all elements correctly', () => {
    render(
      <DeviceTypeProvider deviceType="mobile">
        <Modal
          heading="Heading"
          subHeading="Subheading"
          accessibilityModalLabel="Test modal"
          onDismiss={() => {}}
          size="sm"
          footer={
            <Flex justifyContent="end" gap={2}>
              <Button color="gray" text="Cancel" />
              <Button color="red" text="Next" />
            </Flex>
          }
        >
          Modal content
        </Modal>
      </DeviceTypeProvider>,
    );

    expect(screen.getByText('Heading')).toBeVisible();
    expect(screen.getByText('Subheading')).toBeVisible();
    expect(screen.getByText('Modal content')).toBeVisible();
    expect(screen.getByText('Cancel')).toBeVisible();
    expect(screen.getByText('Next')).toBeVisible();
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByLabelText('Test modal')).toBeVisible();
    expect(screen.getByLabelText('Close modal')).toBeVisible();
  });
});
