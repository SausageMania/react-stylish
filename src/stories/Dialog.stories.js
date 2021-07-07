import { CCButton, CCDialog } from '../components';
import React, { useState } from 'react';

export default {
  title: 'Dialog',
  component: CCDialog,
}

export const Dialog = ({...options}) => {
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  return (
    <>
      <CCButton onClick={()=>setOpen(true)}>Dialog 열기</CCButton>
      <CCDialog open={open} onClose={()=>setOpen(false)} width={500} height={500}>
        <CCButton onClick={()=>setSecondOpen(true)}>다른 Dialog 열기</CCButton>
        <CCDialog 
          open={secondOpen}
          onClose={()=>setSecondOpen(false)} 
          width={200}
          height={200}
        >
          test
        </CCDialog>
      </CCDialog>
    </>
  );
}

Dialog.storyName = "single.Dialog";