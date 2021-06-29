import React, { forwardRef, cloneElement } from 'react';

const CCFieldGroup = forwardRef((props, ref) => {
  const {children, widthArr, ...others} = props;

  const newChildren = children.map((child, index) => { 
    if(React.isValidElement(child)){
      let location = "";
      if(index === 0) 
        location = "start";
      else if(index === children.length - 1) 
        location = "end";
      else
        location = "middle";

      return cloneElement(child, {
        key: index, 
        location: location, 
        fieldWidth: widthArr[index],
        fullWidth: true
      });
    }
    
    return child;
  })

  return <div style={{ display: "flex" }} ref={ref}>{newChildren}</div>;
}); 

export default CCFieldGroup;