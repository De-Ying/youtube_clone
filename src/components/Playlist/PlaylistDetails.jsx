import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  memo,
} from "react";
import { Link, useParams } from "react-router-dom";

import { MdPlaylistAdd } from "react-icons/md";
import { TbShare3, TbArrowsShuffle } from "react-icons/tb";
import { RxDotsVertical } from "react-icons/rx";
import { BsFillPlayFill } from "react-icons/bs";

import { AbbreviateNumber } from "../../shared/";

import { fetchDataFromApi } from "../../utils/api";
import { AppContext } from "../../context/contextApi";

import PlaylistVideoCard from "./PlaylistVideoCard";
import { LeftNav } from "../";

const PlaylistDetails = () => {
  const { id } = useParams();
  const { setLoading } = useContext(AppContext);

  const [playlist, setPlaylist] = useState();
  const [playlistVideos, setPlaylistVideos] = useState();

  const fetchPlaylistDetails = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`playlist/details/?id=${id}`).then((res) => {
      // console.log(res);
      setPlaylist(res);
      setLoading(false);
    });
  }, [id]);

  const fetchPlaylistVideos = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`playlist/videos/?id=${id}`).then(({ contents }) => {
      // console.log(contents);
      setPlaylistVideos(contents);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchPlaylistDetails();
    fetchPlaylistVideos();
  }, [id, fetchPlaylistDetails, fetchPlaylistVideos]);

  return (
    <div className="flex justify-center flex-row h-auto bg-black">
      <div className="w-full flex flex-col lg:flex-row">
        <LeftNav />
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] text-white">
          <div className="bg-gradient-to-b from-[#0f5b65cc] from-0% via-[#0f5b654c] via-30% to-[#0f5b65cc] to-100% rounded-xl">
            <div className="p-5 overflow-y-scroll h-[85vh]">
              <Link>
                <img
                  src={playlist?.thumbnails[0]?.url}
                  alt=""
                  className="w-full rounded-xl object-cover"
                />
              </Link>
              <div className="mt-4">
                <span className="text-lg font-semibold">{playlist?.title}</span>
                <div className="mt-4">
                  <div className="mb-3">
                    <div>{playlist?.author?.title}</div>
                    <div className="text-sm text-white/[0.8]">
                      <AbbreviateNumber type="video">
                        {playlist?.stats?.videos}
                      </AbbreviateNumber>
                      <AbbreviateNumber type="view">
                        {playlist?.stats?.views}
                      </AbbreviateNumber>
                      {playlist?.updatedTimeText !== "" && (
                        <span>{playlist?.updatedTimeText}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <button className="p-2.5 bg-white/[0.1] rounded-full mr-2 hover:bg-white/[0.3]">
                      <MdPlaylistAdd />
                    </button>
                    <button className="p-2.5 bg-white/[0.1] rounded-full mr-2 hover:bg-white/[0.3]">
                      <TbShare3 />
                    </button>
                    <button className="p-2.5 bg-white/[0.1] rounded-full mr-2 hover:bg-white/[0.3]">
                      <RxDotsVertical />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between mt-3 mb-3">
                  <button className="flex items-center justify-center bg-white p-1.5 text-black rounded-2xl w-[45%]">
                    <BsFillPlayFill />
                    <span className="ml-1.5">Play all</span>
                  </button>
                  <button className="flex items-center justify-center bg-white p-1.5 text-black rounded-2xl w-[45%]">
                    <TbArrowsShuffle />
                    <span className="ml-1.5">Shuffling</span>
                  </button>
                </div>
                <div className="whitespace-pre-line">
                  {playlist?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:w-[calc(100%-550px)] xl:w-[calc(100%-600px)] py-3 lg:py-6 text-white">
          <div className="grid grid-cols-1 gap-2">
            {playlistVideos?.map((item, idx) => {
              if (item?.type !== "video") return false;
              return (
                <PlaylistVideoCard key={idx} video={item} playlistId={id} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PlaylistDetails);
