import React, { forwardRef, useState } from 'react';
import { ArrowBackIos, ArrowForwardIos, FirstPage, LastPage } from '@material-ui/icons';
import { CCButton } from '../../components';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(theme=>({
  pagination: {
    paddingInlineStart: 0,
    display: "flex",
    "& > li": {
      display: "inline-block",
      margin: "0 3px",
    }
  }
}));

const CCPagination = forwardRef((props, ref) => {
  const { count, defaultPage, onChange, ...others } = props;
  const classes = useStyles(props);
  const [pageClick, setPageClick] = useState(defaultPage ? defaultPage : 1);

  const pageClickHandle = async (e, currPage) => {
    onChange && onChange(e, currPage);
    setPageClick(currPage);
  }

  const prevClickHandle = e => {
    onChange && onChange(e, pageClick - 1);
    setPageClick(pageClick - 1);
  }

  const nextClickHandle = e => {
    onChange && onChange(e, pageClick + 1);
    setPageClick(pageClick + 1);
  }

  const firstClickHandle = e => {
    onChange && onChange(e, 1);
    setPageClick(1);
  }

  const lastClickHandle = e => {
    onChange && onChange(e, count);
    setPageClick(count);
  }

  return (
    <nav>
      <ul className={classes.pagination} ref={ref}>
        <li>
          <CCButton onClick={firstClickHandle} {...others}>
            <FirstPage />
          </CCButton>
        </li>
        <li>
          <CCButton onClick={prevClickHandle} {...others} disabled={pageClick === 1}>
            <ArrowBackIos />
          </CCButton>
        </li>
        {[...Array(9)].map((num, index) => (
          <li key={`${classes.pagination}_${index}`}>
            <CCButton 
              variant={pageClick === index + 1 ? "contained" : "text"}
              onClick={e => pageClickHandle(e, index + 1)}
              {...others}
            >
              {index + 1}
            </CCButton>
          </li>
        ))}
        <li>
          <CCButton onClick={nextClickHandle} {...others} disabled={pageClick === count}>
            <ArrowForwardIos/>
          </CCButton>
        </li>
        <li>
          <CCButton onClick={lastClickHandle} {...others}>
            <LastPage />
          </CCButton>
        </li>
      </ul>
    </nav>
  );
});

CCPagination.propTypes = {
  round : PropTypes.number,
  square : PropTypes.string,
  size: PropTypes.oneOf(["medium", "small"]),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(["primary", "secondary", "error", "warning", "sub", "icon"]),
    PropTypes.string
  ]),
};

CCPagination.defaultProps = {
  round: 15,
  square: "35px",
  size: "medium",
  color: "warning"
}

export default CCPagination;