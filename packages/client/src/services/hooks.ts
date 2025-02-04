import { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { PageInitArgs } from '@/routes';
import { RootState } from '@/redux/store';

export function useIsAuthorized() {
  const [isAuthorized, setValue] = useState<boolean>(false);

  function setIsAuthorized(value: boolean) {
    setValue(value);
  }
  return [isAuthorized, setIsAuthorized] as const;
}

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>;
};

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    initPage({ dispatch, state: store.getState() as RootState });
  }, []);
};
