import React, { forwardRef, cloneElement, useState, useRef, useEffect } from 'react';
import { CCTextField, CCIconButton } from '../../components';
import { ArrowDropDown } from '@material-ui/icons';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = createUseStyles(theme => ({
  text__field: {
    position: "relative",
    width: props => props.fieldWidth && props.fieldWidth,
  },
  select__field: {
    position: "absolute",
    boxShadow: "0 2px 1px -1px rgba(0, 0, 0, 0.20)," +
                "0 1px 1px 0px rgba(0, 0, 0, 0.14)," +
                "0 1px 3px 0px rgba(0, 0, 0, 0.12)",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#FFFFFF",
    zIndex: 1,
    opacity: 0,
    overflow: "auto",
    maxHeight: 500,
    transition: "all linear 0.25s"
  },
  input__behind: {
    position: "absolute",
    zIndex: "-1",
    top: props => props.height / 2 || 15,
    border: "none",
    outline: "none",
    width: 0,
  },
  show__field: {
    opacity: 1,
  }
}));

const CCSelect = forwardRef((props, ref) => {
  const { defaultValue, label, onChange, children, height, width, fieldWidth, ...others } = props;
  const classes = useStyles(props);
  const [isClick, setIsClick] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [optionWidth, setOptionWidth] = useState(0);
  const [optionHeight, setOptionHeight] = useState(0);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");

  const fieldRef = useRef(null);
  const inputRef = useRef(null);
  const optionRef = useRef(null);

  const newChildren = children.map((child, index) => { 
    if(React.isValidElement(child)){
      return cloneElement(child, {
        key: index, 
        setText: setText, 
        setValue: setValue, 
        setIsClick: setIsClick, 
        height: height
      });
    }
    return child;
  });

  const showSelectHandle = () => {
    setIsClick(!isClick);
    
    if(!isClick){
      setShowOption(true);
      fieldRef?.current?.children[0]?.focus();
    }
    else
      fieldRef?.current?.children[0]?.blur();
  }

  useEffect(()=>{
    const listener = e => {
      if(!fieldRef.current || fieldRef.current.contains(e.target))
        return;
      setIsClick(false);
    };
    setOptionWidth(fieldRef.current.getBoundingClientRect().width);
    setOptionHeight(fieldRef.current.getBoundingClientRect().height);

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    }
  },[fieldRef]);

  /* value값이 바뀌면 숨겨진 input을 focus상태로 만들어 부모의 onChange event를 활성화시킴. */
  useEffect(()=>{
    if(value)
      inputRef.current.focus();
  },[value, defaultValue]);

  /* defaultValue값과 일치하는 option component를 찾고 해당 component의 text 값을 가져옴. */
  useEffect(()=>{
    if(defaultValue){
      const child = children.find(child => child.props.value === defaultValue);
      if(child) {
        setText(child.props.children);
        setValue(defaultValue);
      }
      else console.warn(`There is no component with value named '${defaultValue}'`);
    }
  },[defaultValue, children]);

  return (
    <div className={classes.text__field} ref={ref}>
      <CCTextField
        label={label}
        labelFixed={Boolean(value)}
        width={width || 200}
        height={height || 40}
        select
        endComponent={
          <CCIconButton 
            onClick={showSelectHandle} 
            size={height - 10 || 30}
          >
            <ArrowDropDown 
              style={{
                transition: "transform ease-in-out 0.25s", 
                transform: isClick ? "rotate(180deg)" : "none",
              }}
            />
          </CCIconButton>
        }
        onClick={showSelectHandle}
        value={text}
        readOnly 
        ref={fieldRef}
        {...others}
      />
      <input 
        className={classes.input__behind} 
        onFocus={e => onChange && onChange(e)} 
        value={value} 
        readOnly 
        tabIndex="-1"
        ref={inputRef} 
      />
      {showOption && (
        <div
          className={clsx(classes.select__field,{[classes.show__field]: isClick})} 
          style={{ top: optionHeight + 15, width: optionWidth }}
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