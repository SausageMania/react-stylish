import React, { forwardRef, cloneElement, useState, useRef, useEffect, useMemo } from 'react';
import { CCTextField, CCIconButton } from '../../components';
import { ArrowDropDown } from '@material-ui/icons';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import { usePopper } from 'react-popper';

const useStyles = createUseStyles(theme => ({
  text__field: {
    // position: "relative",
    width: props => props.fieldWidth && props.fieldWidth,
  },
  select__field: {
    position: 'absolute',
    boxShadow:
      '0 2px 1px -1px rgba(0, 0, 0, 0.20),' +
      '0 1px 1px 0px rgba(0, 0, 0, 0.14),' +
      '0 1px 3px 0px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    opacity: 0,
    overflow: 'auto',
    maxHeight: 500,
    transition: 'opacity linear 0.25s',
  },
  input__behind: {
    position: 'absolute',
    zIndex: '-1',
    top: props => props.height / 2 || 15,
    border: 'none',
    outline: 'none',
    width: 0,
  },
  show__field: {
    opacity: 1,
  },
  no__option: {
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'default',
  },
}));

const CCSelect = forwardRef((props, ref) => {
  const {
    defaultValue,
    label,
    onChange,
    onClose,
    children,
    height,
    width,
    fieldWidth,
    value,
    autoComplete = false,
    closeIcon,
    ...others
  } = props;
  const classes = useStyles(props);
  const [isClick, setIsClick] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [optionWidth, setOptionWidth] = useState(0);
  const [text, setText] = useState('');
  const [optionValue, setOptionValue] = useState(value);

  const fieldRef = useRef(null);
  const [textRef, setTextRef] = useState(null);
  const inputRef = useRef(null);
  const [optionRef, setOptionRef] = useState(null);

  const { styles, attributes } = usePopper(textRef, optionRef, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  const newChildren = children.map((child, index) => {
    if (React.isValidElement(child)) {
      return cloneElement(child, {
        key: index,
        setText: setText,
        setValue: setOptionValue,
        setIsClick: setIsClick,
        height: height,
      });
    }
    return child;
  });

  const filteredChildren = useMemo(() => {
    if (newChildren && autoComplete && text) {
      const filter = newChildren.filter(child => child.props.children.includes(text));
      if (filter.length === 0) {
        return <div className={classes.no__option}>no option</div>;
      }
      return newChildren.filter(child => child.props.children.includes(text));
    }
    return newChildren;
  }, [newChildren, autoComplete, text, classes]);

  const showSelectHandle = () => {
    setIsClick(!isClick);

    if (!isClick) {
      setShowOption(true);
      return textRef?.current?.children[0]?.focus();
    }
    return textRef?.current?.children[0]?.blur();
  };

  const closeIconClick = () => {
    onClose && onClose();
    setText(null);
    setOptionValue('');
  };

  useEffect(() => {
    const listener = e => {
      if (!fieldRef.current || fieldRef.current.contains(e.target)) return;
      setIsClick(false);
    };

    console.log(textRef?.offsetWidth);
    // const rect = textRef.current.getBoundingClientRect();
    textRef && setOptionWidth(textRef?.offsetWidth);
    // setOptionHeight(rect.top + rect.height);

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [fieldRef, textRef]);

  /* value값이 바뀌면 숨겨진 input을 focus상태로 만들어 부모의 onChange event를 활성화시킴. */
  useEffect(() => {
    if (optionValue || optionValue === '') inputRef.current.focus();
  }, [optionValue]);

  /* defaultValue값과 일치하는 option component를 찾고 해당 component의 text 값을 가져옴. */
  useEffect(() => {
    if (value || value === '') {
      const child = children.find(child => child.props.value === value);
      if (child) {
        setText(child.props.children);
        // setOptionValue(value);
      } else console.warn(`There is no component with value named '${value}'`);
    }
  }, [value, children]);

  return (
    <div className={classes.text__field} ref={fieldRef}>
      <CCTextField
        label={label}
        labelFixed={Boolean(optionValue)}
        width={width || 200}
        height={height || 40}
        select
        endComponent={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {autoComplete && text && (
              <CCIconButton onClick={closeIconClick}>{closeIcon}</CCIconButton>
            )}
            <CCIconButton color={props.color} onClick={showSelectHandle} size={height - 10 || 30}>
              <ArrowDropDown
                style={{
                  transition: 'transform ease-out 0.2s',
                  transform: isClick ? 'rotate(180deg)' : 'none',
                }}
              />
            </CCIconButton>
          </div>
        }
        onClick={showSelectHandle}
        value={text}
        readOnly={!Boolean(autoComplete)}
        onChange={e => {
          if (e.target.value === '') setOptionValue('');
          setText(e.target.value);
        }}
        ref={setTextRef}
        {...others}
      />
      <input
        className={classes.input__behind}
        onFocus={e => onChange && onChange(e)}
        value={optionValue || ''}
        readOnly
        tabIndex="-1"
        ref={inputRef}
      />
      {showOption && (
        <div
          className={clsx(classes.select__field, {
            [classes.show__field]: isClick,
          })}
          style={{
            ...styles.popper,
            width: optionWidth,
          }}
          onTransitionEnd={() => setShowOption(false)}
          ref={setOptionRef}
          {...attributes.popper}
        >
          {filteredChildren}
        </div>
      )}
    </div>
  );
});

export default CCSelect;
