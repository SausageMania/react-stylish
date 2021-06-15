import { CCTextField } from '../components';
import React from 'react';

export default {
    title: 'TextField',
    component: CCTextField,
  }
  
export const TextField = () => ( <CCTextField label="차트번호" color="secondary"/> )

TextField.storyName = "single.textfield";