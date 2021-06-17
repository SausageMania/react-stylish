import React, { forwardRef, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = createUseStyles(theme=> ({
  textfield__container: {
    position: "relative",
    display: "flex",
  },
  textfield__error: {
    animation: "0.5s ease 1 forwards $error-animation"
  },
  "@keyframes error-animation": {
    "12.5%": {
      transform: "translate(-20px, 0)",
    },
    "25%": {
      transform: "translate(20px, 0)",
    },
    "37.5%": {
      transform: "translate(-15px, 0)",
    },
    "50%": {
      transform: "translate(15px, 0)",
    },
    "62.5%": {
      transform: "translate(-10px, 0)",
    },
    "75%": {
      transform: "translate(5px, 0)",
    },
    "87.5%": {
      transform: "translate(-5px, 0)"
    }
  },
  label: {
    position: "absolute",
    fontSize: "16px",
    top: props => {
      if(props.height) return `${(props.height - 14) / 2 }px` //padding 14를 빼줌.
      if(props.size === "small") return "14px";
      return "18px";
    },
    left: "13px",
    color: props => {
      if(props.disabled) return theme.palette.disabled.rgba;
      if(props.error) return theme.palette.error.main;
      return "rgba(0, 0, 0, 0.56)";
    },
    transition: "all ease-in-out 0.25s",
    backgroundColor: "none",
    pointerEvents: "none",
  },
  label__focus: {
    transform: props => {
      if(props.height) return `translate(-15px, -${props.height / 2 + 9}px)`;
      if(props.size === "small") return "translate(-15px, -31px)";
      return "translate(-15px, -34px)"
    },
    fontSize: "14px",
    padding: "0 3px",
  },
  span__focus: {
    transition: "color ease-in-out 0.25s",
    color: props => {
      if(props.error) return theme.palette.error.main;
      if(theme.palette?.[props.color]) return theme.palette?.[props.color].main;
      return props.color ? props.color : theme.palette.primary.main
    },
  },
  required: {
    color: "red",
    paddingLeft: "2px",
  },
  input__container: {
    width: props => {
      if(props.fullWidth) return "100%";
      return "none";
    },
    display: "flex",
    alignItems: "center",
    outline: "none",
    border: props => {
      if(props.variant === "text") return "1px solid transparent";
      if(props.error) return `1px solid ${theme.palette.error.main}`;
      return "1px solid rgba(0, 0, 0, 0.56)";
    },
    borderBottom: props => {
      if(props.variant === "text" && !props.disableLine){
        if(props.error) return `1px solid ${theme.palette.error.main}`;
        return "1px solid rgba(0, 0, 0, 0.56)";
      }
    },
    borderRadius: props => {
      if(props.variant === "text") return "none";
      if(props.round) {
        const round = (props.round - 1) * 2;
        return `${round}px`;
      }
      return "4px";
    },
    transition: "box-shadow ease-in-out 0.25s",
    "&:hover":{
      border: props => {
        if(props.variant === "text") return "1px solid transparent";
        if(props.error) return `1px solid ${theme.palette.error.main}`;
        return "1px solid black";
      },
      borderBottom: props => {
        if(props.variant === "text" && !props.disableLine){
          if(props.error) return `1px solid ${theme.palette.error.main}`;
          return "1px solid black";
        }
      },
    }
  },
  input__focus: {
    border: props => {
      if(props.variant === "text") return "1px solid transparent";
      if(props.error) return `1px solid ${theme.palette.error.main}`;
      if(theme.palette?.[props.color]) return `1px solid ${theme.palette?.[props.color].main}`;
      return props.color ? `1px solid ${props.color}` : `1px solid ${theme.palette.primary.main}`;
    },
    boxShadow: props => {
      const shadow = props.variant === "text" ? "0 2px 1px" : "0 0 1px 1px";
      if(props.error) return `${shadow} ${theme.palette.error.main}`;
      if(theme.palette?.[props.color]) return `${shadow} ${theme.palette?.[props.color].main}`;
      return props.color 
        ? `${shadow} ${props.color}`
        : `${shadow} ${theme.palette.primary.main}`;
    },
  },
  input__disabled: {
    backgroundColor: theme.palette.inactive.rgba,
    borderRadius: "4px",
    border: "1px solid transparent !important",
  },
  input__field: {
    width: props => {
      if(props.fullWidth) return "calc(100% - 16px)";
      if(props.width) return `${parseInt(props.width) - 20}px`;
      if(props.size === "small") return "120px";
      return "none";
    },
    height: props => {
      if(props.height) return `${props.height - 28}px`; //padding 14*2를 빼줌.
      if(props.size === "small") return "12px";
      return "20px";
    },
    padding: props => {
      const left = props.startComponent ? "3px" : "10px";
      const right = props.endComponent ? "3px" : "10px";
      return `14px ${right} 14px ${left}`;
    },
    fontSize: "16px",
    color: props => props.disabled ? theme.palette.disabled.rgba : "#000",
    userSelect: props => props.disabled ? "none" : "default",
    transition: "all ease-in-out 0.25s",
    border: "none",
    borderRadius: props => {
      if (props.round){
        const round = (props.round - 1) * 2;
        return `${round}px`;
      }
      return "4px";
    },
    backgroundColor: "unset",
    outline: "none",
  },
  extra: {
    padding: "5px",
    position: "relative",
  },
  extra__not__focus: {
    "& > *": {
      color: props => props.disabled ? theme.palette.disabled.rgba : "rgba(0, 0, 0, 0.50)",
    }
  },
  extra__disabled: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  helper__text: {
    position: "absolute",
    opacity: 0,
    top: props => {
      if(props.height) return `${props.height - 6}px`;
      if(props.size === "small") return "36px";
      return "42px";
    },
    left: 5,
    fontSize: "14px",
    color: props => props.error ? theme.palette.error.main : "rgba(0, 0, 0, 0.78)",
    transition: "all ease-in-out 0.25s"
  },
  helper__text__focus: {
    transform: "translate(0, 10px)",
    opacity: 1,
  }
}));

const CCTextField = forwardRef((props, ref) => {
  const classes = useStyles(props);
  const {
    label,
    labelFixed,
    helpFixed, 
    required,
    disabled, 
    fullWidth, 
    startComponent, 
    endComponent, 
    helpComponent,
    placeholder,
    disableLine,
    error,
    errorAnimation, 
    onFocus, 
    onBlur, 
    onChange, 
    ...others 
  } = props;

  const [isFocus, setIsFocus] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(props.defaultValue));

  const inputRef = useRef(null);

  const onFocusHandle = (e) => {
    setIsFocus(true);
    inputRef.current.focus();
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
    <div className={clsx(classes.textfield__container,{[classes.textfield__error]:error && errorAnimation})}>
      <label className={clsx(
          classes.label,
          {[classes.label__focus]:isFocus || hasValue || Boolean(startComponent) || labelFixed}
        )}
      >
        <span className={clsx({[classes.span__focus]:isFocus})}>
          {label}
          {required && <span className={classes.required}>*</span>}
        </span>
      </label>
      <div 
        className={clsx(
          classes.input__container, 
          {
            [classes.input__focus]:isFocus, 
            [classes.input__disabled]:disabled
          }
        )} 
        tabIndex="-1"
        ref={ref}
      >
        {startComponent && (
          <span className={clsx(classes.extra, {[classes.extra__not__focus]:!isFocus})}>
            {disabled && <div className={classes.extra__disabled} />}
            {startComponent}
          </span>
        )}
        <input 
          className={classes.input__field}
          onFocus={onFocusHandle}
          onBlur={onBlurHandle}
          onChange={onChangeHandle}
          placeholder={isFocus || labelFixed || !label ? placeholder : ""}
          disabled={disabled}
          {...others} 
          ref={inputRef}
        />
        {endComponent && (
          <span className={clsx(classes.extra, {[classes.extra__not__focus]:!isFocus})}>
            {disabled && <div className={classes.extra__disabled} />}
            {endComponent}
          </span>
        )}
      </div>
      {helpComponent && (
        <label className={clsx(classes.helper__text,{[classes.helper__text__focus]:isFocus || helpFixed})}>
          {helpComponent}
        </label>
      )}
      
    </div>
  )
})

CCTextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "number"]),
  variant: PropTypes.oneOf(["outlined", "text"]),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(["primary", "secondary", "error", "warning", "sub", "icon"]),
    PropTypes.string
  ]),
  size: PropTypes.oneOf(["medium", "small"]),
  width: PropTypes.number,
  height: PropTypes.number,
  round: PropTypes.number,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  error: PropTypes.bool,
  errorAnimation: PropTypes.bool,
  required: PropTypes.bool,
  labelFixed: PropTypes.bool,
  helpFixed: PropTypes.bool,
  disableLine: PropTypes.bool,
  // startComponent: PropTypes.node,
  // endComponent: PropTypes.node,
}

CCTextField.defaultProps = {
  label: null,
  type: "text",
  variant: "outlined",
  color: "primary",
  size: "medium",
  width: null,
  height: null,
  round: 3,
  defaultValue: null,
  placeholder: null,
  disabled: false,
  fullWidth: false,
  error: false,
  errorAnimation: false,
  required: false,
  labelFixed: false,
  helpFixed: false,
  disableLine: false,
  // startComponent: null,
  // endComponent: null,
}

export default CCTextField;