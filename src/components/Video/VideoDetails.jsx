import React, {
  useState,
  useEffect,
  useContext,
  memo,
  useCallback,
} from "react";
import { useParams, Link } from "react-router-dom";

import ReactPlayer from "react-player/youtube";
import Carousel from "better-react-carousel";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdMusicalNote } from "react-icons/io";
import { AiOutlineEye, AiOutlineLike } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
import { BsPin } from "react-icons/bs";
import { BiDislike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { CiFaceSmile } from "react-icons/ci";
import { TbArrowsShuffle } from "react-icons/tb";
import { VscArrowSwap } from "react-icons/vsc";

import SuggestionVideoCard from "./SuggestionVideoCard";
import PlaylistNavCard from "../Playlist/PlaylistNavCard";

import {
  AbbreviateNumber,
  CharacterConversion,
  Expandable,
  VideoLength,
} from "../../shared/";

import { fetchDataFromApi } from "../../utils/api";
import { AppContext } from "../../context/contextApi";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [comment, setComment] = useState();
  const [commentQuery, setCommentQuery] = useState("");
  const [feedbackQuery, setFeedbackQuery] = useState("");
  const [relatedVideos, setRelatedVideos] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShowButton, setIsShowButton] = useState(false);
  const [ShowFeedback, setShowFeedback] = useState(null);
  const [isShowFeedbackButton, setIsShowFeedbackButton] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showEmojiFeedback, setShowEmojiFeedback] = useState(false);

  const [playlist, setPlaylist] = useState();
  const [playlistVideos, setPlaylistVideos] = useState();

  const { id, playlistId, idx } = useParams();
  const { setLoading } = useContext(AppContext);

  const fetchVideoDetails = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
      setLoading(false);
    });
  }, [id]);

  const fetchRelatedVideos = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      setRelatedVideos(res);
      setLoading(false);
    });
  }, [id]);

  const fetchVideoComments = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`video/comments/?id=${id}`).then((res) => {
      setComment(res);
      setLoading(false);
    });
  }, [id]);

  const fetchPlaylistVideos = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`playlist/videos/?id=${playlistId}`).then(
      ({ contents }) => {
        setPlaylistVideos(contents);
        console.log(contents);
        setLoading(false);
      }
    );
  }, [playlistId]);

  const fetchPlaylistDetails = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`playlist/details/?id=${playlistId}`).then((res) => {
      // console.log(res);
      setPlaylist(res);
      setLoading(false);
    });
  }, [playlistId]);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
    fetchVideoComments();
    fetchPlaylistVideos();
    fetchPlaylistDetails();
  }, [
    id,
    playlistId,
    fetchVideoDetails,
    fetchRelatedVideos,
    fetchVideoComments,
    fetchPlaylistVideos,
    fetchPlaylistDetails,
  ]);

  function ConvertToNumber(nums) {
    let convert = nums.toString(10);
    let slice = convert.slice(0, convert.length - 3);
    let result = Number(slice);

    return result;
  }

  const commentQueryHandler = () => {
    if (commentQuery?.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const feedbackShowButton = (idx) => {
    setShowFeedback(ShowFeedback === idx ? null : idx);
  };

  const feedbackQueryHandler = () => {
    if (feedbackQuery?.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const addEmoji = (e) => {
    const symbols = e.unified.split("_");
    const codeArray = [];
    symbols.forEach((symbol) => codeArray.push("0x" + symbol));
    let emoji = String.fromCodePoint(...codeArray);
    setCommentQuery(commentQuery + emoji);
  };

  const addEmojiFeedback = (e) => {
    const symbols = e.unified.split("_");
    const codeArray = [];
    symbols.forEach((symbol) => codeArray.push("0x" + symbol));
    let emojiFeedback = String.fromCodePoint(...codeArray);
    setFeedbackQuery(feedbackQuery + emojiFeedback);
  };

  const handleCloseComment = () => {
    setIsShowButton(false);
    setCommentQuery("");
    setShowEmoji(false);
  };

  const handleCloseFeedback = () => {
    setShowFeedback(null);
    setFeedbackQuery("");
    setShowEmojiFeedback(false);
  };

  return (
    <div className="flex justify-center flex-row h-auto bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>

          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>

          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <Link to={`/channel/${video?.author?.channelId}/home`}>
                <div className="flex items-start">
                  <div className="flex h-11 w-11 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={video?.author?.avatar[0]?.url}
                      alt=""
                    />
                  </div>
                </div>
              </Link>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                  )}
                  {video?.author?.badges[0]?.type ===
                    "OFFICIAL_ARTIST_CHANNEL" && (
                    <IoMdMusicalNote className="text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11">
                <AiOutlineLike className="text-xl text-white mr-2" />
                <AbbreviateNumber type="Likes">
                  {video?.stats?.likes}
                </AbbreviateNumber>
              </div>
              <div className="flex items-center justify-center h-11 ml-4">
                <AiOutlineEye className="text-xl text-white mr-2" />
                <AbbreviateNumber type="Views">
                  {video?.stats?.views}
                </AbbreviateNumber>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.15] mt-6 rounded-md px-3 py-3">
            <div className="text-white/[0.7] text-sm flex">
              <AbbreviateNumber type="Views">
                {video?.stats?.views}
              </AbbreviateNumber>
              <span className="mx-2">{video?.publishedDate}</span>
              {video?.superTitle?.items.map((item, idx) => (
                <span key={idx} className="mr-1">
                  {item}
                </span>
              ))}
            </div>
            <div className="text-white/[0.7] text-sm">
              <Expandable>{video?.description}</Expandable>

              {video?.musics.length > 0 && (
                <div className="text-white/[0.7] text-sm">
                  <div className="bg-slate-50 text-main-blue border border-gray-300 drop-shadow-lg text-sm rounded-md my-5 block w-full p-0.5 whitespace-normal word-break:break-word"></div>
                  <h3 className="text-lg font-bold mb-2">Âm nhạc</h3>
                  <Carousel
                    cols={2}
                    rows={1}
                    gap={10}
                    loop
                    scrollSnap
                    autoPlay={1000}
                    mobileBreakpoint={767}
                  >
                    {video?.musics.map((item, idx) => (
                      <Carousel.Item key={idx}>
                        <Link to={`/video/${item?.videoId}`}>
                          <div className="border-2 text-white/[0.7] shadow-lg shadow-blue-500/40 hover:shadow-indigo-500/40">
                            <div className="pt-2 px-2">{item?.title}</div>
                            <div className="pb-2 px-2">
                              Bài hát {idx + 1} / {video?.musics.length}
                            </div>
                          </div>
                        </Link>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              )}

              {video?.chapters.length > 0 && (
                <div className="text-white/[0.7] text-sm">
                  <div className="bg-slate-50 text-main-blue border border-gray-300 drop-shadow-lg text-sm rounded-md my-5 block w-full p-0.5 whitespace-normal word-break:break-word"></div>
                  <h3 className="text-lg font-bold mb-2">Phân cảnh</h3>
                  <Carousel
                    cols={5}
                    rows={1}
                    gap={10}
                    loop
                    scrollSnap
                    autoPlay={1000}
                    mobileBreakpoint={767}
                  >
                    {video?.chapters.map((item, idx) => (
                      <Carousel.Item key={idx}>
                        <div className="relative h-24 md:h-20 md:rounded-xl overflow-hidden">
                          <img
                            src={item?.thumbnails[0]?.url}
                            height={item?.thumbnails[0]?.height}
                            width={item?.thumbnails[0]?.width}
                            alt=""
                          />
                          {item?.startingMs && (
                            <VideoLength
                              time={ConvertToNumber(item?.startingMs)}
                            />
                          )}
                        </div>
                        <div className="mt-2">
                          <p className="font-semibold">{item?.title}</p>
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              )}
            </div>
          </div>

          <div className="text-white text-sm mt-4 flex">
            <div className="mr-16">Tags:</div>
            <div className="text-blue-500">
              {video?.keywords.map((item, idx) => (
                <Link to={`/searchResult/${item}`} key={idx}>
                  {" " + item + ", "}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-white text-base mt-4 flex items-center">
            <AbbreviateNumber type="Comment">
              {comment?.totalCommentsCount}
            </AbbreviateNumber>
            <div className="relative flex flex-col items-baseline w-auto h-auto rounded-lg ml-4 px-4 ">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full flex items-center px-3 mx-1 justify-between font-bold text-base rounded-lg tracking-wider border-1 border-white active:border-[#2f4f4f] duration-300 active:text-[#dcdcdc]"
              >
                Sorted by
                {!isOpen ? (
                  <AiOutlineCaretDown className="h-8" />
                ) : (
                  <AiOutlineCaretUp className="h-8" />
                )}
              </button>

              {isOpen && (
                <div className="bg-black/[0.7] absolute top-10 flex flex-col items-start rounded-lg p-2 w-full">
                  {comment?.filters.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex w-full justify-between hover:bg-[#696969] hover:pl-2 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
                    >
                      <h3 className="py-2">{item.title}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex mt-4">
            <div className="flex items-start mr-4">
              <div className="flex h-11 w-11 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src="https://xsgames.co/randomusers/assets/avatars/female/67.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="w-full">
              <input
                type="text"
                className="py-3 bg-black w-full focus:outline-none text-white border-b border-white/[0.6] border-solid focus:border-white"
                placeholder="Write Comment ..."
                onFocus={() => setIsShowButton(true)}
                onChange={(e) => setCommentQuery(e.target.value)}
                onKeyUp={commentQueryHandler}
                value={commentQuery}
              />

              {isShowButton && (
                <div className="flex justify-between mt-3 items-center">
                  <div className="relative">
                    <button
                      className="p-1.5 rounded-full hover:bg-white/[0.25]"
                      onClick={() => setShowEmoji(!showEmoji)}
                    >
                      <CiFaceSmile className="text-xl text-white relative" />
                    </button>

                    {showEmoji && (
                      <div className="absolute z-50">
                        <Picker
                          data={data}
                          emojiSize={20}
                          emojiButtonSize={28}
                          onEmojiSelect={addEmoji}
                          maxFrequentRows={0}
                          theme="dark"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex">
                    <button
                      className="bg-white/[0.1] hover:bg-white/[0.2] p-2 mr-2 text-white rounded-md"
                      onClick={handleCloseComment}
                    >
                      Cancel
                    </button>
                    <button
                      className={`bg-white/[0.05] p-2 text-white rounded-md ${
                        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                      disabled={isDisabled}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            {comment?.comments?.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex mt-4">
                  <div className="flex items-start mr-4">
                    <div className="flex h-11 w-11 rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={item?.author?.avatar[0]?.url}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    {item?.pinned?.status && (
                      <div className="flex text-white/[0.8] items-center">
                        <BsPin className="mr-2" />
                        {item?.pinned?.text}
                      </div>
                    )}

                    <div className="flex items-center">
                      <div
                        className={`flex items-center ${
                          item?.author?.isChannelOwner
                            ? "bg-white/[0.25]"
                            : "bg-black"
                        }  w-fit rounded-xl ${
                          item?.author?.isChannelOwner
                            ? "text-white/[0.8]"
                            : "text-white"
                        } px-3 my-1 mr-1`}
                      >
                        <CharacterConversion>
                          {item?.author?.title}
                        </CharacterConversion>
                        {item?.author?.badges[0]?.type ===
                          "VERIFIED_CHANNEL" && (
                          <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                        )}
                        {item?.author?.badges[0]?.type ===
                          "OFFICIAL_ARTIST_CHANNEL" && (
                          <IoMdMusicalNote className="text-white/[0.5] text-[12px] ml-1" />
                        )}
                      </div>
                      <div className="text-white/[0.8]">
                        {item?.publishedTimeText}
                      </div>
                    </div>

                    <div className="text-white whitespace-pre-line">
                      {item?.content}
                    </div>

                    <div className="flex text-white mt-4 md:mt-0">
                      <div className="flex items-center justify-center h-11">
                        <AiOutlineLike className="text-xl text-white mr-2" />
                        <AbbreviateNumber type="Likes">
                          {item?.stats?.votes}
                        </AbbreviateNumber>
                      </div>

                      <div className="flex items-center justify-center h-11 ml-4 mr-1">
                        <BiDislike className="text-xl text-white mr-2" />
                      </div>

                      {item?.creatorHeart && (
                        <div className="flex items-center relative mr-4">
                          <img
                            src={item?.author?.avatar[0]?.url}
                            alt=""
                            className="w-5 rounded-full"
                          />
                          <FcLike className="absolute -right-2 bottom-2" />
                        </div>
                      )}

                      <div className="flex items-center">
                        <button
                          className="hover:rounded-md px-1 py-1 hover:bg-white/[0.35]"
                          onClick={() => feedbackShowButton(idx)}
                        >
                          Phản hồi
                        </button>
                      </div>
                    </div>

                    {ShowFeedback === idx && (
                      <div className="flex mt-1">
                        <div className="flex items-start mr-4">
                          <div className="flex h-11 w-11 rounded-full overflow-hidden">
                            <img
                              className="h-full w-full object-cover"
                              src="https://xsgames.co/randomusers/assets/avatars/female/67.jpg"
                              alt=""
                            />
                          </div>
                        </div>

                        <div className="w-full">
                          <input
                            type="text"
                            className="py-3 bg-black w-full focus:outline-none text-white border-b border-white/[0.6] border-solid focus:border-white"
                            placeholder="Feedback Comment ..."
                            onFocus={() => setIsShowFeedbackButton(true)}
                            onChange={(e) => setFeedbackQuery(e.target.value)}
                            onKeyUp={feedbackQueryHandler}
                            value={feedbackQuery}
                          />

                          {isShowFeedbackButton && (
                            <div className="flex justify-between mt-3 items-center">
                              <div className="relative">
                                <button
                                  className="p-1.5 rounded-full hover:bg-white/[0.25]"
                                  onClick={() =>
                                    setShowEmojiFeedback(!showEmojiFeedback)
                                  }
                                >
                                  <CiFaceSmile className="text-xl text-white relative" />
                                </button>

                                {showEmojiFeedback && (
                                  <div className="absolute z-50">
                                    <Picker
                                      data={data}
                                      emojiSize={20}
                                      emojiButtonSize={28}
                                      onEmojiSelect={addEmojiFeedback}
                                      maxFrequentRows={0}
                                      theme="dark"
                                    />
                                  </div>
                                )}
                              </div>
                              <div className="flex">
                                <button
                                  className="bg-white/[0.1] hover:bg-white/[0.2] p-2 mr-2 text-white rounded-md"
                                  onClick={handleCloseFeedback}
                                >
                                  Cancel
                                </button>
                                <button
                                  className={`bg-white/[0.05] p-2 text-white rounded-md ${
                                    isDisabled
                                      ? "cursor-not-allowed"
                                      : "cursor-pointer"
                                  }`}
                                  disabled={isDisabled}
                                >
                                  Comment
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ml-16">ABC</div>
              </div>
            ))}
          </div>
        </div>

        {playlistVideos?.length > 0 ? (
          <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
            <div className="border border-solid border-white/40 rounded-2xl shadow-lg">
              <div className="text-white px-6 py-5">
                <div className="mb-1">
                  <div className="text-2xl">{playlist?.title}</div>
                  <span className="text-white/80">
                    {playlist?.author?.title} - {idx} /{" "}
                    {playlist?.stats?.videos}
                  </span>
                </div>
                <div>
                  <button className="p-2.5 bg-white/[0.1] rounded-full mr-2 hover:bg-white/[0.3]">
                    <TbArrowsShuffle />
                  </button>
                  <button className="p-2.5 bg-white/[0.1] rounded-full mr-2 hover:bg-white/[0.3]">
                    <VscArrowSwap />
                  </button>
                </div>
              </div>
              <div className="overflow-y-scroll h-[70vh]">
                {playlistVideos.map((item, idx) => {
                  if (item?.type !== "video") return false;
                  return (
                    <PlaylistNavCard
                      key={idx}
                      video={item}
                      playlistId={playlistId}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
            {relatedVideos?.contents?.map((item, idx) => {
              if (item?.type !== "video") return false;
              return <SuggestionVideoCard key={idx} video={item?.video} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(VideoDetails);
