import { useContext } from 'react';
import { useStore } from 'zustand';
import { BaseStoreContext } from '~/store/baseStore';

export function ChildComponent() {
  const store = useContext(BaseStoreContext);

  if (!store) {
    throw new Error('xxx');
  }

  const name = useStore(store, (s) => s.name);
  const changeName = useStore(store, (s) => s.changeName);

  return <div onClick={() => changeName('change name by Effect')}>{name}</div>;
}
