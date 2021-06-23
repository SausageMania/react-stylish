import React, { forwardRef } from 'react';
import { CCButton } from '../../components';
import PropTypes from 'prop-types';

const CCIconButton = forwardRef((props, ref) => {
  const {children, ...others} = props;

  return (
    <CCButton round={99} square={props.size + 15} ref={ref} {...others}>
      {children}
    </CCButton>
  );
});

CCIconButton.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.oneOfType([
    PropTypes.oneOf(["primary", "secondary", "error", "warning", "sub", "icon"]),
    PropTypes.string
  ]),
  disabled: PropTypes.bool,
}

CCIconButton.defaultProps = {
  size: 25,
  color: "primary",
  disabled: false,
}

export default CCIconButton;