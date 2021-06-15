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
    color: props => {
      if(theme.palette?.[props.color]) return theme.palette?.[props.color].main;
      return props.color ? props.color : theme.palette.primary.main
    },
  },

  input__field: {
    width: props => {
      if(props.fullWidth) return "calc(100% - 16px)";
      if(props.width) return `${parseInt(props.width) - 16}px`;
      return "none";
    },
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
      border: props => {
        if(theme.palette?.[props.color]) return `1px solid ${theme.palette?.[props.color].main}`;
        return props.color ? `1px solid ${props.color}` : `1px solid ${theme.palette.primary.main}`;
      },
      boxShadow: props => {
        if(theme.palette?.[props.color]) return `0 0 1px 1px ${theme.palette?.[props.color].main}`;
        return props.color 
          ? `0 0 1px 1px ${props.color}`
          : `0 0 1px 1px ${theme.palette.primary.main}`;
      },
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
      <div>
      
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
      </div>
    </>
  )
})

export default CCTextField;