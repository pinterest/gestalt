// @flow strict
import { type Node as ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index(): ReactNode {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
}
