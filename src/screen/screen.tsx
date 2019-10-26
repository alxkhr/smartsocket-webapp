import * as React from 'react';

import { HeaderButton } from './button/button';
import * as css from './screen.css';

export function Screen(props: {
  title?: string;
  children?: React.ReactNode;
  menu?: { onClick: () => void; icon: React.ReactNode }[];
}) {
  return (
    <div className={css.screen}>
      <div className={css.header}>
        <img src="/img/logo_small.svg" />
        <div className={css.title}>{props.title || 'Smart Socket'}</div>
        {props.menu &&
          props.menu.map(({ onClick, icon }, i) => (
            <HeaderButton key={i} onClick={onClick}>
              {icon}
            </HeaderButton>
          ))}
      </div>
      <div className={css.content}>{props.children}</div>
    </div>
  );
}
