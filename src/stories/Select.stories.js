import { CCSelect } from '../components';
import { CCOption } from '../components/CCSelect/Component';
import React from 'react';

export default {
  title: 'Select',
  component: CCSelect,
}
  
export const Select = ({...options}) => (
  <div style={{ padding: "5px" }}>
    <CCSelect height={50} onSelect={(v, t)=>console.log(v + " " + t)}>
      <CCOption value="123">test1</CCOption>
      <CCOption value="456">test2</CCOption>
    </CCSelect>
  </div>
)

Select.storyName = "single.select";