import Image, { ImageProps } from 'next/future/image';

export default function ReducedMotionImage({
  staticImgSrc,
  ...imgProps
}: ImageProps & { staticImgSrc: string }) {
  return (
    <picture>
      <source media="(prefers-reduced-motion: reduce)" srcSet={staticImgSrc} />
      <Image {...imgProps} />
    </picture>
  );
}
