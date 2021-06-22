import { CCCheckbox } from '../components';
import React from 'react';

export default {
  title: 'Checkbox',
  component: CCCheckbox,
}

export const Switch = ({...options}) => ( <CCCheckbox {...options}/> )

Switch.storyName = "single.checkbox";