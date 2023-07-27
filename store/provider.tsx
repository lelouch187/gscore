'use client';

import { Provider } from 'react-redux';
import { persistor, store } from '.';
import { FC, ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
