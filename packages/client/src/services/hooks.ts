import { useState } from 'react';

export function useIsAuthorized() {
  const [isAuthorized, setValue] = useState<boolean>(false);

  function setIsAuthorized(value: boolean) {
    setValue(value);
  }
  return [isAuthorized, setIsAuthorized] as const;
}
