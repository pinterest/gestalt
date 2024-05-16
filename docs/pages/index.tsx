import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
}
