import { Link } from "react-router-dom";

import AbbreviateNumber from "../../shared/abbreviateNumber";
import { BsFlag } from "react-icons/bs";
import { BsShare } from "react-icons/bs";

const ChannelAbout = ({ details }) => {
  console.log(details);
  return (
    <div className="flex w-11/12 m-auto mt-4 text-white flex-col lg:flex-row">
      <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6">
        <div className="border-b border-solid border-white/[0.4] pb-6">
          <span>Description</span>
          <p className="whitespace-pre-line mt-6">{details?.description}</p>
        </div>
        <div className="mt-4 pb-6">
          <span>Detail</span>
          <table className="table-fixed mt-6">
            {details?.hasBusinessEmail && (
              <tr>
                <th className="pr-4">For business inquiry:</th>
                <td>
                  <button className="rounded-full bg-[#696969] p-2">
                    See Email Address
                  </button>
                </td>
              </tr>
            )}

            <tr>
              <th className="pt-3">Location:</th>
              <td className="pt-3">{details?.country}</td>
            </tr>
          </table>
        </div>
        <div className="mt-4 pb-6">
          <span>Links</span>
          <div className="mt-6">
            {details?.links?.map((link, idx) => (
              <Link to={link.targetUrl} key={idx} className="flex my-2 mr-4">
                <img src={link.icon} alt="" className="mr-2 w-6" />
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
        <span className="border-b border-solid border-white/[0.4] pb-3">
          Statistical
        </span>
        <span className="border-b border-solid border-white/[0.4] py-3">
          {details?.joinedDateText}
        </span>
        <span className="flex border-b border-solid border-white/[0.4] py-3">
          <AbbreviateNumber>{details?.stats?.views}</AbbreviateNumber> Views
        </span>
        <span className="flex py-3">
          <Link className="text-lg mr-16">
            <BsFlag />
          </Link>
          <Link className="text-lg mr-16">
            <BsShare />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ChannelAbout;
