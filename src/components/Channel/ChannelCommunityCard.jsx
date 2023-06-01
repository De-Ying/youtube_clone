import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdOutlineComment } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdMusicalNote } from "react-icons/io";

import { AbbreviateNumber, Expandable, VideoLength } from "../../shared";

const ChannelCommunityCard = ({ community }) => {
  return (
    <div className="mb-6 w-full h-full overflow-y-auto bg-white m-auto rounded-2xl">
      <div className="flex p-4">
        <div className="flex-1 max-w-fit mr-4">
          <img
            src={community?.author?.avatar[0].url}
            alt=""
            className="rounded-full"
            width="60px"
          />
        </div>
        <div className="flex-1">
          <div className="flex">
            <div className="font-semibold mr-4 mb-3">
              {community?.author?.title}
            </div>
            <div className="font-extralight">
              {community?.publishedTimeText}
            </div>
          </div>
          <div className="whitespace-pre-line">
            <Expandable>{community?.text}</Expandable>
          </div>
          {community?.attachment?.type === "images" && (
            <div>
              <img
                src={community?.attachment?.images[0].source[0].url}
                alt=""
                width="80%"
              />
            </div>
          )}
          {community?.attachment?.type === "video" && (
            <Link to={`/video/${community?.attachment?.video?.videoId}`}>
              <div className="flex mb-6 mt-3">
                <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={community?.attachment?.video?.thumbnails[0].url}
                    alt=""
                  />
                  {community?.attachment?.video?.lengthSeconds && (
                    <VideoLength
                      time={community?.attachment?.video?.lengthSeconds}
                    />
                  )}
                </div>
                <div className="flex">
                  <div className="flex flex-col ml-3 overflow-hidden">
                    <span className="text-sm line-clamp-2 font-medium">
                      {community?.attachment?.video?.title}
                    </span>
                    <span className="text-[12px] font-semibold mt-2 text-black/[0.7] flex items-center">
                      {community?.attachment?.video?.author?.title}
                      {community?.attachment?.video?.author?.badges[0]?.type ===
                        "VERIFIED_CHANNEL" && (
                        <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                      )}
                      {community?.attachment?.video?.author?.badges[0]?.type ===
                        "OFFICIAL_ARTIST_CHANNEL" && (
                        <IoMdMusicalNote className="text-white/[0.5] text-[12px] ml-1" />
                      )}
                    </span>
                    <div className="flex text-[12px] font-semibold text-black/[0.7] truncate overflow-hidden">
                      <AbbreviateNumber type="Views">
                        {community?.attachment?.video?.stats?.views}
                      </AbbreviateNumber>
                      <span className="flex text-[24px] leading-none font-bold text-black/[0.7] relative top-[-10px] mr-2">
                        .
                      </span>
                      <span className="truncate">
                        {community?.attachment?.video?.publishedTimeText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          <div className="flex mt-3">
            <button className="flex items-center mr-2">
              <AiOutlineLike className="mr-2" />
              <AbbreviateNumber>{community?.stats?.likes}</AbbreviateNumber>
            </button>
            <button className="mr-2">
              <AiOutlineDislike />
            </button>
            <button className="flex items-center mr-2">
              <MdOutlineComment className="mr-2" />
              <AbbreviateNumber>{community?.stats?.comments}</AbbreviateNumber>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelCommunityCard;
