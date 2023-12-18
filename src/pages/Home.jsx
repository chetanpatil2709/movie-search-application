import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import MoviesApi from "../services/movies";
import Skeleton from "../components/Skeleton";
import BADREQUEST from "../BADREQUEST";

export default function Home() {
  const [movies, setMovies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wentWrong, setWentWrong] = useState(false)
  useEffect(() => {
    loadMovies();
  }, []);
  const loadMovies = useMemo(
    () => async (pageNo) => {
      setLoading(true);
      try {
        const response = await MoviesApi.getAll({ page: pageNo });
        if (response.status === 200) {
          setMovies(response.data);
          setLoading(false);
        }
      } catch (error) {
        setWentWrong({ code: error.code, msg: error.message, stack: error.stack })
        setLoading(false);
      }
    },
    []
  );

  const nextPage = () => {
    let pageNo = movies.page + 1;
    try {
      let res = loadMovies(pageNo);
      setMovies(res);
    } catch {
      // (error) => console.log(error);
    }
  };

  const prevPage = () => {
    let pageNo = movies.page - 1;
    try {
      let res = loadMovies(pageNo);
      setMovies(res);
    } catch {
      // (error) => console.log(error);
    }
  };

  useEffect(() => { }, []);
  return !wentWrong ? (
    <div className="w-full max-w-full lg:max-w-[80%]">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {movies?.results?.map((i, index) => (
              <Card key={index} movie={i} />
            ))}
          </div>
          <div className="flex justify-center py-3 mt-3 gap-4">
            <button
              type="text"
              className={`${movies?.page === 1 ? "text-gray-500 " : " hover:bg-gray-300 "
                } flex items-center gap-2  cursor-pointer px-3 py-2 border border-gray-200`}
              onClick={prevPage}
              disabled={movies?.page === 1 ? true : false}
            >
              <IoIosArrowRoundBack strokeWidth={2} className="h-4 w-4" />{" "}
              Previous
            </button>
            <div className="flex items-center gap-2">
              <p>
                Page <b>{movies?.page}</b> of <b>{movies?.total_pages}</b>
              </p>
            </div>
            <button
              type="text"
              className={`${movies?.total_pages === movies?.total_pages
                ? "text-gray-500 "
                : " hover:bg-gray-300 "
                }flex text-black items-center gap-2 hover:bg-gray-300 cursor-pointer px-3 py-2 border border-gray-200`}
              onClick={nextPage}
              disabled={false}
            >
              Next
              <IoIosArrowRoundForward strokeWidth={2} className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  ) : <>
    <BADREQUEST error={wentWrong} />
  </>
}
