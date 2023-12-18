import { useEffect, useState } from "react";
import MoviesApi from "../services/movies";
import { useParams } from "react-router-dom";
import moment from "moment";
import Skeleton from "../components/Skeleton";
import BADREQUEST from "../BADREQUEST";

export default function ViewMovie() {
  const params = useParams();
  const [movie, setMovie] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wentWrong, setWentWrong] = useState(false)
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await MoviesApi.getByID(params.id);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        setWentWrong({ code: error.code, msg: error.message, stack: error.stack })
        setLoading(false);
      }
    })();
  }, [params.id]);
  const getLangName = (lang) => {
    const _lang = movie?.spoken_languages.find((l) => l.iso_639_1 === lang);
    return _lang ? _lang.name : "";
  };
  const getRuntime = (totalMinutes) => {
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };
  return !wentWrong ? (
    <>
      {
        loading ? (
          <Skeleton />
        ) : <>
          {movie && (
            <div className="w-full max-w-full lg:max-w-[80%] px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:space-x-5 w-full">

                <div className="flex justify-center">
                  <div className="rounded-md shadow-lg cursor-pointer overflow-hidden border border-[#e3e3e3] lg:w-80 h-max">
                    <img
                      src={
                        movie.poster_path
                          ? "https://image.tmdb.org/t/p/original" + movie.poster_path
                          : "https://www.movienewz.com/img/films/poster-holder.jpg"
                      }
                      alt=""
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex-1 px-3">
                  <div className="pt-1 sm:pt-1">
                    <h3 className="text-black font-medium text-3xl">
                      <p className="overflow-hidden overflow-ellipsis whitespace-normal ">
                        {movie.title}{" "}
                        {movie.release_date && (
                          <span className="font-normal">
                            ({moment(movie.release_date).format("YYYY")})
                          </span>
                        )}
                      </p>
                    </h3>
                    <div className="flex flex-wrap flex-col sm:flex-row space-x-2 text-black">
                      {movie.release_date && (
                        <p className="text-gray-500 text-sm">
                          {moment(movie.release_date).format("MMM DD, YYYY")}
                        </p>
                      )}
                      {movie?.genres?.map((gen, idx) => (
                        <span
                          key={idx}
                          className="text-sm cursor-pointer font-medium before:content-['•'] before:pr-2 hover:text-gray-500"
                        >
                          {gen.name}
                        </span>
                      ))}
                      <span className="text-gray-500 text-sm cursor-pointer font-medium before:content-['•'] before:pr-2">
                        {getRuntime(movie.runtime)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 italic text-black">{movie.tagline}</div>
                  <div className="w-full mt-3">
                    <div className="text-black text-lg font-medium">Overview</div>
                    <div className="text-black mt-2">{movie.overview}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-black">
                    <div className="w-full">
                      <div className="text-base font-medium">Status <span className="sm:hidden"> :</span></div>
                      <div className="">{movie.status}</div>
                    </div>
                    <div className="w-full">
                      <div className="text-base font-medium">Original Language</div>
                      <div className="">
                        {movie.original_language &&
                          getLangName(movie.original_language)}
                      </div>
                    </div>
                    {
                      movie.budget?.toLocaleString("en-US") !== '0' &&
                      <div className="w-full">
                        <div className="text-base font-medium">Budget</div>
                        <div className="">
                          ${movie.budget?.toLocaleString("en-US")}
                        </div>
                      </div>
                    }
                    {
                      movie.revenue?.toLocaleString("en-US") !== '0' &&
                      <div className="w-full">
                        <div className="text-base font-medium">Revenue</div>
                        <div className="">
                          ${movie.revenue?.toLocaleString("en-US")}
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      }
    </>
  ) : <>
    <BADREQUEST error={wentWrong} />
  </>
}
