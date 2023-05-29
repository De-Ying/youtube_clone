import React, { useState, useCallback, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdMusicalNote } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import ChannelDetails from "./ChannelDetails";
import ChannelVideos from "./ChannelVideos";
import ChannelPlaylists from "./ChannelPlaylists";
import ChannelCommunity from "./ChannelCommunity";
import ChannelChannels from "./ChannelChannels";
import ChannelAbout from "./ChannelAbout";
import ChannelSearch from "./ChannelSearch";

import LeftNav from "../LeftNav";

import AbbreviateNumber from "../../shared/abbreviateNumber";

import { fetchDataFromApi } from "../../utils/api";
import { AppContext } from "../../context/contextApi";

const ChannelSwitch = () => {
  let { page, id } = useParams();
  const navigate = useNavigate();
  const { setLoading } = useContext(AppContext);

  const [channelDetails, setChannelDetails] = useState();
  const [channelVideos, setChannelVideos] = useState([]);
  const [channelCommunity, setChannelCommunity] = useState([]);

  const [channelCollection, setChannelCollection] = useState([]);
  const [channelContentFilter, setChannelContentFilter] = useState([]);

  const fetchChannelDetail = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`channel/details/?id=${id}`).then((res) => {
      console.log(res);
      setChannelDetails(res);
      setLoading(false);
    });
  }, [id]);

  const fetchChannelVideo = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`channel/videos/?id=${id}`).then(({ contents }) => {
      console.log(contents);
      setChannelVideos(contents);
      setLoading(false);
    });
  }, [id]);

  const fetchChannelCommunity = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`channel/community/?id=${id}`).then(({ contents }) => {
      console.log(contents);
      setChannelCommunity(contents);
      setLoading(false);
    });
  }, [id]);

  const fetchChannelChannels = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`channel/channels/?id=${id}`).then(({ collections }) => {
      setChannelCollection(collections);
      collections.forEach((collection) => {
        fetchDataFromApi(
          `channel/channels/?id=${id}&filter=${collection?.filter}`
        ).then(({ contents }) => {
          setChannelContentFilter(contents);
        });
      });
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchChannelDetail();
    fetchChannelVideo();
    fetchChannelCommunity();
    fetchChannelChannels();
  }, [
    id,
    fetchChannelDetail,
    fetchChannelVideo,
    fetchChannelCommunity,
    fetchChannelChannels,
  ]);

  const tabNameToIndex = {
    0: "home",
    1: "videos",
    2: "playlists",
    3: "community",
    4: "channels",
    5: "about",
    6: "search",
  };

  const indexToTabName = {
    home: 0,
    videos: 1,
    playlists: 2,
    community: 3,
    channels: 4,
    about: 5,
    search: 6,
  };

  const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
  console.log(selectedTab);

  const handleChange = (event, newValue) => {
    navigate(`/channel/${id}/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="w-full">
          <div>
            <img src={channelDetails?.banner?.desktop[2]?.url} alt="" />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex w-10/12 m-auto justify-between">
              <div className="flex">
                <div>
                  <img
                    src={channelDetails?.avatar[2]?.url}
                    alt=""
                    width={channelDetails?.avatar[2]?.width}
                    height={channelDetails?.avatar[2]?.height}
                    className="rounded-full"
                  />
                </div>
                <div className="text-white ml-7 flex flex-col justify-center leading-loose">
                  <div className="flex items-center text-3xl">
                    <span className="mr-1">{channelDetails?.title}</span>
                    {channelDetails?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                      <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                    )}
                    {channelDetails?.badges[0]?.type ===
                      "OFFICIAL_ARTIST_CHANNEL" && (
                      <IoMdMusicalNote className="text-white/[0.5] text-[12px] ml-1" />
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-4 text-white/[0.8]">
                      {channelDetails?.username}
                    </span>
                    <span className="mr-4 flex text-white/[0.7]">
                      <AbbreviateNumber>
                        {channelDetails?.stats?.subscribers}
                      </AbbreviateNumber>{" "}
                      subscribers
                    </span>
                    <span className="mr-4 flex text-white/[0.7]">
                      <AbbreviateNumber>
                        {channelDetails?.stats?.videos}
                      </AbbreviateNumber>
                      videos
                    </span>
                  </div>
                  <button
                    className="flex items-center"
                    onClick={() => setSelectedTab(5)}
                  >
                    <span className="mr-2 text-white/[0.7]">
                      Learn more about this channel
                    </span>
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <button className="rounded-full bg-white p-2">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "rgb(255 255 255 / 0.2)",
              position: "sticky",
              top: 0,
              zIndex: 999,
              background: "#000",
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="basic tabs example"
              style={{ width: "83%", margin: "auto" }}
            >
              <Tab label="Home" style={{ color: "rgb(255,255,255, 0.8)" }} />
              <Tab label="Video" style={{ color: "rgb(255,255,255, 0.8)" }} />
              <Tab
                label="Playlist"
                style={{ color: "rgb(255,255,255, 0.8)" }}
              />
              <Tab
                label="Community"
                style={{ color: "rgb(255,255,255, 0.8)" }}
              />
              <Tab label="Channel" style={{ color: "rgb(255,255,255, 0.8)" }} />
              <Tab label="About" style={{ color: "rgb(255,255,255, 0.8)" }} />
              <Tab label="Search" style={{ color: "rgb(255,255,255, 0.8)" }} />
            </Tabs>
          </Box>

          {selectedTab === 0 && <ChannelDetails />}
          {selectedTab === 1 && <ChannelVideos videos={channelVideos} />}
          {selectedTab === 2 && <ChannelPlaylists />}
          {selectedTab === 3 && (
            <ChannelCommunity communities={channelCommunity} />
          )}
          {selectedTab === 4 && (
            <ChannelChannels
              channels={channelCollection}
              channelFilters={channelContentFilter}
            />
          )}
          {selectedTab === 5 && <ChannelAbout details={channelDetails} />}
          {selectedTab === 6 && <ChannelSearch />}
        </div>
      </div>
    </div>
  );
};

export default ChannelSwitch;
