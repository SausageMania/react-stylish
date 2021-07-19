import React, { forwardRef } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  option__field: {
    padding: 5,
    width: "calc(100% - 10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: props => props.height - 10 || 30,
    "&:hover": {
      backgroundColor: theme.palette.result.main,
    },
    fontSize: 15,
    color: props => {
      if(props.color){
        if(theme.palette?.[props.color])
          return theme.palette?.[props.color].main;
        return props.color;
      }
      return null;
    }
  }
}));

const CCOption = forwardRef((props, ref) => {
  const {children, value, setText, setValue, setIsClick, onClick} = props;
  const classes = useStyles(props);

  const onKeyDownHandle = e => {
    if(e.key === "Enter" || e.key === " "){
      setText(children);
      setValue(value);
      setIsClick(false);
    }
  }

  return (
    <span
      className={classes.option__field} 
      onClick={ e => {
        if(e.target)
          setIsClick(false);
        setText(children);
        setValue(value);
        onClick && onClick(e);
      }}
      ref={ref}
      tabIndex="0"
      onKeyDown={onKeyDownHandle}       
    >
      {children}
    </span>
  );
});

export default CCOption;