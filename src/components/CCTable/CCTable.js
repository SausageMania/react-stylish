import React, { forwardRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(theme => ({
  table: {
    width: props => props.width ? props.width : "none",
    height: props => props.height ? props.height : "none",
    overflow: "auto",
    position: "relative",
    fontSize: props => props.fontSize ? props.fontSize : "none",
  },
  table__column: {
    width: props => {
      let totalWidth = 0;
      props.columns.forEach(column => {
        totalWidth += column.width ? column.width : 200;
        totalWidth += 10; // 각 table당 margin값을 더해준다.
      })
      return totalWidth;
    },
    minHeight: "40px",
    display: "flex",
    position: props => props.disableSticky ? "static" : "sticky",
    top: 0,
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.border.main}`,
    backgroundColor: "#FFFFFF",
    zIndex: 1,
  },
  column__content: {
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // whiteSpace: "nowrap",
    // wordBreak: "break-all",
    margin: "0 5px",
    display: "flex",
    justifyContent: props => props.justify ? props.justify : "flex-start",
  },
  table__row: {
    width: props => {
      let totalWidth = 0;
      props.columns.forEach(column => {
        totalWidth += column.width ? column.width : 200;
        totalWidth += 10; // 각 table당 margin값을 더해준다.
      })
      return totalWidth;
    },
  },
  row__body: {
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: props => !props.disableHover && theme.palette.result.main,
    }
  },
  row__border: {
    borderBottom: `1px solid ${theme.palette.background.default}`,
  },
  row__selected: {
    backgroundColor: theme.palette.selected.main,
  },
  row__content: {
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // whiteSpace: "wrap",
    // wordBreak: "break-all",
    margin: "0 5px",
    display: "flex",
    justifyContent: props => props.justify ? props.justify : "flex-start",
  },
  checkbox: {
    width: "50px",
  },
}));

const CCTable = forwardRef((props,ref) => {
  const {columns, rows, disableSelect} = props;
  const classes = useStyles(props);

  const [selectedRow, setSelectedRow] = useState(-1);

  return (
    <div className={classes.table} ref={ref}>
      <div className={classes.table__column}>
        {/* <div className={classes.checkbox}>
          <CCCheckbox onChange={allCheckClickHandle}/>
        </div> */}
        {columns.map(column => (
          <div 
            key={column.key} 
            className={classes.column__content} 
            style={{
              width: column.width ? column.width : 200,
              display: "flex",
              justifyContent: column.justify
            }}
          >
            {column.title}
          </div>
        ))}
      </div>
      <div className={classes.table__row}>
        {rows.map((row, index) => (
          <div 
            key={index} 
            className={clsx(classes.row__body,
              {
                [classes.row__border]:rows.length -1 !== index,
                [classes.row__selected]: selectedRow === index && !disableSelect,
              }
            )}
            onClick={()=>setSelectedRow(index)}
          >
            {/* <div className={classes.checkbox}><CCCheckbox checked={allClick}/></div> */}
              {[...Array(columns.length)].map((n, index) => (
                <div 
                  className={classes.row__content} 
                  style={{
                    width: columns[index].width ? columns[index].width : 200,
                    display: "flex",
                    justifyContent: row.justify?.[columns[index].key]
                  }} 
                  key={index}
                >
                  {row?.[columns[index].key]}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
});

CCTable.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.number,
  justify: PropTypes.oneOf(["flex-start", "center", "flex-end"]),
  disableSticky: PropTypes.bool,
  disableHover: PropTypes.bool,
  disableSelect: PropTypes.bool,
};

CCTable.defaultProps = {
  width: null,
  height: null,
  fontSize: 16,
  justify: "flex-start",
  disableSticky: false,
  disableHover: false,
  disableSelect: false,
}

export default CCTable;