import React, { forwardRef, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const useStyles = createUseStyles((theme) => ({
  phone__field: {
    width: (props) => props.fullWidth && "100%",
    height: (props) => (props.height ? props.height : "36px"),
  },
}));

const CCPhoneField = forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  const { fullWidth, height, ...others } = props;

  const classes = useStyles(props);
  const theme = useTheme();

  return (
    <PhoneInput
      value={value}
      onChange={(phone) => setValue(phone)}
      inputStyle={{
        width: fullWidth && "100%",
        height: height ? height : "36px",
        boxshadow: "0 0 0 0 red",
      }}
      {...others}
    />
  );
});

export default CCPhoneField;
