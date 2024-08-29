import { type ImgHTMLAttributes } from 'react';

export default function ReducedMotionGIF({
  staticImgSrc,
  alt,
  ...imgProps
}: ImgHTMLAttributes<HTMLImageElement> & { staticImgSrc: string }) {
  return (
    <picture>
      <source media="(prefers-reduced-motion: reduce)" srcSet={staticImgSrc} />

      {/* Using <img> instead of <Image/> to preserve the original src URL,
      avoiding Next.js's automatic image optimization. */}
      <img {...imgProps} alt={alt} />
    </picture>
  );
}
