/* eslint-disable react/prop-types */

export default function BADREQUEST({ error }) {
    console.log(error)
    return (
        <div className="w-full bg-red-300 border border-red-400 p-3 text-red-700 rounded-md items-center">
            <h1 className="">{error?.code}</h1>
            <p>{error?.msg}</p>
            {/* <p>{error?.stack}</p> */}

            <button className="bg-red-700 rounded-sm px-3 py-1 text-white mt-3" onClick={() => window.location.reload()}>Try again</button>
        </div>
    )
}
