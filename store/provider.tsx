'use client';

import { Provider } from 'react-redux';
import { store } from '.';
import { FC, ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
