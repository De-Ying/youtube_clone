import React from "react";
import { Link } from "react-router-dom";

import { VideoLength } from "../../shared/";

const PlaylistNavCard = ({ video: { index, video }, playlistId }) => {
  return (
    <Link
      to={`/video/${video?.videoId}/${playlistId}/${index}`}
      className="flex p-1.5 hover:bg-white/10 hover:rounded-md"
    >
      <div className="flex items-center text-white mr-3">{index}</div>
      <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={video?.thumbnails[0]?.url}
          alt=""
        />
        {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
      </div>
      <div className="flex flex-col ml-3 overflow-hidden">
        <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
          {video?.title}
        </span>
        <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
          {video?.author?.title}
        </span>
      </div>
    </Link>
  );
};

export default PlaylistNavCard;
