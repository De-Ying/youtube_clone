import ChannelChannelsCard from "./ChannelChannelsCard";

const ChannelChannels = ({ channels, data }) => (
  <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black m-auto">
    {data?.subscriptions?.length > 0 ? (
      <div>
        <div className="text-white px-8 pt-8">Subscribe channel</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-5">
          {data?.subscriptions[0]?.contents?.map((item, idx) => {
            if (item.type !== "channel") return false;
            return <ChannelChannelsCard key={idx} channel={item?.channel} />;
          })}
        </div>
      </div>
    ) : (
      <div></div>
    )}

    {data?.channels?.length > 0 ? (
      <div>
        <div className="text-white px-8 pt-8">Related channel</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-5">
          {data?.channels[0]?.contents?.map((item, idx) => {
            if (item.type !== "channel") return false;
            return <ChannelChannelsCard key={idx} channel={item?.channel} />;
          })}
        </div>
      </div>
    ) : (
      <div></div>
    )}
  </div>
);

export default ChannelChannels;
