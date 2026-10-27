import Image from "next/image";
import { cn } from "@/lib/utils";

/** Betamind brain-"B" mark, from the official logo artwork (public/logo-mark.png). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      width={404}
      height={382}
      priority
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
