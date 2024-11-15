import Image from "next/image";

export const Sponsor = (): JSX.Element => (
  <div className="h-10" style={{ height: 50 }}>
    <Image alt="logo" className="dark:invert" height="50" src="/Sponsor.svg" style={{ height: 50 }} width="132" />
  </div>
);
