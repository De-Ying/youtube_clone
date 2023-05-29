import ChannelCommunityCard from "./ChannelCommunityCard";

const ChannelCommunity = ({ communities }) => {
  console.log(communities);
  return (
    <div className="mt-8 grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black m-auto">
      {communities.length === 0 && (
        <div className="flex justify-center text-white">
          This channel has not posted yet
        </div>
      )}

      {communities.map((item, idx) => {
        if (item.type !== "post") return false;
        return <ChannelCommunityCard key={idx} community={item?.post} />;
      })}
    </div>
  );
};

export default ChannelCommunity;
