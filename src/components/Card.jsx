/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import moment from "moment";

export default function Card({
  movie: { id, title, poster_path, release_date },
}) {
  return (
    <div className="flex">
      <Link to={"/movie/" + id} className="max-w-full block">
        <div className="rounded-md shadow-card cursor-pointer overflow-hidden border border-[#e3e3e3]">
          <img
            src={
              poster_path
                ? "https://image.tmdb.org/t/p/w500" + poster_path
                : "https://www.movienewz.com/img/films/poster-holder.jpg"
            }
            alt=""
            className="w-full lg:max-h-[300px]"
            data-path={poster_path}
          />
          <div className="px-3 py-3">
            <h3 className="text-gray-600 font-medium">
              <p className="truncate">{title}</p>
            </h3>
            {release_date && (
              <p className="text-gray-500 text-sm">
                {moment(release_date).format("MMM DD, YYYY")}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
