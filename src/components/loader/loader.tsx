import type { HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = { size?: number } & HTMLAttributes<HTMLDivElement>;

function Loader({ className, size = 36 }: Readonly<Props>) {
  return (
    <Image
      alt="loading"
      className={cn("dark:invert", className)}
      height={size}
      src="/spinner.svg"
      width={size}
      data-testid="loader"
      loading="eager"
    />
  );
}

Loader.displayName = "Loader";

export { Loader };
