import { CCTabs } from "../components";
import React, { useState } from "react";

export default {
  title: "Tabs",
  component: CCTabs,
};

const tabList = [
  { value: 0, label: "Theater" },
  { value: 1, label: "Convenient store" },
  { value: 2, label: "Apartment" },
  { value: 3, label: "Hotel", disabled: true },
  { value: 4, label: "Amusement Park" },
  { value: 5, label: "Home" },
];

export const Tabs = ({ ...options }) => {
  const [value, setValue] = useState(0);

  return (
    <CCTabs
      tabList={tabList}
      value={value}
      onChange={(val) => setValue(val)}
      {...options}
    />
  );
};

Tabs.storyName = "single.tabs";
