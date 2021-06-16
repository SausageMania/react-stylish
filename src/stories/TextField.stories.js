import { CCTextField, CCButton } from '../components';
import React from 'react';

export default {
    title: 'TextField',
    component: CCTextField,
  }
  
export const TextField = ({...options}) => (
  <div style={{padding: "5px"}}>
    <CCTextField
      error
      endComponent={<CCButton size="small">검색</CCButton>}
      helpComponent={<div>This is helper text</div>}
      {...options}
    /> 
  </div>
)

TextField.storyName = "single.textfield";