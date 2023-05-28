import ChannelVideoCard from "./ChannelVideoCard";

const ChannelVideos = ({ videos }) => {
  console.log(videos);
  return (
    <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
        {videos.map((item, idx) => {
          if (item.type !== "video") return false;
          return <ChannelVideoCard key={idx} video={item?.video} />;
        })}
      </div>
    </div>
  );
};

export default ChannelVideos;
