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
      count={50} 
      siblingCount={0} 
      boundaryCount={1} 
      defaultPage={3}
      round={10}
      selectVariant="contained"
      color="error"
    />
  </div>
)

Pagination.storyName = "single.pagination";