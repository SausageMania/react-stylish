import React, { forwardRef, useState, useRef, useEffect } from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import clsx from "clsx";

const useStyles = createUseStyles((theme) => ({
  /* 전체 textfield 스타일 */
  root: {
    padding: (props) => {
      // const top = props.label ? "16px" : "0px";
      // const bottom = props.helpComponent ? "16px" : "0px";
      // return `${top} 0 ${bottom} 0`
      return "8px 0 8px 0";
    },
    margin: "6px 0",
    width: (props) => props.fieldWidth && props.fieldWidth,
  },
  /* startComponent와 endComponent를 포함한 input의 기본 스타일 */
  textfield__container: {
    position: "relative",
    display: "flex",
    width: (props) => {
      if (props.fullWidth) return "100%";
    },
  },
  /* errorAnimation이 true일 경우 나타날 animation 스타일 */
  textfield__error: {
    animation: "0.5s ease 1 forwards $error-animation",
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
      transform: "translate(10px, 0)",
    },
    "87.5%": {
      transform: "translate(-5px, 0)",
    },
  },
  /* 기본 label 스타일 */
  label: {
    position: "absolute",
    fontSize: "15px",
    top: (props) => {
      if (props.height) return `${(props.height - 14) / 2}px`; //padding 14를 빼줌.
      if (props.size === "small") return "14px";
      return "18px";
    },
    left: "13px",
    color: (props) => {
      if (props.disabled) return theme.palette.disabled.rgba;
      if (props.error) return theme.palette.error.main;
      return "rgba(0, 0, 0, 0.56)";
    },
    transition: "all linear 0.15s",
    backgroundColor: "none",
    pointerEvents: "none",
  },
  /* input이 focus일 경우 label의 위치를 변경할 스타일 */
  label__focus: {
    transform: (props) => {
      if (props.height) return `translate(-15px, -${props.height / 2 + 9}px)`;
      if (props.size === "small") return "translate(-15px, -31px)";
      return "translate(-15px, -34px)";
    },
    fontSize: "13px",
    padding: "0 3px",
  },
  /* input이 focus일 경우 변경될 label의 font color 스타일 */
  span__focus: {
    transition: "color linear 0.15s",
    color: (props) => {
      if (props.error) return theme.palette.error.main;
      if (theme.palette?.[props.color])
        return theme.palette?.[props.color].main;
      return props.color ? props.color : theme.palette.primary.main;
    },
  },
  /* required가 true일 경우 나타날 *(별표)의 스타일 */
  required: {
    color: "red",
    paddingLeft: "2px",
  },
  input__container: {
    width: (props) => {
      if (props.fullWidth) return "100%";
      return "none";
    },
    display: "flex",
    alignItems: "center",
    outline: "none",
    borderTop: (props) => {
      if (props.variant === "text") return "1px solid transparent";
      if (props.error) return `1px solid ${theme.palette.error.main}`;
      return "1px solid rgba(0, 0, 0, 0.56)";
    },
    borderBottom: (props) => {
      if (props.variant === "text") {
        if (props.error) return `1px solid ${theme.palette.error.main}`;
        if (props.disableLine) return "none";
      }
      if (props.error) return `1px solid ${theme.palette.error.main}`;
      return "1px solid rgba(0, 0, 0, 0.56)";
    },
    borderLeft: (props) => {
      if (props.variant === "text") return "1px solid transparent";
      if (props.error) return `1px solid ${theme.palette.error.main}`;
      if (props.location) {
        if (props.location === "start") return "1px solid rgba(0, 0, 0, 0.56)";
        return "none";
      }
      return "1px solid rgba(0, 0, 0, 0.56)";
    },
    borderRight: (props) => {
      if (props.variant === "text") return "1px solid transparent";
      if (props.error) return `1px solid ${theme.palette.error.main}`;
      // if(props.location){
      //   if(props.location === "start")
      //     return "1px solid rgba(0, 0, 0, 0.56)";
      //   return "none";
      // }
      return "1px solid rgba(0, 0, 0, 0.56)";
    },
    borderRadius: (props) => {
      if (props.variant === "text") return "none";
      const round = props.round ? (props.round - 1) * 2 + "px" : "4px";
      if (props.location) {
        if (props.location === "start") return `${round} 0 0 ${round}`;
        if (props.location === "middle") return "none";
        if (props.location === "end") return `0 ${round} ${round} 0`;
      }
      return round;
    },
    transition: "box-shadow linear 0.15s",
  },
  /* startComponent와 endComponent를 포함한 input이 focus될 때의 스타일 */
  input__focus: {
    border: (props) => {
      if (props.variant === "text") return "1px solid transparent";
      if (props.error) return `1px solid ${theme.palette.error.main}`;
      if (theme.palette?.[props.color])
        return `1px solid ${theme.palette?.[props.color].main}`;
      return props.color
        ? `1px solid ${props.color}`
        : `1px solid ${theme.palette.primary.main}`;
    },
    boxShadow: (props) => {
      const shadow = props.variant === "text" ? "0 2px 1px" : "0 0 1px 1px";
      if (props.error) return `${shadow} ${theme.palette.error.main}`;
      if (theme.palette?.[props.color])
        return `${shadow} ${theme.palette?.[props.color].main}`;
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
  /* input 태그의 스타일 (startComponent와 endComponent는 해당되지 않음.) */
  input__field: {
    width: (props) => {
      if (props.fullWidth) return "calc(100% - 20px)";
      if (props.width) return `${parseInt(props.width) - 13}px`;
      if (props.size === "small") return "120px";
      return "none";
    },
    height: (props) => {
      if (props.height) return props.height;
      if (props.size === "small") return "40px";
      return "50px";
    },
    padding: (props) => {
      const left = props.startComponent ? "3px" : "10px";
      const right = props.endComponent ? "3px" : "10px";
      return `0 ${right} 0 ${left}`;
    },
    fontSize: "15px",
    cursor: (props) => props.select && !props.autoComplete && "pointer",
    color: (props) => (props.disabled ? theme.palette.disabled.rgba : "#000"),
    userSelect: (props) => (props.disabled ? "none" : "default"),
    transition: (props) => (props.multiline ? "none" : "all ease-in-out 0.25s"),
    border: "none",
    borderRadius: (props) => {
      if (props.round) {
        const round = (props.round - 1) * 2;
        return `${round}px`;
      }
      return "4px";
    },
    // resize: props => {
    //   if(props.disableResize && props.multiline) return "none";
    // },
    backgroundColor: "unset",
    outline: "none",
  },
  textarea__field: {
    width: (props) => {
      if (props.fullWidth) return "calc(100% - 20px)";
      if (props.width) return `${parseInt(props.width) - 13}px`;
      if (props.size === "small") return "120px";
    },
    height: (props) => {
      if (props.multiline) return "none";
      if (props.height) return props.height;
      if (props.size === "small") return "40px";
      return "50px";
    },
    padding: (props) => {
      const left = props.startComponent ? "3px" : "10px";
      const right = props.endComponent ? "3px" : "10px";
      return `14px ${right} 14px ${left}`;
    },
    fontSize: "15px",
    fontFamily: "inherit",
    textAlign: "inherit",
    color: (props) => (props.disabled ? theme.palette.disabled.rgba : "#000"),
    userSelect: (props) => (props.disabled ? "none" : "default"),
    border: "none",
    borderRadius: (props) => {
      if (props.round) {
        const round = (props.round - 1) * 2;
        return `${round}px`;
      }
      return "4px";
    },
    overflow: "auto",
    resize: (props) => {
      if (props.disableResize || props.disabled) return "none";
      if (props.fullWidth) return "vertical";
    },
    backgroundColor: "unset",
    outline: "none",
  },
  /* startComponent와 endComponent 스타일 */
  extra: {
    padding: "0 5px",
    position: "relative",
  },
  /* textfield가 focus상태가 아닐때의 스타일 */
  extra__not__focus: {
    color: (props) =>
      props.disabled ? theme.palette.disabled.rgba : "rgba(0, 0, 0, 0.50)",
    "& > *": {
      color: (props) =>
        props.disabled ? theme.palette.disabled.rgba : "rgba(0, 0, 0, 0.50)",
    },
  },
  extra__disabled: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  /* helpComponent의 스타일 */
  help__component: {
    position: "absolute",
    opacity: 0,
    bottom: -10,
    left: 5,
    fontSize: "13px",
    color: (props) =>
      props.error ? theme.palette.error.main : "rgba(0, 0, 0, 0.78)",
    transition: "all ease-in-out 0.25s",
  },
  /* textfield가 focus상태일 때의 helpComponent 스타일 */
  help__component__focus: {
    transform: "translate(0, 10px)",
    opacity: 1,
  },
}));

const CCTextField = forwardRef((props, ref) => {
  const classes = useStyles(props);
  const {
    value,
    className,
    fieldWidth,
    label,
    labelFixed,
    helpFixed,
    select,
    required,
    disabled,
    fullWidth,
    multiline,
    disableResize,
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
  const inputRef = useRef(null);

  const [isFocus, setIsFocus] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(props.defaultValue));

  const onFocusHandle = (e) => {
    setIsFocus(true);
    onFocus && onFocus(e);
  };

  const onBlurHandle = (e) => {
    setIsFocus(false);
    onBlur && onBlur(e);
  };

  const onChangeHandle = (e) => {
    setHasValue(Boolean(e.target.value));
    onChange && onChange(e);
  };

  useEffect(() => {
    if (props.value || props.defaultValue) setHasValue(true);
  }, [props.value, props.defaultValue]);

  return (
    <div className={clsx(classes.root, className)}>
      <div
        className={clsx(classes.textfield__container, {
          [classes.textfield__error]: errorAnimation,
        })}
      >
        <label
          className={clsx(classes.label, {
            [classes.label__focus]:
              isFocus || hasValue || Boolean(startComponent) || labelFixed,
          })}
        >
          <span className={clsx({ [classes.span__focus]: isFocus })}>
            {label}
            {required && <span className={classes.required}>*</span>}
          </span>
        </label>
        <div
          className={clsx(classes.input__container, {
            [classes.input__focus]: isFocus,
            [classes.input__disabled]: disabled,
          })}
          tabIndex="-1"
          ref={ref}
        >
          {startComponent && (
            <span
              className={clsx(classes.extra, {
                [classes.extra__not__focus]: !isFocus,
              })}
            >
              {disabled && <div className={classes.extra__disabled} />}
              {startComponent}
            </span>
          )}
          {multiline ? (
            <textarea
              className={classes.textarea__field}
              onFocus={onFocusHandle}
              onBlur={onBlurHandle}
              onChange={onChangeHandle}
              placeholder={
                isFocus || labelFixed || !label || startComponent
                  ? placeholder
                  : ""
              }
              disabled={disabled}
              value={value || ""}
              {...others}
            />
          ) : (
            <input
              className={classes.input__field}
              onFocus={onFocusHandle}
              onBlur={onBlurHandle}
              onChange={onChangeHandle}
              placeholder={
                isFocus || labelFixed || !label || startComponent
                  ? placeholder
                  : ""
              }
              disabled={disabled}
              ref={inputRef}
              value={value || ""}
              {...others}
            />
          )}

          {endComponent && (
            <span
              className={clsx(classes.extra, {
                [classes.extra__not__focus]: !isFocus,
              })}
            >
              {disabled && <div className={classes.extra__disabled} />}
              {endComponent}
            </span>
          )}
        </div>
        {helpComponent && (
          <label
            className={clsx(classes.help__component, {
              [classes.help__component__focus]: isFocus || helpFixed,
            })}
          >
            {helpComponent}
          </label>
        )}
      </div>
    </div>
  );
});

CCTextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "number"]),
  variant: PropTypes.oneOf(["outlined", "text"]),
  color: PropTypes.oneOfType([
    PropTypes.oneOf([
      "primary",
      "secondary",
      "error",
      "warning",
      "sub",
      "icon",
    ]),
    PropTypes.string,
  ]),
  /* multiline이 true라면 textarea태그로 변경 */
  multiline: PropTypes.bool,
  /* textarea의 크기조정 여부 */
  disableResize: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),
  width: PropTypes.number,
  height: PropTypes.number,
  /* variant가 outlined일 때 borderRadius 크기 (1부터) */
  round: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  error: PropTypes.bool,
  errorAnimation: PropTypes.bool,
  required: PropTypes.bool,
  /* label을 위쪽에 고정시킬지 여부 */
  labelFixed: PropTypes.bool,
  /* helpComponent를 아래쪽에 고정시킬지 여부 */
  helpFixed: PropTypes.bool,
  /* variant가 text일 때 borderBottom을 제거할지 여부 */
  disableLine: PropTypes.bool,

  // startComponent: PropTypes.node,
  // endComponent: PropTypes.node,
  // helpComponent: PropTypes.node,
};

CCTextField.defaultProps = {
  label: null,
  type: "text",
  variant: "outlined",
  color: "primary",
  multiline: false,
  disableResize: false,
  size: "medium",
  width: null,
  height: null,
  round: 3,
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
  // helpComponent: null,
};

export default CCTextField;
