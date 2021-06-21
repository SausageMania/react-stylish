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
      count={15} 
      siblingCount={1} 
      boundaryCount={1} 
      defaultPage={4}
    />
  </div>
)

Pagination.storyName = "single.pagination";