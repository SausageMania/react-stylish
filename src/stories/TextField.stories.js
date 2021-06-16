import { CCTextField, CCButton } from '../components';
import React from 'react';

export default {
    title: 'TextField',
    component: CCTextField,
  }
  
export const TextField = () => ( 
  <CCTextField 
    label="차트번호" 
    color="secondary" 
    endIcon={<CCButton size="small">검색</CCButton>}
  /> 
)

TextField.storyName = "single.textfield";