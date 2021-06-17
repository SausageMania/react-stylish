import { CCTextField, CCButton } from '../components';
import React from 'react';

export default {
    title: 'TextField',
    component: CCTextField,
  }
  
export const TextField = ({...options}) => (
  <div style={{padding: "5px"}}>
    <CCTextField
      endComponent={<CCButton size="medium">검색</CCButton>}
      helpComponent="This is a help component"
      rows={1}
      {...options}
    /> 
  </div>
)

TextField.storyName = "single.textfield";