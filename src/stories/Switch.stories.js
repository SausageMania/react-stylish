import { CCSwitch } from '../components/CCSwitch';
import React from 'react';

export default {
  title: 'Switch',
  component: CCSwitch,
}

export const Switch = ({...options}) => (
  <div>
    <CCSwitch {...options}/>
  </div>
)

Switch.storyName = "single.switch";