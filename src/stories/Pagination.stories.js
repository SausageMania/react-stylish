import { CCPagination } from '../components';
import React from 'react';

export default {
  title: 'Pagination',
  component: CCPagination,
}
  
export const Pagination = ({...options}) => (
  <div style={{ padding: "5px" }}>
    <CCPagination onChange={(e, page)=>console.log(page)} {...options} />
  </div>
)

Pagination.storyName = "single.pagination";