import { CCIconButton } from '../components';
import { Search } from '@material-ui/icons';
import React from 'react';

export default {
  title: 'IconButton',
  component: CCIconButton,
}

export const IconButton = ({...options}) => ( 
  <CCIconButton {...options}>
    <Search />
  </CCIconButton> 
);

IconButton.storyName = "single.IconButton";