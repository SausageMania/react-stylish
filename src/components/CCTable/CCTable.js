import React, { forwardRef } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({

}));

const CCTable = forwardRef((props,ref) => {
  return <table ref={ref}></table>
});

export default CCTable;