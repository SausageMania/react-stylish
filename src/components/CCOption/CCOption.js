import React, { forwardRef } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  option__field: {
    padding: 5,
    width: "calc(100% - 10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 20,
    "&:hover": {
      backgroundColor: theme.palette.result.main,
    },
  }

}));

const CCOption = forwardRef((props, ref) => {
  const {children, value, setText, setValue} = props;
  const classes = useStyles(props);

  return (
    <span
      className={classes.option__field} 
      onClick={()=>{
        setText(children);
        setValue(value);
      }}
      ref={ref}
    >
      {children}
    </span>
  );
});

export default CCOption;