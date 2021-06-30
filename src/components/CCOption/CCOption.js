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
  }
}));

const CCOption = forwardRef((props, ref) => {
  const {children, value, setText, setValue, setIsClick} = props;
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
      onClick={()=>{
        setText(children);
        setValue(value);
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