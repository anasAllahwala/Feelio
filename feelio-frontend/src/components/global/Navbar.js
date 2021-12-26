import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, SearchBar } from ".";
import UsersApi from "../../api/Users";
import { useAuth } from "../../hooks";

const Navbar = ({ title, active }) => {
  const [visible, setVisibility] = useState(false);
  const [usersVisible, setUsersVisibility] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const ref = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {}, [usersVisible]);

  const handleClickEvent = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setUsersVisibility(false);
    }
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickEvent, true);

    return () => {
      document.removeEventListener("click", handleClickEvent, true);
    };
  }, []);

  let auth = useAuth();

  function searchBar() {
    return (
      <SearchBar
        search={search}
        setSearch={setSearch}
        visible={usersVisible}
        filter={filterUsers}
        ref={ref}
      >
        {users.length > 0 ? (
          users.map((user, key) => (
            <Link key={key} to={"profile/" + user.user_id}>
              <div className="flex items-center p-3 border w-full hover:bg-gray-100 cursor-pointer">
                <Avatar
                  className="mr-2"
                  name={user.name}
                  image_url={user.image_url}
                />
                <p className="font-semibold">{user.name}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-3 border w-full">No results found!</div>
        )}
      </SearchBar>
    );
  }

  function filterUsers() {
    UsersApi.fetchUsers({ name: search })
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          setUsers(Object.values(data.body));
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setUsersVisibility(true);
      });
  }

  return (
    <div>
      <div className="bg-blue-600 text-white ">
        <div className=" max-w-md lg:max-w-6xl m-auto py-5">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-2xl">Feelio</h1>
            {auth.user && searchBar()}
            {!(auth.user && !auth.isLoading) ? (
              <nav>
                <Link className="mr-2" to="/login">
                  Login
                </Link>
                <Link to="/register">Register</Link>
              </nav>
            ) : (
              <div className="flex items-center">
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setVisibility(!visible)}
                    className="flex items-center"
                  >
                    <span className="mr-2">{auth.user.name}</span>
                    <Avatar
                      name={auth.user.name}
                      image_url={auth.user.image_url}
                    />
                  </button>
                  <div
                    className={
                      "absolute w-72 bg-white mt-3 right-0 shadow-md overflow-hidden rounded-md transition-all duration-150 max-h-0 text-gray-600" +
                      (visible ? " max-h-36 border" : "")
                    }
                  >
                    <Link to="/profile">
                      <div className="flex items-center w-full p-3 border-b hover:bg-gray-50">
                        <Avatar
                          className="mr-2"
                          name={auth.user.name}
                          image_url={auth.user.image_url}
                        />
                        <dl className="flex-1">
                          <dt className="font-semibold">{auth.user.name}</dt>
                          <dd>{auth.user.email}</dd>
                        </dl>
                      </div>
                    </Link>

                    <button
                      className="w-full p-3 text-left hover:bg-gray-50"
                      onClick={auth.signOut}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="30"
                          fill="currentColor"
                          className="bi bi-box-arrow-right mr-3"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                          />
                        </svg>
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-md lg:max-w-6xl m-auto">
        <div className=" text-gray-600">
          {!auth.isLoading && auth.user ? (
            <div className="flex justify-center mx-auto">
              <Link to="/">
                <div
                  className={
                    "flex items-center font-semibold p-5" +
                    (active === "home" ? " text-blue-500" : "")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-house-door-fill mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                  </svg>
                  Home
                </div>
              </Link>
              <Link to="/friends">
                <div
                  className={
                    "flex items-center font-semibold p-5" +
                    (active === "friend-requests" ? " text-blue-500" : "")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-people-fill mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path
                      fillRule="evenodd"
                      d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                    />
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                  </svg>
                  Friend Requests
                </div>
              </Link>
              {auth.user.role_name === "admin" && (
                <Link to="/admin-panel">
                  <div
                    className={
                      "flex items-center font-semibold p-5" +
                      (active === "admin-panel" ? " text-green-500" : "")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-shield-lock-fill mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"
                      />
                    </svg>
                    Admin Panel
                  </div>
                </Link>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
