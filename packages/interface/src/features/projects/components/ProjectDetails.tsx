/* eslint-disable jsx-a11y/media-has-caption */
import { type ReactNode } from "react";

import { Heading } from "~/components/ui/Heading";
import { Navigation } from "~/components/ui/Navigation";
import { ProjectAvatar } from "~/features/projects/components/ProjectAvatar";
import { ProjectBanner } from "~/features/projects/components/ProjectBanner";
import { VotingWidget } from "~/features/projects/components/VotingWidget";
import { useRoundState } from "~/utils/state";
import { ERoundState } from "~/utils/types";

import type { IRecipient } from "~/utils/types";

import { useProjectMetadata } from "../hooks/useProjects";

import { ProjectContacts } from "./ProjectContacts";

export interface IProjectDetailsProps {
  pollId: string;
  // eslint-disable-next-line react/no-unused-prop-types
  action?: ReactNode;
  project: IRecipient;
}

const ProjectDetails = ({ pollId, project }: IProjectDetailsProps): JSX.Element => {
  const metadata = useProjectMetadata(project.metadataUrl);

  const { bio, websiteUrl, payoutAddress, profileImageUrl, bannerImageUrl } = metadata.data ?? {};

  const roundState = useRoundState(pollId);

  return (
    <div className="relative dark:text-white">
      <div className="mb-7 px-2">
        <Navigation pollId={pollId} projectName={metadata.data?.name ?? "project name"} />
      </div>

      <div className="overflow-hidden rounded-3xl">
        <ProjectBanner size="lg" url={bannerImageUrl} />
      </div>

      <div className="mb-8 flex items-end gap-4">
        <ProjectAvatar className="-mt-20 ml-8" rounded="full" size="lg" url={profileImageUrl} />
      </div>

      <div className="flex flex-col items-center justify-between px-2 sm:flex-row">
        <Heading as="h3" size="3xl">
          {metadata.data?.name}
        </Heading>

        {roundState === ERoundState.VOTING && (
          <VotingWidget pollId={pollId} projectId={project.id} projectIndex={Number.parseInt(project.index, 10)} />
        )}
      </div>

      {/** eslint-disable-next-line jsx-a11y/media-has-caption */}
      {/** https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm */}
      <video controls src={websiteUrl} style={{ height: "auto", maxHeight: 500, width: "100%" }} />

      <p className="mt-3 px-2 text-gray-400">{bio}</p>

      <ProjectContacts author={payoutAddress} />
    </div>
  );
};

export default ProjectDetails;
