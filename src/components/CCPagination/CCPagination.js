import React, { forwardRef, useState } from 'react';
import { 
  ArrowBackIos, 
  ArrowForwardIos, 
  ArrowBack, 
  ArrowForward, 
  FirstPage, 
  LastPage,
  MoreHoriz
 } from '@material-ui/icons';
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
  const {count, defaultPage, boundaryCount, siblingCount, showAll, selectVariant, onChange, ...others } = props;
  const classes = useStyles(props);
  const [currPage, setCurrPage] = useState(defaultPage ? defaultPage : 1);
  const [middlePage, setMiddlePage] = useState(
    defaultPage < 2 + boundaryCount + siblingCount 
    ? 2 + siblingCount + boundaryCount
    : defaultPage > count - boundaryCount - siblingCount - 1 
      ? count - boundaryCount - siblingCount - 1
      : defaultPage
  );
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);
  const size = props.square >= 35 ? "medium" : "small";
  const totalSibling = 2 * siblingCount + 1;
  const totalBoundary = 2 * boundaryCount;

  const pageClickHandle = async (e, currPage) => {
    onChange && onChange(e, currPage);
    setCurrPage(currPage);
    if(currPage < 1 + boundaryCount)
      setMiddlePage(2 + siblingCount + boundaryCount);
    else
      setMiddlePage(count - siblingCount - boundaryCount - 1);
  }

  const prevClickHandle = e => {
    const newCurrPage = currPage - 1;
    onChange && onChange(e, newCurrPage);
    setCurrPage(newCurrPage);
    if(middlePage > newCurrPage && newCurrPage - boundaryCount - siblingCount - 1 > 0)
      setMiddlePage(newCurrPage);
  }

  const nextClickHandle = e => {
    const newCurrPage = currPage + 1;
    onChange && onChange(e, newCurrPage);
    setCurrPage(newCurrPage);
    if(middlePage < newCurrPage && count - boundaryCount - siblingCount > newCurrPage)
      setMiddlePage(newCurrPage);
    
  }

  const firstClickHandle = e => {
    onChange && onChange(e, 1);
    setCurrPage(1);
    setMiddlePage(2 + siblingCount + boundaryCount);
  }

  const lastClickHandle = e => {
    onChange && onChange(e, count);
    setCurrPage(count);
    setMiddlePage(count - boundaryCount - siblingCount - 1);
  }

  const prevSiblingClickHandle = e => {
    const newCurrPage = currPage - totalSibling > 0 ? currPage - totalSibling : 1;
    onChange && onChange(e, newCurrPage);
    setCurrPage(newCurrPage);
    if(newCurrPage > middlePage)
      return;
    else if(newCurrPage > 2 + boundaryCount + siblingCount)
      setMiddlePage(newCurrPage);
    else{
      setPrevHover(false);
      setMiddlePage(2 + boundaryCount + siblingCount);
    }
  }

  const nextSiblingClickHandle = e => {
    const newCurrPage = currPage + totalSibling < count ? currPage + totalSibling : count;
    onChange && onChange(e, newCurrPage);
    setCurrPage(newCurrPage);
    if(newCurrPage < middlePage)
      return;
    else if(newCurrPage < count - boundaryCount - siblingCount - 1)
      setMiddlePage(newCurrPage);
    else{
      setNextHover(false);
      setMiddlePage(count - boundaryCount - siblingCount - 1);
    }
  }

  const siblingPageClickHandle = (e, newCurrPage) => {
    if(newCurrPage < currPage && newCurrPage < count - boundaryCount - siblingCount - 1){
      if(newCurrPage > 1 + boundaryCount + siblingCount)
        setMiddlePage(newCurrPage);
      else
        setMiddlePage(2 + boundaryCount + siblingCount);
    }
    else if(newCurrPage > currPage && newCurrPage > 2 + boundaryCount + siblingCount){
      if(newCurrPage < count - boundaryCount - siblingCount)
        setMiddlePage(newCurrPage);
      else
        setMiddlePage(count - boundaryCount - siblingCount - 1);
    }
    
    onChange && onChange(e, newCurrPage);
    setCurrPage(newCurrPage);
  }

  return (
    <nav>
      <ul className={classes.pagination} ref={ref}>
        <li>
          <CCButton onClick={firstClickHandle} size={size} {...others}>
            <FirstPage />
          </CCButton>
        </li>
        <li>
          <CCButton 
            onClick={prevClickHandle} 
            size={size} 
            disabled={currPage === 1 || props.disabled} 
            {...others}
          >
            <ArrowBackIos />
          </CCButton>
        </li>
        {count - totalSibling - totalBoundary < 2 || showAll
          ? (<>
            {[...Array(count)].map((num, index) => (
              <li key={`${classes.pagination}_${index}`}>
                <CCButton 
                  variant={currPage === index + 1 ? selectVariant : "text"}
                  onClick={e => pageClickHandle(e, index + 1)}
                  size={size}
                  {...others}
                >
                  {index + 1}
                </CCButton>
              </li>
            ))}
          </>)
          : (<>
            {[...Array(boundaryCount)].map((n, index) => (
              <li key={`${classes.pagination}_${index}`}>
                <CCButton
                  variant={currPage === index + 1 ? selectVariant : "text"}
                  onClick={e => pageClickHandle(e, index + 1)}
                  size={size}
                  {...others}
                >
                  {index + 1}
                </CCButton>
              </li>
            ))}
            {middlePage > siblingCount + boundaryCount + 2 ? (
              <li>
                <CCButton
                  variant="text"
                  size={size}
                  onMouseEnter={()=>setPrevHover(true)}
                  onMouseLeave={()=>setPrevHover(false)}
                  onClick={prevSiblingClickHandle}
                  {...others}
                >
                  {prevHover ? <ArrowBack /> : <MoreHoriz/>}
                </CCButton>
              </li>
            ) :
            (
              <li>
                <CCButton
                  variant={currPage === 1 + boundaryCount ? selectVariant : "text"}
                  onClick={e =>{
                    onChange && onChange(e, 1 + boundaryCount);
                    setCurrPage(1 + boundaryCount);
                  }}
                  size={size}
                  {...others}
                >
                  {1 + boundaryCount}
                </CCButton>
              </li>
            )}
            {[...Array(totalSibling)].map((n, index) => (
              <li key={`${classes.pagination}_${index}`}>
                <CCButton
                  variant={currPage === middlePage - siblingCount + index ? selectVariant : "text"}
                  onClick={e => siblingPageClickHandle(e, middlePage - siblingCount + index)}
                  size={size}
                  {...others}
                >
                  {middlePage - siblingCount + index}
                </CCButton>
              </li>
            ))}
            {middlePage < count - boundaryCount - siblingCount - 1 ? (
              <li>
                <CCButton
                  variant="text"
                  size={size}
                  onMouseEnter={()=>setNextHover(true)}
                  onMouseLeave={()=>setNextHover(false)}
                  onClick={nextSiblingClickHandle}
                  {...others}
                >
                  {nextHover ? <ArrowForward /> : <MoreHoriz/>}
                </CCButton>
              </li>
            ) :
            (
              <li>
                <CCButton
                  variant={currPage === count - boundaryCount ? selectVariant : "text"}
                  onClick={e =>{
                    onChange && onChange(e, count - boundaryCount);
                    setCurrPage(count - boundaryCount);
                  }}
                  size={size}
                  {...others}
                >
                  {count - boundaryCount}
                </CCButton>
              </li>
            )}
            {[...Array(boundaryCount)].map((n, index) => (
              <li key={`${classes.pagination}_${index}`}>
                <CCButton
                  variant={currPage === count - boundaryCount + index + 1 ? selectVariant : "text"}
                  onClick={e => pageClickHandle(e, count - boundaryCount + index + 1)}
                  size={size}
                  {...others}
                >
                  {count - boundaryCount + index + 1}
                </CCButton>

              </li>
            ))}
          </>)
        }
        
        <li>
          <CCButton 
            onClick={nextClickHandle} 
            size={size} 
            disabled={currPage === count || props.disabled} 
            {...others}
          >
            <ArrowForwardIos/>
          </CCButton>
        </li>
        <li>
          <CCButton onClick={lastClickHandle} size={size} {...others}>
            <LastPage />
          </CCButton>
        </li>
      </ul>
    </nav>
  );
});

CCPagination.propTypes = {
  round: PropTypes.number,
  square: PropTypes.number,
  color: PropTypes.oneOfType([
    PropTypes.oneOf(["primary", "secondary", "error", "warning", "sub", "icon"]),
    PropTypes.string
  ]),
  count: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
  boundaryCount: PropTypes.number,
  defaultPage: PropTypes.number,
  showAll: PropTypes.bool,
  selectVariant: PropTypes.oneOf(["contained", "dashed", "outlined"])
};

CCPagination.defaultProps = {
  round: 10,
  /* 페이지 버튼의 크기 (px단위) */
  square: 23,
  color: "primary",
  /* 페이지의 총 개수 (required) */
  count: 1,
  /* 중간에 나타날 이전 및 이후 페이지의 개수 */
  siblingCount: 0,
  /* 시작과 끝 페이지에서 항상 보여질 페이지의 개수 */
  boundaryCount: 1,
  /* 처음에 선택될 페이지 번호 */
  defaultPage: 1,
  /* 모든 페이지를 다 보여줄지 여부 */
  showAll: false,
  /* 선택된 페이지의 variant */
  selectVariant: "contained",
}

export default CCPagination;