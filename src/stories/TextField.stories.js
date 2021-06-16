import { CCTextField, CCButton } from '../components';
import React from 'react';

export default {
    title: 'TextField',
    component: CCTextField,
  }
  
export const TextField = () => ( 
  <CCTextField 
    label="차트번호qwe" 
    color="secondary" 
    endIcon={<CCButton size="small" color="secondary">검색</CCButton>}
  /> 
)

TextField.storyName = "single.textfield";