import { CCTextField, CCButton } from '../components';
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
      endComponent={<CCButton square={30} round={10} size={18}><Search fontSize="inherit"/></CCButton>}
      helpComponent={<span>Please insert the money cost.</span>}
      rows={1}
      {...options}
    /> 
  </div>
)

TextField.storyName = "single.textfield";