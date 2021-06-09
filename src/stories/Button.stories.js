import { action } from "@storybook/addon-actions";
import { withKnobs } from '@storybook/addon-knobs';
import { CCButton } from '../components/CCButton';
import { Search } from '@material-ui/icons';
import React from 'react';

export default {
  title: 'Button',
  component: CCButton,
  decorators: [withKnobs]
};

const variants = ["outlined", "contained", "text"];
const options = ["primary", "secondary", "error", "sub", "icon", "selected", "purple"];

export const ButtonList = () => (
  <div style={{overflow:"auto"}}>
    <h2>
      Medium Size
      <div style={{width:"100%", border: "0.5px solid rgb(220,220,220)"}}/>
    </h2>
    <table>
      <thead>
        <tr>
          <th></th>
          {options.map(color => <th key={color}>{color === "purple" ? "custom" : color}</th>)}
          <th>disabled</th>
          <th>disableRipple</th>
        </tr>
      </thead>
      <tbody>
        {variants.map(variant => (
          <tr key={variant}>
            <th style={{textAlign: "left", width: "100px"}}>{variant.toUpperCase()}</th>
            {options.map((option) => 
              <td key={option}>
                <CCButton 
                  variant={variant} 
                  color={option} 
                  startIcon={<Search />} 
                  onClick={action(variant)}
                  selected={option === "selected"}
                >
                  Button
                </CCButton>
              </td>
            )}
            <td>
              <CCButton variant={variant} disabled startIcon={<Search />}>
                Button
              </CCButton>
            </td>
            <td>
              <CCButton 
                variant={variant} 
                disableRipple 
                startIcon={<Search />} 
                onClick={action(variant)}
              >
                Button
              </CCButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <br/>
    <h3>
      Small Size
      <div style={{border: "1px solid rgb(220,220,220)"}}/>
    </h3>
    <table>
      <thead>
        <tr>
          <th></th>
          {options.map(color => <th key={color}>{color === "purple" ? "custom" : color}</th>)}
          <th>disabled</th>
          <th>disableRipple</th>
        </tr>
      </thead>
      <tbody>
        {variants.map(variant => (
          <tr key={variant}>
            <th style={{textAlign: "left", width: "100px"}}>{variant.toUpperCase()}</th>
            {options.map(color => 
              <td key={color}>
                <CCButton 
                  variant={variant} 
                  color={color} 
                  size="small"
                  endIcon={<Search />}
                  onClick={action(variant)}
                  selected={color === "selected"}
                >
                  Button
                </CCButton>
              </td>
            )}
            <td>
              <CCButton variant={variant} disabled size="small" endIcon={<Search />}>
                Button
              </CCButton>
            </td>
            <td>
              <CCButton 
                variant={variant} 
                disableRipple 
                size="small" 
                startIcon={<Search />}
                onClick={action(variant)}
              >
                Button
              </CCButton>
            </td>
          </tr>
      ))}
    </tbody>
    </table>
  </div>
);

ButtonList.storyName = "all.button";
