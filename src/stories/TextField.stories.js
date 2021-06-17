import { CCTextField, CCButton } from '../components';
import React from 'react';

export default {
    title: 'TextField',
    component: CCTextField,
  }
  
export const TextField = ({...options}) => (
  <div style={{padding: "5px"}}>
    <CCTextField
      startComponent={<span>$</span>}
      endComponent={<CCButton size="medium">검색</CCButton>}
      helpComponent={<span>Please insert the money cost.</span>}
      rows={1}
      {...options}
    /> 
  </div>
)

TextField.storyName = "single.textfield";