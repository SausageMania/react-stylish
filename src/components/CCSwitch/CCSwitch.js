import React, { useState, forwardRef } from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(theme => ({
  label__input: {
    display: "none",
    "&:checked":{
      "& ~ $switch__marble": {
        left: props => props.size === "small" ? "27px" : "33px",
        boxShadow: props => props.disabled ? "none" : "-2px 0px 10px 1px rgba(0, 0, 0, 0.32)"
      },
      "& ~ $switch__on": {
        opacity: 1,
      },
      "& ~ $switch__off": {
        opacity: 0,
      },
    }
  },
  label__switch: {
    overflow: "hidden",
    position: "relative",
    display: "inline-block",
    width: props => props.size === "small" ? "46px" : "58px",
    height: props => props.size === "small" ? "20px" :"26px",
    borderRadius: "9999px",
    backgroundColor: props => {
      if (props.disabled) return theme.palette.inactive.rgba;
      if (props.colors){
        if (theme.palette?.[props.colors[1]]) return theme.palette?.[props.colors[1]].main;
        return props.colors[1];
      }
      return theme.palette.sub.main;
    },
    color: "#FFFFFF",
    fontWeight: "bold",
    cursor: props => props.disabled ? "default" : "pointer",
    transition: "all ease-in-out 0.3s",
    "& > *": {
      transition: "inherit",
      fontSize: props => props.size === "small" ? "12px" : "14px",
    },
  },
  label__check: {
    backgroundColor: props => {
      if (props.disabled) return theme.palette.inactive.rgba;
      if (props.colors){
        if (theme.palette?.[props.colors[0]]) return theme.palette?.[props.colors[0]].main;
        return props.colors[0];
      }
      return theme.palette.sub.main;
    },
  },
  switch__marble: {
    position: "absolute",
    top: "1px",
    left: "1px",
    display: "block",
    width: props => props.size === "small" ? "18px" : "24px",
    height: props => props.size === "small" ? "18px" : "24px",
    backgroundColor: "#FFFFFF",
    borderRadius: "9999px",
    boxShadow: props => props.disabled ? "none" : "2px 0px 10px 1px rgba(0, 0, 0, 0.32)",
  },
  switch__on: {
    paddingLeft: props => props.size === "small" ? "8px" : "10px",
    lineHeight: props => props.size === "small" ? "21px" : "25px",
    userSelect: "none",
    opacity: 0,
  },
  switch__off: {
    lineHeight: props => props.size === "small" ? "21px" : "25px",
    paddingLeft: "4px",
    userSelect: "none",
    opacity: 1,
  }
}));

const CCSwitch = forwardRef((props, ref) => {
  const classes = useStyles(props);
  const {onChange, checked, disabled, ...others} = props;
  const [check, setCheck] = useState(checked ? checked : false);

  const onChangeHandle = (e) => {
    setCheck(!check)
    onChange && onChange(e);
  }

  return (
    <label className={clsx(classes.label__switch,{[classes.label__check]:check})} {...others}>
      <input 
        type="checkbox" 
        className={classes.label__input} 
        checked={check} 
        onChange={onChangeHandle}
        disabled={disabled}
        ref={ref} 
      />
      <span className={classes.switch__marble}></span>
      <span className={classes.switch__on}>on</span>
      <span className={classes.switch__off}>off</span>
    </label>
  );
});

CCSwitch.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOf(["medium", "small"]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

CCSwitch.defaultProps = {
  colors: ["primary", "sub"],
  size: "medium",
  checked: false,
  disabled: false,
}

export default CCSwitch;