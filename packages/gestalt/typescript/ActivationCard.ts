import type { Node } from "react";
import { Fragment } from "react";
import classnames from "classnames";
import Box from "./Box";
import Heading from "./Heading";
import Icon from "./Icon";
import IconButton from "./IconButton";
import Button from "./Button";
import Text from "./Text";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
import styles from "./ActivationCard.css";
type LinkData = {
  accessibilityLabel: string;
  href: string;
  label: string;
  onClick?: AbstractEventHandler<
    | React.MouseEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLButtonElement>,
    {
      dangerouslyDisableOnNavigation: () => void;
    }
  >;
  rel?: "none" | "nofollow";
  target?: null | "self" | "blank";
};
type Props = {
  dismissButton?: {
    accessibilityLabel: string;
    onDismiss: () => void;
  };
  message: string;
  link?: LinkData;
  status: "notStarted" | "pending" | "needsAttention" | "complete";
  statusMessage: string;
  title: string;
};
const STATUS_ICONS = {
  notStarted: undefined,
  pending: {
    symbol: "clock",
    color: "gray",
  },
  needsAttention: {
    symbol: "workflow-status-problem",
    color: "red",
  },
  complete: {
    symbol: "check-circle",
    color: "green",
  },
};

const ActivationCardLink = ({ data }: { data: LinkData }): Node => {
  const { accessibilityLabel, href, label, onClick, rel, target } = data;
  return (
    <Box
      alignItems="center"
      paddingX={1}
      marginTop={8}
      marginEnd="auto"
      marginStart="auto"
      rounding="pill"
    >
      <Button
        accessibilityLabel={accessibilityLabel}
        color="gray"
        href={href}
        fullWidth
        onClick={onClick}
        rel={rel}
        role="link"
        size="lg"
        text={label}
        target={target}
      />
    </Box>
  );
};

const CompletedCard = ({
  dismissButton,
  message,
  status,
  statusMessage,
  title,
}: Props): Node => {
  const icon = STATUS_ICONS[status];
  return (
    <Fragment>
      <Box display="flex">
        {icon && (
          <Box display="flex" alignContent="center">
            <Box marginEnd={4}>
              <Icon
                accessibilityLabel={statusMessage}
                icon={icon.symbol}
                color={icon.color}
                size={40}
              />
            </Box>
          </Box>
        )}
        <Box>
          <Box>
            <Heading size="sm">{title}</Heading>
          </Box>
          {message && (
            <Box
              flex="grow"
              direction="column"
              alignContent="start"
              marginTop={2}
            >
              <Text color="gray" size="md">
                {message}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
      {dismissButton && (
        <div className={classnames(styles.rtlPos)}>
          <IconButton
            accessibilityLabel={dismissButton.accessibilityLabel}
            icon="cancel"
            iconColor="gray"
            onClick={dismissButton.onDismiss}
            padding={4}
            size="sm"
          />
        </div>
      )}
    </Fragment>
  );
};

const UncompletedCard = ({
  dismissButton,
  message,
  link,
  status,
  statusMessage,
  title,
}: Props): Node => {
  const isStarted = status !== "notStarted";
  const icon = STATUS_ICONS[status];
  return (
    <Fragment>
      <Box display="flex" alignContent="center" height={24}>
        {icon && (
          <Box marginEnd={2}>
            <Icon
              accessibilityLabel={statusMessage}
              icon={icon.symbol}
              color={icon.color}
              size={24}
            />
          </Box>
        )}
        <Box alignSelf="center" marginTop={isStarted ? 0 : 1}>
          <Text color={isStarted ? "darkGray" : "gray"} weight="bold" size="md">
            {statusMessage}
          </Text>
        </Box>
      </Box>
      <Box marginTop={6}>
        <Heading size="sm">{title}</Heading>
      </Box>
      {message && (
        <Box flex="grow" direction="column" alignContent="start" marginTop={2}>
          <Text color="gray" size="md">
            {message}
          </Text>
        </Box>
      )}
      {link && (
        <Box>
          <ActivationCardLink data={link} />
        </Box>
      )}
      {dismissButton && (
        <div className={classnames(styles.rtlPos)}>
          <IconButton
            accessibilityLabel={dismissButton.accessibilityLabel}
            icon="cancel"
            iconColor="gray"
            onClick={dismissButton.onDismiss}
            padding={4}
            size="sm"
          />
        </div>
      )}
    </Fragment>
  );
};
/**
 * https://gestalt.pinterest.systems/ActivationCard
 */

export default function ActivationCard({
  dismissButton,
  message,
  link,
  status,
  statusMessage,
  title,
}: Props): Node {
  const isCompleted = status === "complete";
  return (
    <Box
      display="flex"
      flex="grow"
      borderStyle="shadow"
      rounding={4}
      padding={6}
      maxWidth={400}
      position="relative"
      direction="column"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      {isCompleted ? (
        <CompletedCard
          dismissButton={dismissButton}
          message={message}
          status={status}
          statusMessage={statusMessage}
          title={title}
        />
      ) : (
        <UncompletedCard
          dismissButton={dismissButton}
          link={link}
          message={message}
          status={status}
          statusMessage={statusMessage}
          title={title}
        />
      )}
    </Box>
  );
}