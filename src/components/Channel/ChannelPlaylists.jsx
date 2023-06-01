import { useState, useCallback, useContext, useEffect, memo } from "react";

import ChannelPlaylistsCard from "./ChannelPlaylistsCard";

import { AppContext } from "../../context/contextApi";
import { fetchDataFromApi } from "../../utils/api";

const ChannelPlaylists = ({ id }) => {
  const [selectedItem, setSelectedItem] = useState("created_playlists_newest");
  const [channelPlayLists, setChannelPlayLists] = useState([]);

  const { setLoading } = useContext(AppContext);

  const handleChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const fetchChannelPlayList = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`channel/playlists/?id=${id}&filter=${selectedItem}`).then(
      ({ contents }) => {
        setChannelPlayLists(contents);
        setLoading(false);
      }
    );
  }, [id, selectedItem]);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchChannelPlayList();
  }, [id, selectedItem, fetchChannelPlayList]);

  return (
    <div className="mt-8 grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black m-auto">
      <div className="flex justify-between items-center">
        <span className="text-white">Playlist created</span>
        <select
          onChange={handleChange}
          value={selectedItem}
          className="p-2.5 text-gray-500 border-b rounded-md shadow-sm outline-none appearance-none focus:bg-white/[0.8]"
        >
          <option selected disabled>
            Sorted by
          </option>
          <option value="created_playlists_newest">Date added (latest)</option>
          <option value="created_playlists_last_video_added">
            Last added video
          </option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-5">
        {channelPlayLists.map((item, idx) => {
          if (item.type !== "playlist") return false;
          return <ChannelPlaylistsCard key={idx} playlist={item?.playlist} />;
        })}
      </div>
    </div>
  );
};

export default memo(ChannelPlaylists);
