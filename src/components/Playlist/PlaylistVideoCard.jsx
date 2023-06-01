import React from "react";
import { Link } from "react-router-dom";

import { VideoLength } from "../../shared/";

const PlaylistVideoCard = ({ video: { index, video }, playlistId }) => {
  return (
    <Link to={`/video/${video?.videoId}/${playlistId}/${index}`}>
      <div className="flex flex-col md:flex-row mb-8 md:mb-3 lg:hover:bg-white/[0.1] rounded-xl md:p-4">
        <div className="flex items-center mr-5">{index}</div>
        <div className="relative flex shrink-0 h-40 md:h-24 lg:h-32 xl:h-40 w-full md:w-32 lg:w-48 xl:w-64 rounded-xl bg-slate-800 overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={video?.thumbnails[0]?.url}
            alt=""
          />
          {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
        </div>
        <div className="flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
          <span className="text-lg md:text-xl font-semibold line-clamp-2 text-white">
            {video?.title}
          </span>
          <div className="hidden md:flex items-center">
            <div className="flex flex-col">
              <Link
                to={`/channel/${video?.author?.channelId}/home`}
                className="text-sm font-semibold mt-2 text-white/[0.7] flex items-center"
              >
                {video?.author?.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistVideoCard;
