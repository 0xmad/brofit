import Image from "next/image";

import { config, metadata } from "~/config";

export const Logo = (): JSX.Element => (
  <div className="h-10" style={{ height: 50 }}>
    {config.logoUrl ? (
      <Image alt="logo" className="dark:invert" height={50} src={config.logoUrl} style={{ height: 50 }} width={150} />
    ) : (
      <div className="flex h-full items-center justify-center rounded-md border border-black px-2 font-mono text-sm font-medium">
        {metadata.title}
      </div>
    )}
  </div>
);
