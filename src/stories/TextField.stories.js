import { CCTextField, CCIconButton, CCFieldGroup } from "../components";
import { Search } from "@material-ui/icons";
import React from "react";

export default {
  title: "TextField",
  component: CCTextField,
};

export const MultiTextField = ({ ...options }) => (
  <div style={{ padding: "5px" }}>
    <CCFieldGroup widthArr={["20%", "20%"]}>
      <CCTextField
        // startComponent={<span>$</span>}
        endComponent={
          <CCIconButton size={20}>
            <Search />
          </CCIconButton>
        }
        helpComponent={<span>Please insert the money cost.</span>}
        onChange={(e) => console.log(e.target.value)}
        rows={1}
        fullWidth
        {...options}
      />
      <CCTextField
        // startComponent={<span>$</span>}
        endComponent={
          <CCIconButton size={20}>
            <Search />
          </CCIconButton>
        }
        helpComponent={<span>Please insert the money cost.</span>}
        onChange={(e) => console.log(e.target.value)}
        rows={1}
        {...options}
      />
    </CCFieldGroup>
  </div>
);

export const SingleTextField = ({ ...options }) => (
  <div style={{ padding: "5px", width: 500 }}>
    <CCTextField
      helpComponent="This is single textfield component."
      {...options}
    />
  </div>
);

SingleTextField.storyName = "single.textfield";
MultiTextField.storyName = "multi.textfield";
