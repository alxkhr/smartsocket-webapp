import { Button } from '@material-ui/core';
import * as React from 'react';

export function HeaderButton(props: { onClick: () => void; children: React.ReactNode }) {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
      }}
    >
      {props.children}
    </Button>
  );
}
