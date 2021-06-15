import React, { forwardRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = createUseStyles(theme=> ({
  label: {
    position: "absolute",
    fontSize: "16px",
    top: props => {
      if(props.height) return `${(parseInt(props.height) / 2 + 24)}px`
      return "34px";
    },
    left: "29px",
    color: props => props.disabled ? theme.palette.disabled.rgba : "rgba(0, 0, 0, 0.50)",
    transition: "all ease-in-out 0.25s",
    backgroundColor: "none",
    pointerEvents: "none",
  },
  label__focus: {
    transform: props => {
      if(props.height) return `translate(-2px, -${(parseInt(props.height) + 30) / 2}px)`;
      return "translate(-2px, -25px)"
    },
    fontSize: "13px",
    backgroundColor: "#FFF",
    padding: "0 3px"
  },
  span__focus: {
    transition: "color ease-in-out 0.25s",
    color: theme.palette.primary.main,
  },

  input__field: {
    width: props => props.fullWidth ? "calc(100% - 16px)" : "none",
    height: props => {
      return props.height ? parseInt(props.height) : "20px";
    },
    padding: "14px 10px",
    fontSize: "16px",
    color: props => props.disabled ? theme.palette.disabled.rgba : "#000",
    userSelect: props => props.diabled ? "none" : "default",
    outline: "none",
    border: props => {
      if(props.disabled) return "none";
      return "1px solid rgba(0, 0, 0, 0.78)";
    },
    borderRadius: "3px",
    backgroundColor : props => props.disabled ? theme.palette.inactive.rgba : "none",
    transition: "all ease-in-out 0.25s",
    "&:focus": {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `0 0 1px 1px ${theme.palette.primary.main}`,
    },
  },
}));

const CCTextField = forwardRef((props, ref) => {
  const classes = useStyles(props);
  const {label, placeholder, onFocus, onBlur, onChange, ...others } = props;

  const [isFocus, setIsFocus] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(props.defaultValue));

  const onFocusHandle = (e) => {
    setIsFocus(true);
    onFocus && onFocus(e);
  }
  
  const onBlurHandle = (e) => {
    setIsFocus(false);
    onBlur && onBlur(e);
  }

  const onChangeHandle = (e) => {
    setHasValue(Boolean(e.target.value));
    onChange && onChange(e);
  }

  return (
    <>
      <label className={clsx(classes.label,{ [classes.label__focus]:isFocus || hasValue })}>
        <span className={clsx({[classes.span__focus]:isFocus })}>{label}</span>
      </label>
      <input 
        type="text"
        className={classes.input__field}
        onFocus={onFocusHandle}
        onBlur={onBlurHandle}
        onChange={onChangeHandle}
        placeholder={isFocus || hasValue ? placeholder : ""}
        {...others} 
        ref={ref}
      />
    </>
  )
})

export default CCTextField;