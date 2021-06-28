import { CCTable, CCButton, CCIconButton, CCPagination, CCTextField } from '../components';
import { Search, MoreVert } from '@material-ui/icons';
import React from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Table',
  component: CCTable,
}

const columns = [
  {
    key: "Name",
    label: "Name", 
    width: "30%",
    justify: "center",
    Styles: {
      backgroundColor: "red",
    }
  },
  {
    key: "Age",
    label: "Age", 
    width: "10%",
  },
  {
    key: "long_label",
    label: "Very Very Long Long label",
    width: "30%"
  },
  {
    key: "Sex",
    label: "Sex", 
    width: "15%",
  },
  {
    key: "search",
    label: "option",
    width: "15%",
    justify: "flex-end"
  }
];

const rows= [
  {
    long_label: <CCButton disableHover>Button</CCButton>,
    Name: <div>John Wick</div>,
    Age: 45,
    Sex: "male",
    justify: {
      long_label: "center",
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
    Name: "Donald Trump",
    Age: 65,
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
    },
  },
]

export const SingleTable = ({...options}) => ( <CCTable columns={columns} rows={rows} {...options}/> );
export const CombinedTable = () => (
  <div style={{width: "800px", border: "1px solid", borderRadius: "5px", padding: "5px"}}>
    <div style={{padding: "3px 0", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <div style={{fontSize: "20px", fontWeight: 500}}>Table with components</div>
      <CCTextField 
        endComponent={
          <CCIconButton size={17} onClick={action("search")} color="secondary">
            <Search />
          </CCIconButton>
        }
        size="small"
        height={30}
        placeholder="search"
        label="search"
        color="secondary"
      />
    </div>
    <CCTable columns={columns} rows={rows} height={200}/>
    <div style={{display: "flex", justifyContent: "center"}}>
      <CCPagination 
        count={20} 
        siblingCount={2} 
        boundaryCount={2} 
        color="secondary" 
        onChange={action("page")}
      />
    </div>
  </div>
);

SingleTable.storyName = "single.table";
CombinedTable.storyName = "combined.table";