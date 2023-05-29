import ChannelChannelsCard from "./ChannelChannelsCard";

const ChannelChannels = ({ channels, channelFilters }) => (
  <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black m-auto">
    {channels.map((item, idx) => (
      <div>
        <div className="text-white px-8 pt-8">{item.title}</div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-5"
          key={idx}
        >
          {channelFilters.map((item1, idx1) => {
            if (item1.type !== "channel") return false;
            return <ChannelChannelsCard key={idx1} channel={item1?.channel} />;
          })}
        </div>
      </div>
    ))}
  </div>
);

export default ChannelChannels;
