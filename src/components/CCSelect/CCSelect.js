import React, { forwardRef, cloneElement, useState, useRef, useEffect } from 'react';
import { CCTextField, CCIconButton } from '../../components';
import { ArrowDropDown } from '@material-ui/icons';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = createUseStyles(theme => ({
  text__field: {
    position: "relative",
  },
  select__field: {
    position: "absolute",
    boxShadow: "0 2px 1px -1px rgba(0, 0, 0, 0.20)," +
                "0 1px 1px 0px rgba(0, 0, 0, 0.14)," +
                "0 1px 3px 0px rgba(0, 0, 0, 0.12)",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#FFFFFF",
    opacity: 0,
    overflow: "hidden",
    transition: "all linear 0.25s"
  },
  input__behind: {
    position: "absolute",
    zIndex: "-1",
    top: props => props.height / 2 || 15,
    border: "none",
    outline: "none",
    width: 0
  },
  show__field: {
    opacity: 1,
  }
}));

const CCSelect = forwardRef((props, ref) => {
  const { label, onChange, children, height } = props;
  const classes = useStyles(props);
  const [isClick, setIsClick] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [fieldWidth, setFieldWidth] = useState(0);
  const [fieldHeight, setFieldHeight] = useState(0);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");

  const fieldRef = useRef(null);
  const inputRef = useRef(null);
  const optionRef = useRef(null);

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
      inputRef.current.focus();
  },[value]);

  return (
    <div className={classes.text__field} ref={ref}>
      <CCTextField
        label={label}
        labelFixed={Boolean(value)}
        width={100}
        height={height || 30}
        endComponent={
          <CCIconButton 
            onClick={()=>{
              setIsClick(!isClick);
              if(!isClick)
                setShowOption(true);
            }} 
            size={height - 10 || 20}
          >
            <ArrowDropDown 
              style={{
                transition: "transform ease-in-out 0.2s", 
                transform: isClick ? "rotate(180deg)" : "none",
              }}
            />
          </CCIconButton>
        }
        onClick={()=>{
          setIsClick(true);
          setShowOption(true);
        }}
        value={text}
        readOnly 
        ref={fieldRef} 
      />
      <input className={classes.input__behind} value={value} ref={inputRef} onFocus={e => onChange(e)} readOnly />
      {showOption && (
        <div
          className={clsx(classes.select__field,{[classes.show__field]: isClick})} 
          style={{ top: fieldHeight + 10, width: fieldWidth }}
          onTransitionEnd={()=>setShowOption(false)}
          ref={optionRef}
         >
          {newChildren}
        </div>
      )}
      
      
    </div>
  )
});

export default CCSelect;