import { CCCheckbox } from '../../components';
import React, { forwardRef } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  column__checkbox: {
    width: "50px",
  },
  column__td: {
    minWidth: "100px",
  }
}));

const CCTable = forwardRef((props,ref) => {
  const {columns} = props;
  const classes = useStyles(props);
  return (
    <table ref={ref}>
      <thead>
        <tr>
          <td className={classes.column__checkbox}><CCCheckbox /></td>
          {columns.map(column => (
            <td className={classes.column__td} style={{width: `${column.width - 2}px`}}>
              {column.title}
            </td>
          ))}
        </tr>
      </thead>
    </table>
  )
});

export default CCTable;