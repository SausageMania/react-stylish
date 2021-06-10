import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(theme => ({
  button: {
    width: props => {
      if(props.fullWidth) return "100%"; 
      if(props.width) return props.width;
      // return "auto";
    },
    minWidth: props => {
      if(props.size === "medium") return "64px";
      if(props.size === "small") return "48px";
      return "64px";
    },
    height: props => props.height ? props.height : 'auto',
    color: props => {
      if (props.variant === "contained" || props.selected) return "#FFFFFF";
      if (theme.palette?.[props.color]) return theme.palette?.[props.color].main;
      return props.color ? props.color : theme.palette.primary.main;
    },
    background: props => {
      if (props.selected) return theme.palette.selected.main;
      if(props.variant === "contained"){
        if (theme.palette?.[props.color]) return theme.palette?.[props.color].main;
        return props.color ? props.color : theme.palette.primary.main;
      }
      return "none";
    },
    fontSize: props => {
      if(props.size === "medium") return "14px";
      if(props.size === "small") return "12px";
      return "14px";
    },
    border: props => {
      if (props.selected) return "none";
      if (props.variant === "outlined") {
        if (theme.palette?.[props.color]) 
          return `1px solid ${theme.palette?.[props.color].main}80`;
        return props.color ? `1px solid ${props.color}80` : "1px solid rgba(0, 0, 0, 0.23)";
      }
      if (props.variant === "dashed") {
        if(theme.palette?.[props.color])
          return `1px dashed ${theme.palette?.[props.color].main}`;
        return props.color ? `1px dashed ${props.color}` : "1px dashed rgba(0, 0, 0, 0.23)";
      }
      return "none";
    },
    borderRadius: props => {
      if (props.round){
        const round = (props.round - 1) * 2;
        return `${round}px`;
      }
      return "4px";
    },
    letterSpacing: "0,02857rem",
    fontWeight: "500",
    padding: props => {
      if(props.size === "small") {
        if((props.variant === "outlined" || props.variant === "dashed") && !props.selected) 
          return "0.5px 7px";
        return "1.5px 8px";
      }
      if((props.variant === "outlined" || props.variant === "dashed") && !props.selected) 
        return "5px 15.5px";
      return "6px 16.5px";
    },
    lineHeight: "1.75",
    cursor: "pointer",
    transition: "background-color 250ms",
    overflow: "hidden",
    position: "relative",
    boxSizing: "border-box",
    boxShadow: props => {
      if(props.variant === "contained")
        return "0px 3px 1px -2px rgba(0, 0, 0, 0.2)," + 
                "0px 2px 2px 0px rgba(0, 0, 0, 0.14)," +
                "0px 1px 5px 0px rgba(0, 0, 0, 0.12)"
    },
    "&:hover": {
      background: props => {
        if (props.selected) return theme.palette.selected.dark;
        if (props.variant === "contained") {
          if (props.disabled) return "rgba(0, 0, 0, 0.12)";
          if (theme.palette?.[props.color]) return theme.palette?.[props.color].dark;
          return props.color ? props.color : theme.palette.primary.dark;
        }
        if (props.disabled) return "none";
        return "rgb(236, 236, 236)";
      },
    },
    "&:active": {
      boxShadow: props => {
        if(props.variant === "contained" && !props.disabled) 
          return "0px 3px 1px -2px rgba(0, 0, 0, 0.2)," + 
                  "0px 2px 2px 0px rgba(0, 0, 0, 0.14)," +
                  "0px 1px 5px 0px rgba(0, 0, 0, 0.12)," +
                  "0px 5px 10px 3px rgba(0, 0, 0, 0.16)"
        return "none";
      },
    },
    "&:disabled": {
      color: props => {
        if (props.selected) return "#ffffff";
        return "rgba(0, 0, 0, 0.38)";
      },
      background: props => {
        if (props.selected) return theme.palette.selected.main;
        if (props.variant === "contained") return "rgba(0, 0, 0, 0.12)";
        return "none";
      },
      border: props => {
        if (props.variant === "outlined")
          return "1px solid rgba(0, 0, 0, 0.12)";
        if (props.variant === "dashed")
          return "1px dashed rgba(0, 0, 0, 0.32)";
        return "none";
      },
      boxShadow: "none",
      cursor: "default",
    }
  },
  ripple: {
    width: "5px",
    height: "5px",
    position: "absolute",
    background: props => {
      if (props.variant === "contained") return "#FFFFFF";
      if (theme.palette?.[props.color]) return theme.palette?.[props.color].main;
      return props.color ? props.color : theme.palette.primary.main;
    },
    display: "block",
    borderRadius: "9999px",
    opacity: "1",
    animation: "1s ease 1 forwards $ripple-effect",
  },
  "@keyframes ripple-effect": {
    "from": {
      opacity: "0.2",
      transform: "scale(1)",
    },
    "to": {
      opacity: "0",
      transform: "scale(100)",
    }
  },

  content:{
    position: "relative",
    zIndex: "2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  startIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > svg " : {
      fontSize: props => props.size === "small" ? "20px" : "24px",
    },
    marginLeft: props => props.size === "small" ? "-2px" :"-4px",
    marginRight: props => props.size === "small" ? "6px" :"8px"
  },
  endIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > svg " : {
      fontSize: props => props.size === "small" ? "20px" : "24px",
    },
    marginLeft: props => props.size === "small" ? "6px" :"8px",
    marginRight: props => props.size === "small" ? "-2px" :"-4px"
  }
}));

const CCButton = (props) => {
  const classes = useStyles(props);
  const {children, onMouseDown, startIcon, endIcon, fullWidth, disableRipple, ...others} = props;

  const [coords, setCoords] = useState({x: -1, y: -1});
  const [isRippling, setIsRippling] = useState(false);

  useEffect(()=>{
    if(coords.x !== -1 && coords.y !== -1){
      setIsRippling(true);
    }else setIsRippling(false);
  },[coords]);

  // mouseDown event 발생시 ripple 활성화
  const onMouseDownHandle = (e) => {
    if (!disableRipple){
      const rect = e.currentTarget.getBoundingClientRect();
      setIsRippling(false);
      setCoords({x: e.clientX - rect.left, y: e.clientY - rect.top});
    }
    onMouseDown && onMouseDown();
  }

  return (
    <button 
      className={classes.button} 
      onMouseDown={onMouseDownHandle}
      onAnimationEnd={()=>setIsRippling(false)}
      {...others}
    >
      {isRippling && (
        <span className={classes.ripple} style={{left: coords.x, top: coords.y}} />
      )}
      
      <span className={classes.content}>
        {startIcon && <span className={classes.startIcon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={classes.endIcon}>{endIcon}</span>}
      </span>
    </button>
    );
};

CCButton.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.oneOf(["primary", "secondary", "error", "warning", "sub", "icon"]),
    PropTypes.string
  ]),
  variant: PropTypes.oneOf(["text", "outlined", "contained", "dashed"]),
  round: PropTypes.number,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(["medium", "small"]),
  disableRipple: PropTypes.bool,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
};

CCButton.defaultProps = {
  color: "primary",
  variant: "text",
  round: 3,
  disabled: false,
  selected: false,
  size: "medium",
  disableRipple: false,
}

export default CCButton;