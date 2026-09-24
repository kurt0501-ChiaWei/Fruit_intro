import Image from "next/image";
import type { Photo } from "@/data/photos";

type Props = {
  photo: Photo;
  className?: string;
  /** 圖片在畫面上的大約寬度，給 next/image 挑選合適尺寸 */
  sizes: string;
  eager?: boolean;
};

/** 圓形照片 + 亮面反光，和 Sphere 同一套玻璃質感 */
export default function PhotoOrb({ photo, className = "", sizes, eager }: Props) {
  return (
    <span className={`gloss block shrink-0 overflow-hidden rounded-full ${className}`}>
      <Image
        src={photo.src}
        alt={photo.label}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="object-cover"
      />
    </span>
  );
}
