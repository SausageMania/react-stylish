import { CCTextField } from '../components';
import React from 'react';

export default {
    title: 'TextField',
    component: CCTextField,
  }
  
export const TextField = () => ( <CCTextField title="차트번호" height="55"/> )

TextField.storyName = "single.textfield";