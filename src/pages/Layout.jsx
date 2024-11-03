import Header from "../components/Header";
import {Outlet} from "react-router-dom";
import Home from "./Home";

export default function Layout() {
  return (
    
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
      {/* <Header /> */}
      <Home/>
      <Outlet />
    </div>
  );
}
