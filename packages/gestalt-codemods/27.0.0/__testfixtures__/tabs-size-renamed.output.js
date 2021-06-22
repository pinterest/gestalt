// @flow strict
import { Tabs as GestaltTabs } from 'gestalt';

export default function TabsSizeRenamed() {
  const tabs = [
    { href: "https://pinterest.com", text: "Boards for You", indicator: "dot" },
    { href: "https://pinterest.com", text: "Pins for You" },
    { href: "https://pinterest.com", text: "1" },
    { href: "https://pinterest.com", text: "❤" },
    { href: "https://pinterest.com", text: "Following" },
    { href: "https://pinterest.com", text: "People to Follow" },
  ];

  return <GestaltTabs activeTabIndex={0} onChange={() => {}} tabs={tabs} />;
}
