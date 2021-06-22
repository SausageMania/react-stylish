import { CCTable } from '../components';
import React from 'react';

export default {
  title: 'Table',
  component: CCTable,
}

const columns = [
  {
    title: "Name", 
    width: 150,
  },
  {
    title: "Age", 
    width: 100,
  },
  {
    title: "Sex", 
    width: 100,
  },
]

export const Table = ({...options}) => ( <CCTable columns={columns}/> )

Table.storyName = "single.table";