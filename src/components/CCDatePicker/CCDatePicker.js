import React, { forwardRef, useState } from 'react';
import { CCTextField, CCIconButton, CCDialog } from '../../components';
import { DateRange, ChevronLeft, ChevronRight } from '@material-ui/icons';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  title: {
    backgroundColor: props => props.color || theme.palette.primary.main,
    padding: "5px 0 5px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }
}));

const CCDatePicker = forwardRef((props, ref) => {
  const classes = useStyles(props);
  const { iconColor, ...others } = props;
  const [openCalendar, setOpenCalendar] = useState(false);
  return (
    <>
      <CCTextField
        endComponent={
          <CCIconButton onClick={()=>setOpenCalendar(true)}>
            <DateRange color={iconColor} />
          </CCIconButton>
        }
        {...others}
      />
      <CCDialog 
        open={openCalendar} 
        onClose={()=>setOpenCalendar(false)} 
        width={300}
      >
        <div className={classes.title}>
          <CCIconButton color="#FFFFFF" disableHover size={25}>
            <ChevronLeft />
          </CCIconButton>
          <div>2020 September</div>
          <CCIconButton color="#FFFFFF" disableHover size={25}>
            <ChevronRight />
          </CCIconButton>
        </div>
        <div className={classes.contents}>
          
        </div>
      </CCDialog>
    </>
  )
});

export default CCDatePicker;