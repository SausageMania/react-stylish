import React from "react";
import { CCPhoneField } from "../components";

export default {
  title: "PhoneField",
  component: CCPhoneField,
};

export const PhoneField = ({ ...options }) => (
  <div style={{ padding: "5px" }}>
    <CCPhoneField />
  </div>
);

PhoneField.storyName = "single.PhoneField";
