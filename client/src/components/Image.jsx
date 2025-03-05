import { IKImage } from "imagekitio-react";

const URL = import.meta.env.VITE_IK_URL;

export const Image = ({ src, className, w, h, alt }) => {
  return (
    <IKImage
      urlEndpoint={URL}
      className={className}
      path={src}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
    />
  );
};
