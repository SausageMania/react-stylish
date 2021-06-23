import { CCTable, CCButton, CCIconButton, CCPagination, CCTextField } from '../components';
import { Search, MoreVert } from '@material-ui/icons';
import React from 'react';

export default {
  title: 'Table',
  component: CCTable,
}

const columns = [
  {
    key: "Name",
    title: "Name", 
    width: "30%",
    justify: "center",
  },
  {
    key: "Age",
    title: "Age", 
    width: "10%",
  },
  {
    key: "long_title",
    title: "Very Very Long Long Title",
    width: "30%"
  },
  {
    key: "Sex",
    title: "Sex", 
    width: "15%",
  },
  {
    key: "search",
    title: "option",
    width: "15%",
    justify: "flex-end"
  }
];

const rows= [
  {
    long_title: <CCButton disableHover>Button</CCButton>,
    Name: <div>John Eric</div>,
    Age: 25,
    Sex: "male",
    justify: {
      long_title: "center",
    }
  },
  {
    Name: <strong>Ellis Wonderland</strong>,
    Age: 29,
    Sex: "female",
  },
  {
    Name: <strong>Byeongseok Kim</strong>,
    Age: 35,
    Sex: "male",
  },
  {
    Name: "Sam Hillary",
    Age: 15,
    Sex: "male",
    justify: {
      Age: "flex-end",
      Name: "flex-end",
      Sex: "flex-end",
    }
  },
  {
    Name: <strong>Emma Watson</strong>,
    Age: 30,
    Sex: "female",
    search: <CCIconButton size={20} disableHover><MoreVert /></CCIconButton>,
    justify: {
      search: "flex-end"
    }
  },
]

export const SingleTable = ({...options}) => ( <CCTable columns={columns} rows={rows} {...options}/> );
export const CombinedTable = () => (
  <div style={{width: "800px", border: "1px solid", borderRadius: "5px", padding: "5px"}}>
    <div style={{padding: "3px 0", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <div style={{fontSize: "18px", fontWeight: 500}}>Table with components</div>
      <CCTextField 
        endComponent={
          <CCIconButton size={17} onClick={()=>alert('button click!')}>
            <Search />
          </CCIconButton>
        }
        size="small"
        // height={40}
        placeholder="search"
        label="search"
      />
    </div>
    <CCTable columns={columns} rows={rows} height={200}/>
    <div style={{display: "flex", justifyContent: "center"}}>
      <CCPagination count={20} siblingCount={2} boundaryCount={2}/>
    </div>
  </div>
);

SingleTable.storyName = "single.table";
CombinedTable.storyName = "combined.table";