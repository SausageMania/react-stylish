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
    color: "rgba(0, 0, 0, 0.50)",
    transition: "all ease-in-out 0.25s",
  },
  label__focus: {
    transform: props => {
      if(props.height) return `translate(-2px, -${(parseInt(props.height) + 30) / 2}px)`;
      return "translate(-2px, -25px)"
    },
    fontSize: "12px",
    color: theme.palette.primary.main,
  },
  input__field: {
    width: props => props.fullWidth ? "calc(100% - 16px)" : "none",
    height: props => {
      return props.height ? parseInt(props.height) : "20px";
    },
    padding: "14px 10px",
    fontSize: "16px",
    transition: "all ease-in-out 0.25s",
    "&:focus":{
      outline: "none",
    }
  },
  fieldset: {
    
  }
}));

const CCTextField = forwardRef((props, ref) => {
  const classes = useStyles(props);
  const { defaultValue, title, onFocus, onBlur, onChange, ...others } = props;

  const [isFocus, setIsFocus] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(defaultValue));

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
      <label className={clsx(classes.label,{[classes.label__focus]:isFocus || hasValue})}>
        {title}
      </label>
      <input 
        type="text"
        className={classes.input__field}
        onFocus={onFocusHandle}
        onBlur={onBlurHandle}
        onChange={onChangeHandle}
        {...others} 
        ref={ref}
      />
      {/* <fieldset className={classes.fieldset}>
        <legend>{title}</legend>
      </fieldset> */}
    </>
  )
})

export default CCTextField;