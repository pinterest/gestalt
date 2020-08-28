// @flow strict
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // flowlint-line untyped-import:off

export default function useTracking(trackingId: string) {
  const { listen } = useHistory();

  useEffect(() => {
    const unlisten = listen(location => {
      if (!window.gtag) return;

      window.gtag('config', trackingId, {
        page_path: location.pathname + location.search + location.hash,
      });
    });

    return unlisten;
  }, [trackingId, listen]);
}
