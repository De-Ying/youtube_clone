import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdOutlineComment } from "react-icons/md";

import AbbreviateNumber from "../../shared/abbreviateNumber";
import Expandable from "../../shared/expandable";

const ChannelCommunityCard = ({ community }) => {
  return (
    <div className="mb-6 w-full h-full overflow-y-auto bg-white m-auto rounded-2xl">
      <div className="flex p-4">
        <div className="flex-1 max-w-fit mr-4">
          <img
            src={community?.author?.avatar[2].url}
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
          <div>
            <img
              src={community?.attachment?.images[0].source[4].url}
              alt=""
              width={community?.attachment?.images[0].source[4].width}
              height={community?.attachment?.images[0].source[4].height}
            />
          </div>
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
