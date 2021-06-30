import { CCSelect, CCOption } from '../components';
import React from 'react';

export default {
  title: 'Select',
  component: CCSelect,
}
  
export const Select = ({...options}) => (
  <div style={{ padding: "5px" }}>
    <CCSelect label="select" onChange={e => console.log(e.target.value)}>
      <CCOption value="123">Very Very Long Long Super Long Name and more text is here!</CCOption>
      <CCOption value="456">test2</CCOption>
    </CCSelect>
  </div>
)

Select.storyName = "single.select";