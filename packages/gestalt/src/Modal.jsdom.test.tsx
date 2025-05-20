import { render, screen } from '@testing-library/react';
import Button from './Button';
import DeviceTypeProvider from './contexts/DeviceTypeProvider';
import Flex from './Flex';
import Modal from './Modal';

describe('Modal', () => {
  test('Desktop Modal renders', () => {
    const { baseElement } = render(
      <Modal
        accessibilityModalLabel="Test modal"
        footer={
          <Flex gap={2} justifyContent="end">
            <Button color="gray" text="Cancel" />
            <Button color="red" text="Next" />
          </Flex>
        }
        heading="Heading"
        onDismiss={() => {}}
        size="sm"
        subHeading="Subheading"
      >
        Modal content
      </Modal>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('Desktop Modal contains all elements correctly', () => {
    render(
      <Modal
        accessibilityModalLabel="Test modal"
        footer={
          <Flex gap={2} justifyContent="end">
            <Button color="gray" text="Cancel" />
            <Button color="red" text="Next" />
          </Flex>
        }
        heading="Heading"
        onDismiss={() => {}}
        size="sm"
        subHeading="Subheading"
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
          accessibilityModalLabel="Test modal"
          footer={
            <Flex gap={2} justifyContent="end">
              <Button color="gray" text="Cancel" />
              <Button color="red" text="Next" />
            </Flex>
          }
          heading="Heading"
          onDismiss={() => {}}
          size="sm"
          subHeading="Subheading"
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
          accessibilityModalLabel="Test modal"
          footer={
            <Flex gap={2} justifyContent="end">
              <Button color="gray" text="Cancel" />
              <Button color="red" text="Next" />
            </Flex>
          }
          heading="Heading"
          onDismiss={() => {}}
          size="sm"
          subHeading="Subheading"
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
    expect(screen.getByLabelText('Bottom sheet')).toBeVisible();
    expect(screen.getByLabelText('Dismiss bottom sheet')).toBeVisible();
  });

  test('Modal shows data test id when passed as a prop', ()=>{
    render(
      <Modal
      accessibilityModalLabel="Test modal"
      dataTestId="custom-modal-test-id"
      heading="Heading"
      onDismiss={() => {}}
      size="sm"
    >
      Modal content
    </Modal>

    );

    const modalContainer = screen.getByTestId('custom-modal-test-id');
    expect(modalContainer).toBeInTheDocument();
    expect(modalContainer).toBeVisible();
  })
});
