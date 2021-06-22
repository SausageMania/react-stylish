import { CCTable } from '../components';
import React from 'react';

export default {
  title: 'Table',
  component: CCTable,
}

export const Table = ({...options}) => ( <CCTable {...options}/> )

Table.storyName = "single.table";