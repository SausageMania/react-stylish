import React, { forwardRef, cloneElement, useState, useRef, useEffect } from 'react';
import { CCTextField, CCIconButton } from '../../components';
import { ArrowDropDown } from '@material-ui/icons';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  text__field: {
    position: "relative",
  },
  select__field: {
    position: "absolute",
    overflow: "auto",
    boxShadow: "0 2px 1px -1px rgba(0, 0, 0, 0.20)," +
                "0 1px 1px 0px rgba(0, 0, 0, 0.14)," +
                "0 1px 3px 0px rgba(0, 0, 0, 0.12)",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#FFFFFF"
  },
}));

const CCSelect = forwardRef((props, ref) => {
  const { onSelect, children, height } = props;
  const classes = useStyles(props);
  const [isClick, setIsClick] = useState(false);
  const [fieldWidth, setFieldWidth] = useState(0);
  const [fieldHeight, setFieldHeight] = useState(0);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const fieldRef = useRef(null);

  const newChildren = children.map((child, index) => { 
    if(React.isValidElement(child)){
      return cloneElement(child, {key: index, setText: setText, setValue: setValue, height: height});
    }
    return child;
  })

  useEffect(()=>{
    const listener = e => {
      if(!fieldRef.current || fieldRef.current.contains(e.target))
        return;
      setIsClick(false);
    };
    setFieldWidth(fieldRef.current.getBoundingClientRect().width);
    setFieldHeight(fieldRef.current.getBoundingClientRect().height);

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    }
  },[fieldRef]);

  useEffect(()=>{
    if(value)
      onSelect && onSelect(value, text);
  },[value, text, onSelect]);

  return (
    <>
    <div>1231231231</div>
    <div className={classes.text__field} ref={ref}>
      <CCTextField 
        width={100}
        height={height}
        endComponent={
          <CCIconButton onClick={()=>setIsClick(!isClick)} size={height - 10}>
            <ArrowDropDown 
              style={{
                transition: "transform ease-in-out 0.2s", 
                transform: isClick ? "rotate(180deg)" : "none",
              }}
            />
          </CCIconButton>
        }
        onClick={()=>setIsClick(true)}
        value={text}
        readOnly 
        ref={fieldRef} 
      />
      <div className={classes.select__field} style={{ top: fieldHeight + 3, width: fieldWidth }}>
        {newChildren}
      </div>
    </div>
    </>
  )
});

export default CCSelect;