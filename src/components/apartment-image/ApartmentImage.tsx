interface ApartmentImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function ApartmentImage({ src, alt, className, loading = 'lazy' }: ApartmentImageProps) {
  return (
    <img className={className} src={src} alt={alt} loading={loading} decoding="async" />
  );
}
