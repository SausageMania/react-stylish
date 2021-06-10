import { action } from "@storybook/addon-actions";
import { CCButton } from '../components/CCButton';
import { Search } from '@material-ui/icons';
import React from 'react';

export default {
  title: 'Button',
  component: CCButton,
};

const variants = ["text", "outlined", "contained", "dashed"];
const options = ["primary", "secondary", "error", "warning", "sub", "icon", "selected", "#BB01F4"];

export const ButtonList = () => (
  <div style={{overflow:"auto"}}>
    <h2 >
      Medium Size
      <div style={{border: "1px solid rgb(220,220,220)"}}/>
    </h2>
    <table>
      <thead>
        <tr>
          <th></th>
          {options.map(option => <th key={option}>{option}</th>)}
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
          {options.map(option => <th key={option}>{option}</th>)}
          <th>disabled</th>
          <th>disableRipple</th>
        </tr>
      </thead>
      <tbody>
        {variants.map(variant => (
          <tr key={variant}>
            <th style={{textAlign: "left", width: "100px"}}>{variant.toUpperCase()}</th>
            {options.map(option => 
              <td key={option}>
                <CCButton 
                  variant={variant} 
                  color={option} 
                  size="small"
                  endIcon={<Search />}
                  onClick={action(variant)}
                  selected={option === "selected"}
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

export const SingleButton = ({variant, ...options}) => {
  return (
    <CCButton variant={variant} onClick={action(variant)} {...options}>
      Button
    </CCButton>
  )
}

ButtonList.storyName = "all.button";
SingleButton.storyName = "single.button";
