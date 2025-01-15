import { useCallback, useEffect, useState } from 'react';

const useIsParagraph = ({
  referenceRef,
  targetRef,
}: {
  referenceRef: React.MutableRefObject<HTMLDivElement | null>;
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const [isParagraph, setIsParagraph] = useState<boolean>(false);

  const checkParagraph = useCallback(() => {
    if (
      referenceRef?.current?.offsetHeight &&
      targetRef?.current?.offsetHeight &&
      referenceRef?.current?.offsetHeight < targetRef?.current?.offsetHeight
    ) {
      setIsParagraph(referenceRef?.current?.offsetHeight < targetRef?.current?.offsetHeight);
    }
  }, [referenceRef, targetRef]);

  useEffect(() => {
    checkParagraph();

    if (typeof window !== 'undefined') window.addEventListener('resize', checkParagraph);

    return () => {
      if (typeof window !== 'undefined') window?.removeEventListener('resize', checkParagraph);
    };
  }, [checkParagraph]);

  return isParagraph;
};

export default useIsParagraph;
