import React, { forwardRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = createUseStyles(theme => ({
  table: {
    width: props => props.width ? props.width : "none",
    maxHeight: props => props.height ? props.height : "none",
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
    wordBreak: "break-word",
    margin: "0 5px",
    display: "flex",
    justifyContent: props => props.justify ? props.justify : "flex-start",
    alignItems: "center",
    minHeight: "35px",
  },
  table__row: {
    width: props => {
      let totalWidth = 0;
      props.columns.forEach(column => {
        totalWidth += column.width ? column.width : 200;
        // totalWidth += 10; // 각 table당 margin값을 더해준다.
      })
      return totalWidth;
    },
  },
  row__body: {
    display: "flex",
    alignItems: "center",
    cursor: props => props.disableSelect ? "default" : "pointer",
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
    // whiteSpace: "nowrap",
    wordBreak: "break-word",
    margin: "0 5px",
    minHeight: "35px",
    display: "flex",
    justifyContent: props => props.justify ? props.justify : "flex-start",
    alignItems: "center",
  },
  checkbox: {
    width: "50px",
  },
}));

const CCTable = forwardRef((props,ref) => {
  const {columns, rows, disableSelect, onSelect} = props;
  const classes = useStyles(props);

  const [selectedRow, setSelectedRow] = useState(-1);

  return (
    <div className={classes.table} ref={ref}>
      <div className={classes.table__column}>
        {columns.map(column => (
          <React.Fragment key={column.key}>
            <div 
              className={classes.column__content} 
              style={{
                width: column.width ? column.width : 200,
                justifyContent: column.justify,
              }}
            >
              {column.label}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className={classes.table__row}>
        {rows.map((row, index) => (
          <div 
            key={index} 
            className={clsx(classes.row__body,
              {
                [classes.row__border]:rows.length -1 !== index,
                // [classes.row__selected]: selectedRow === index && !disableSelect,
              }
            )}
            onClick={e =>{
              onSelect && onSelect(e, row);
              setSelectedRow(index)
            }}
          >
              {[...Array(columns.length)].map((n, index) => (
                <div 
                  className={classes.row__content} 
                  style={{
                    width: columns[index].width ? columns[index].width : 200,
                    justifyContent: row.justify? row.justify?.[columns[index].key] : columns[index].justify,
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