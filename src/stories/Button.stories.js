import { action } from "@storybook/addon-actions";
import { CCButton } from '../components/CCButton';
import React from 'react';

export default {
  title: 'Button',
  component: CCButton,
};

export const SingleButton = ({variant, ...options}) => {

    return (
      <CCButton variant={variant} onClick={action(variant)} {...options}>
        Button
      </CCButton>
    )
}

SingleButton.storyName = "single.button";