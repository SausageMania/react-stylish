import { CCDatePicker } from '../components';
import React, { useState } from 'react';

export default {
  title: 'DatePicker',
  component: CCDatePicker,
}

export const DatePicker = ({...options}) => {
  
  return (
    <div>
      <CCDatePicker iconColor="secondary" />
    </div>
  );
}

DatePicker.storyName = "single.DatePicker";