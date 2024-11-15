import { useAccount } from "wagmi";

import { JoinButton } from "~/components/JoinButton";
import { Heading } from "~/components/ui/Heading";
import { config } from "~/config";
import { useMaci } from "~/contexts/Maci";
import { useRound } from "~/contexts/Round";
import { RoundsList } from "~/features/rounds/components/RoundsList";
import { useIsAdmin } from "~/hooks/useIsAdmin";
import { Layout } from "~/layouts/DefaultLayout";

const HomePage = (): JSX.Element => {
  const { isConnected } = useAccount();
  const { isRegistered } = useMaci();
  const isAdmin = useIsAdmin();
  const { rounds } = useRound();

  return (
    <Layout type="home">
      <div className="flex h-auto w-screen flex-col items-center justify-center gap-4 bg-blue-50 px-2 sm:h-[90vh] dark:bg-black">
        <Heading className="mt-4 max-w-screen-lg text-center sm:mt-0" size="6xl">
          {config.eventName}
        </Heading>

        <Heading className="max-w-screen-lg text-center" size="3xl">
          {config.eventDescription}
        </Heading>

        {!isConnected && <p className="text-gray-400">Connect your wallet to get started.</p>}

        {isConnected && !isRegistered && <JoinButton />}

        {isConnected && !isAdmin && rounds && rounds.length === 0 && (
          <p className="text-gray-400">There are no rounds deployed.</p>
        )}

        {rounds && rounds.length > 0 && <RoundsList />}
      </div>
    </Layout>
  );
};

export default HomePage;
