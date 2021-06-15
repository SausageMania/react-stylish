import { CCSwitch } from '../components';
import React from 'react';

export default {
  title: 'Switch',
  component: CCSwitch,
}

export const Switch = ({...options}) => ( <CCSwitch {...options}/> )

Switch.storyName = "single.switch";