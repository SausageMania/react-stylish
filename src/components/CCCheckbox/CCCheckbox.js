import React, { forwardRef, useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(theme => ({
  input: {
    display: 'none',
  },
  checkbox: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: props => {
      if (props.size === 'medium') return '42px';
      if (props.size === 'small') return '34px';
      if (!isNaN(props.size)) return props.size;
    },
    height: props => {
      if (props.size === 'medium') return '42px';
      if (props.size === 'small') return '34px';
      if (!isNaN(props.size)) return props.size;
    },
    borderRadius: '9999px',
    cursor: props => (props.disabled ? 'default' : 'pointer'),
    overflow: 'hidden',
    '& > svg': {
      fontSize: props => {
        if (props.size === 'medium') return '24px';
        if (props.size === 'small') return '20px';
        if (!isNaN(props.size)) return props.size;
        return '20px';
      },
    },
  },
  checked: {
    color: props => {
      if (props.disabled) return theme.palette.inactive.rgba;
      if (theme.palette?.[props.color]) return theme.palette?.[props.color].main;
      return props.color ? props.color : theme.palette.primary.main;
    },
  },
  none__checked: {
    color: props => {
      if (props.disabled) return theme.palette.inactive.rgba;
      return theme.palette.sub.mainRgba;
    },
  },
  ripple: {
    width: '5px',
    height: '5px',
    position: 'absolute',
    background: props => {
      if (theme.palette?.[props.color]) return theme.palette?.[props.color].main;
      return props.color ? props.color : theme.palette.primary.main;
    },
    display: 'block',
    borderRadius: '9999px',
    pointerEvents: 'none',
    opacity: '1',
    animation: '0.5s ease-out 1 forwards $ripple-effect',
  },
  '@keyframes ripple-effect': {
    from: {
      opacity: '0.2',
      transform: 'scale(1)',
    },
    to: {
      opacity: '0',
      transform: 'scale(30)',
    },
  },
}));

const CCCheckbox = forwardRef((props, ref) => {
  const classes = useStyles(props);
  const { checked, onChange, disableRipple, size, ...others } = props;

  const [isChecked, setIsChecked] = useState(checked);
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 || coords.y !== -1) setIsRippling(true);
  }, [coords]);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const checkClickHandle = e => {
    if (!disableRipple) {
      setIsRippling(false);
      setCoords({ x: 0, y: 0 });
    }
    setIsChecked(e.target.checked);
    onChange && onChange(e);
  };

  const onKeyDownHandle = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!disableRipple) {
        setIsRippling(false);
        setCoords({ x: 0, y: 0 });
      }
      setIsChecked(e.target.checked);
      onChange && onChange(e);
    }
  };

  return (
    <label
      className={classes.checkbox}
      onAnimationEnd={() => setIsRippling(false)}
      tabIndex={0}
      onKeyDown={onKeyDownHandle}
    >
      {isChecked ? (
        <CheckBox className={classes.checked} />
      ) : (
        <CheckBoxOutlineBlank className={classes.none__checked} />
      )}
      {isRippling && <span className={classes.ripple} style={{ x: coords.x, y: coords.y }} />}
      <input
        type="checkbox"
        className={classes.input}
        onChange={checkClickHandle}
        checked={isChecked}
        ref={ref}
        {...others}
      />
    </label>
  );
});

CCCheckbox.propTypes = {
  size: PropTypes.oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.number]),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'sub', 'icon']),
    PropTypes.string,
  ]),
  checked: PropTypes.bool,
  disableRipple: PropTypes.bool,
  disabled: PropTypes.bool,
};

CCCheckbox.defaultProps = {
  size: 'medium',
  color: 'primary',
  checked: false,
  disableRipple: false,
  disabled: false,
};

export default CCCheckbox;
