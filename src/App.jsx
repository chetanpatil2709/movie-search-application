import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ViewMovie from "./pages/ViewMovie";
import Search from "./pages/Search";

function App() {
  const AppLayout = () => {
    return (
      <>
        <Navbar />
        <div className="w-full mx-auto bg-white dark:bg-gray-800">
          <div className="py-6 px-2 flex justify-center">
            <Outlet />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index={true} element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/movie/:id" element={<ViewMovie />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
