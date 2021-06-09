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
const colors = ["primary", "secondary", "error", "sub", "icon", "selected", "purple"];

export const ButtonList = () => (
  <>
    <h2>
      Medium Size
      <div style={{border: "0.5px solid rgb(220,220,220)"}}/>
    </h2>
    <table>
      <thead>
        <tr>
          <th></th>
          {colors.map(color => <th key={color}>{color === "purple" ? "custom" : color}</th>)}
          <th>disabled</th>
        </tr>
      </thead>
      <tbody>
        {variants.map(variant => (
          <tr key={variant}>
            <th style={{textAlign: "left", width: "100px"}}>{variant.toUpperCase()}</th>
            {colors.map(color => 
              <td key={color}>
                <CCButton 
                  variant={variant} 
                  color={color} 
                  startIcon={<Search />} 
                  onClick={action(variant)}
                >
                  Button
                </CCButton>
              </td>
            )}
            <td>
              <CCButton variant={variant} disabled startIcon={<Search />}>Button</CCButton>
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
          {colors.map(color => <th key={color}>{color === "purple" ? "custom" : color}</th>)}
          <th>disabled</th>
        </tr>
      </thead>
      <tbody>
        {variants.map(variant => (
          <tr key={variant}>
            <th style={{textAlign: "left", width: "100px"}}>{variant.toUpperCase()}</th>
            {colors.map(color => 
              <td key={color}>
                <CCButton 
                  variant={variant} 
                  color={color} 
                  size="small"
                  endIcon={<Search />}
                  onClick={action(variant)}
                >
                  Button
                </CCButton>
              </td>
            )}
            <td>
              <CCButton 
                variant={variant} 
                disabled 
                size="small"
                endIcon={<Search />}
              >
                Button
              </CCButton>
            </td>
          </tr>
      ))}
    </tbody>
    </table>
  </>
);

ButtonList.storyName = "all.button";
