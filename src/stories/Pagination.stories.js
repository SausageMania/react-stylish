import { CCPagination } from '../components';
import React from 'react';

export default {
  title: 'Pagination',
  component: CCPagination,
}
  
export const Pagination = ({...options}) => (
  <div style={{ padding: "5px" }}>
    <CCPagination 
      onChange={(e, page)=>console.log(page)} 
      count={12} 
      siblingCount={2} 
      boundaryCount={2} 
      defaultPage={4}
    />
  </div>
)

Pagination.storyName = "single.pagination";