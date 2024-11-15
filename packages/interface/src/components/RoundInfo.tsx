interface IRoundInfoProps {
  roundId: string;
}

export const RoundInfo = ({ roundId }: IRoundInfoProps): JSX.Element => (
  <div className="w-full border-b border-gray-200 pb-2">
    <h4 id={roundId}>Round</h4>
  </div>
);
