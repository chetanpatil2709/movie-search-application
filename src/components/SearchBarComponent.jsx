import { useRef, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function Search() {
    const [text, setText] = useState("");
    const [err, setErr] = useState(null);
    const searchBar = useRef();
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault()
        if (text === '') {
            setErr("Type something here...");
            setTimeout(() => {
                setErr(null);
            }, 2000);
        }
        else if (text !== "") {
            navigate({
                pathname: "/search",
                search: createSearchParams({
                    qry: text,
                }).toString(),
            });
            setText(null);
        }
    };
    return (
        <>
            <form action="#" method="GET">
                <div className="w-full flex items-center absolute" ref={searchBar}>
                    <input
                        type="search"
                        value={text ? text : ""}
                        className={`border w-full bg-white text-black border-gray-300 outline-none  px-2 py-2 shadow-lg font-semibold rounded-l-sm  
                        ${err ? ' border-2 border-red-700 ' : ''}`}
                        placeholder="Search..."
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="border border-gray-300 px-3 py-2 hover:underline bg-white hover:bg-gray-100 rounded-r-sm border-l-0 text-gray-600 font-medium"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </form>
        </>
    )
}
