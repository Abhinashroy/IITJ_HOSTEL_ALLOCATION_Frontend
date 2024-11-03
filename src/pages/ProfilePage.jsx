import {useContext, useState} from "react";
import {UserContext} from "../UserContext";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
// import PlacesPage from "./PlacesPage";
// import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [redirect,setRedirect] = useState(null);
  const {ready,user, setUser} = useContext(UserContext);
  // let {subpage} = useParams();
  // if (subpage === undefined) {
  //   subpage = 'profile';
  // }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      {/* account page for {user?.name} */}
      {/* <AccountNav /> */}
      
      <div className="text-center max-w-lg mx-auto pt-28 ">
        <div className=" inline-flex justify-center primary text-xl bg-[#718fce] rounded-full pl-4 pr-4 mb-6 py-1 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
          <span className="pl-2">My Profile</span> 
        </div>
        <div className="text-xl">Logged in as <div className="font-bold">{user.name} ({user.email})</div><br /></div>
        <button onClick={logout} className="primary max-w-sm mt-1">Logout</button>
      </div>
       
      {/* {subpage === 'places' && (
        <PlacesPage />
      )} */}
    </div>
  );
}