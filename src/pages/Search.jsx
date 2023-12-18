import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import MoviesApi from "../services/movies";
import Skeleton from "../components/Skeleton";
import BADREQUEST from "../BADREQUEST";

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQry = searchParams.get("qry");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState();
  const [wentWrong, setWentWrong] = useState(false)
  const loadMovies = async (pageNo) => {
    setLoading(true);
    if (searchQry === 'genre') {
      const id = searchParams.get("id");
      try {
        const response = await MoviesApi.getByGenres({ id: id.toString() });
        if (response.status === 200) {
          setMovies(response.data);
          setLoading(false);
        }
      } catch (error) {
        setWentWrong({ code: '', msg: '', title: '' })
        setLoading(false)
      }
    } else {
      try {
        const response = await MoviesApi.searchMovie({ searchQry: searchQry, page: pageNo });
        if (response.status === 200) {
          setMovies(response.data);
          setLoading(false);
        }
      } catch (error) {
        setWentWrong({ code: error.code, msg: error.message, stack: error.stack })
        setLoading(false);
      }
    }
  }
  useEffect(() => { loadMovies(); }, [searchParams]);

  const nextPage = async () => {
    let pageNo = movies.page + 1;
    try {
      let res = await MoviesApi.searchMovie({ searchQry: searchQry, page: pageNo });
      setMovies(res);
    } catch {
      // (error) => console.log(error);
    }
  };

  const prevPage = async () => {
    let pageNo = movies.page - 1;
    try {
      let res = await MoviesApi.searchMovie({ searchQry: searchQry, page: pageNo });
      setMovies(res);
    } catch {
      // (error) => console.log(error);
    }
  };
  return !wentWrong ? (
    <div className="w-full max-w-full lg:max-w-[80%] mx-auto">
      {searchQry && (
        <div className="mt-3">
          <h1 className="text-sm sm:text-md md:text-lg font-medium text-gray-600 my-2">
            Showing result for <b>{searchQry === 'genre' ? searchParams.get("name") : searchQry}</b>
          </h1>
        </div>
      )}
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {movies?.total_results !== 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-8">
                {movies?.results?.map((i, index) => (
                  <Card key={index} movie={i} />
                ))}
              </div>
              <div className="flex justify-center py-3 mt-3 gap-4">
                <button
                  type="text"
                  className={`${movies?.page === 1
                    ? "text-gray-500 "
                    : " hover:bg-gray-300 "
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
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-full flex flex-col text-center bg-red-300 text-white rounded-sm max-w-[360px] py-3">
                <h1>Opps... No result found</h1>
                <h1>Try another keyword.</h1>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  ) : <>
    <BADREQUEST error={wentWrong} />
  </>
}
