import { CCTextField, CCIconButton } from '../components';
import { Search } from '@material-ui/icons';
import React from 'react';

export default {
    title: 'TextField',
    component: CCTextField,
  }
  
export const TextField = ({...options}) => (
  <div style={{padding: "5px"}}>
    <CCTextField
      startComponent={<span>$</span>}
      endComponent={<CCIconButton size={20}><Search /></CCIconButton>}
      helpComponent={<span>Please insert the money cost.</span>}
      rows={1}
      {...options}
    /> 
  </div>
)

TextField.storyName = "single.textfield";