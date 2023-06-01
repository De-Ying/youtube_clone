import React from "react";
import { Link } from "react-router-dom";
import { MdPlaylistPlay } from "react-icons/md";
import { BsPlay } from "react-icons/bs";

const ChannelPlaylistsCard = ({ playlist }) => {
  return (
    <div className="flex flex-col mb-8">
      <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
        <img
          className="h-full w-full object-fill"
          src={playlist?.thumbnails[0]?.url}
          alt=""
        />
        <div className="absolute text-white flex justify-between items-center bottom-0 w-full px-3 bg-[#008b8b] opacity-70 ">
          <span className="text-2xl">
            <MdPlaylistPlay />
          </span>
          <span className="text-base">{playlist?.stats?.videos} video</span>
        </div>
        <div className="absolute h-full w-full bg-black/[0.6] flex items-center justify-center -bottom-10 hover:bottom-0 opacity-0 hover:opacity-100 transition-all duration-300">
          <Link className="flex items-center text-white uppercase">
            <BsPlay className="text-3xl" />
            <span>Play All</span>
          </Link>
        </div>
      </div>

      <div className="flex text-white mt-3">
        <div className="flex flex-col overflow-hidden">
          <span className="text-base font-medium line-clamp-2 mb-1">
            {playlist?.title}
          </span>
          {playlist?.updatedTimeText !== "" && (
            <span className="text-sm text-white/[0.8] mt-1">
              {playlist?.updatedTimeText}
            </span>
          )}
          <Link
            to={`/playlist/${playlist?.playlistId}`}
            className="text-base text-white/[0.6] hover:text-white/[0.8]"
          >
            See the full list
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChannelPlaylistsCard;
