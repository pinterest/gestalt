// @flow strict
import { useEffect, type Node } from 'react';
import { useRouter } from 'next/router';

export default function Index(): Node {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
}
