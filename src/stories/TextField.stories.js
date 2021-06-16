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
    defaultValue="129-125912-12012"
    endIcon={<CCButton size="small" color="secondary">검색</CCButton>}
  /> 
)

TextField.storyName = "single.textfield";