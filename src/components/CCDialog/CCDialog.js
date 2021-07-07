import React, { forwardRef, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  root: {
    position: "fixed",
    transition: "opacity ease-out 0.2s",
    zIndex: 1300,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog__contents: {
    backgroundColor: "white",
    borderRadius: 4,
    width: props => props.width || "none",
    height: props => props.height || "none",
    boxShadow: "0 2px 1px -1px rgba(0, 0, 0, 0.20)," +
                "0 1px 1px 0px rgba(0, 0, 0, 0.14)," +
                "0 1px 3px 0px rgba(0, 0, 0, 0.12)",
  }
}));

const CCDialog = forwardRef((props, ref) => {
  const classes = useStyles(props);
  const { children, open, onClose } = props;
  const fieldRef = useRef(null);

  useEffect(()=>{
    const listener = e => {
      if(!fieldRef.current || !e.target.contains(fieldRef.current))
        return;
      onClose && onClose();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    }
  },[fieldRef, onClose]);

  return (
    <>
    {open && (
      <div className={classes.root} ref={fieldRef}>
        <div className={classes.dialog__contents} ref={ref}>
          {children}
        </div>
      </div>
    )}
    </>
  )
});

export default CCDialog;