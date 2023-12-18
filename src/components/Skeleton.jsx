
export default function Skeleton() {
    const Skel = () => {
        return (
            <>
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="w-full">
                        <div className="h-[300px] bg-gray-200 rounded dark:bg-gray-700 w-[80%] mb-4"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[150px] mb-2.5"></div>
                    <div className="h-2 max-w-[180px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                <Skel />
                <Skel />
                <Skel />
                <Skel />
                <Skel />
                <Skel />
                <Skel />
                <Skel />
                <Skel />
                <Skel />
            </div>
        </>
    )
}
