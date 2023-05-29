import React from "react";
import { Link } from "react-router-dom";

const ChannelChannelsCard = ({ channel }) => {
  console.log(channel);
  return (
    <div className="my-4">
      <Link
        to={`/channel/${channel?.channelId}/home`}
        className="flex flex-col text-white mb-3 text-center"
      >
        <div className="mb-3">
          <img
            src={channel?.avatar[0]?.url}
            alt=""
            className="w-1/2 rounded-full object-contain filter: drop-shadow(0, 0, 3px, #fff) m-auto"
          />
        </div>
        <span>{channel?.title}</span>
        <span className="text-white/[0.8]">
          {channel?.stats?.subscribersText}
        </span>
      </Link>

      <div className="flex justify-center">
        <button className="rounded-full bg-white p-2">Subcribe</button>
      </div>
    </div>
  );
};

export default ChannelChannelsCard;
