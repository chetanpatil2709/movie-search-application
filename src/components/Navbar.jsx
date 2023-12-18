import { useEffect, useRef, useState } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { FaMagnifyingGlass, FaBars } from "react-icons/fa6";
import SearchBarComponent from "./SearchBarComponent";
import MoviesApi from "../services/movies";
export default function Navbar() {
  const [gen, setGen] = useState()
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const menu = useRef();
  const searchBar = useRef();
  const navigate = useNavigate()
  const handleToggleMenu = () => {
    if (toggleMenu) {
      setToggleMenu(false);
    } else {
      setToggleMenu(true);
    }
  };
  const handleClickOutside = (e) => {
    if (!menu?.current?.contains(e.target) && toggleMenu) {
      setToggleMenu(false);
    }
    if (window.innerWidth < 1024) {
      if (!searchBar?.current?.contains(e.target) && searchBarOpen) {
        setSearchBarOpen(false);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  useEffect(() => {
    if (window.innerWidth < 600) {
      setSearchBarOpen(false);
    } else {
      setSearchBarOpen(true);
    }
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const response = await MoviesApi.getGenres()
        if (response.status === 200) {
          setGen(response.data);
        }
      } catch (error) {
        // console.log(error)
      }
    })();
  }, [])

  const searchGen = (id, name) => {
    navigate({
      pathname: "/search",
      search: createSearchParams({
        qry: 'genre',
        id: id,
        name: name
      }).toString(),
    });
  }
  useEffect(() => {

  }, [])

  return (
    <>
      <div
        className={
          "w-full py-2.5 border-b border-transparent sticky top-0 z-50 bg-primary px-3 " +
          (toggleMenu ? "border-white/20" : "shadow")
        }
      >
        <div className="max-w-full w-full px-1 sm:px-4 md:px-8 lg:max-w-[80%] mx-auto">
          <div className="grid grid-cols-2 justify-between w-full">
            <div >
              <div className="flex items-center space-x-4">
                <div className="cursor-pointer" >
                  <FaBars size={30} className="text-white" onClick={() => handleToggleMenu('toggle')} />
                </div>
                <Link
                  to="/"
                  className="text-3xl lg:text-3xl text-pink-600 font-bold cursor-pointer text-center "
                >
                  <img
                    src="https://files.readme.io/29c6fee-blue_short.svg"
                    height={24}
                    width={185}
                    alt=""
                  />
                </Link>
              </div>
            </div>

            <div >
              <div className="w-full flex items-center flex-1 justify-end" ref={searchBar}>
                <div className="md:hidden" >
                  <button
                    className="px-3 py-2 text-white"
                    onClick={() => setSearchBarOpen(!searchBarOpen)}
                  >
                    <FaMagnifyingGlass />
                  </button>
                </div>
                <div
                  className="w-full flex items-center absolute top-[52.8px] md:-top-1 inset-x-0 md:relative md:max-w-sm"
                  style={{ display: searchBarOpen ? "flex" : "none" }}
                >
                  <SearchBarComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-primary transition-all sticky`}
        style={{
          top: toggleMenu ? "50.8px" : "-100%",
          opacity: !toggleMenu ? 0 : "",
          height: !toggleMenu ? 0 : "",
          overflow: !toggleMenu ? "hidden" : "",
        }}
        ref={menu}>
        <div className="lg:max-w-[90%] mx-auto">
          <div className="flex flex-row space-x-3 w-full flex-wrap py-1">
            {gen?.genres.map((i, index) => (
              <a onClick={() => searchGen(i.id, i.name)}
                key={index}
                className="h-8 px-2 py-2 leading-3 font-medium capitalize text-sm rounded border border-transparent cursor-pointer hover:border-header-button-hover active:header-button-active focus:header-button-active text-white"
              >
                {i.name?.toLocaleLowerCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
