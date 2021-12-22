import moment from "moment";
import React, { useEffect, useState } from "react";
import { AdminApi } from "../../api";
import { useApi } from "../../hooks";

const AdminUsers = ({ title }) => {
  const [lastPage, setLastPage] = useState(null);

  useEffect(() => {
    title("All Users");
  }, [title]);

  const {
    result: users,
    loading,
    refresh,
  } = useApi(AdminApi.fetchUsers, lastPage);

  function openPage(num) {
    setLastPage(num);
  }

  function pagination() {
    return (
      <div className="flex mt-5 justify-center">
        {Array.from(Array(users.pages).keys()).map((page, key) => (
          <div
            onClick={() => openPage(key + 1)}
            key={key}
            className=" w-10 h-10 border flex items-center justify-center"
          >
            {key + 1}
          </div>
        ))}
      </div>
    );
  }
  function table() {
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Signed Up Date
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!loading &&
                    Object.values(users.data).map((user, key) => (
                      <tr key={key}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {user.role_name[0].toUpperCase() +
                              user.role_name.substr(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {moment(user.signup_date).format(
                              "DD-MM-YYYY h:mm a"
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => deleteUser(user)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function deleteUser({ user_id }) {
    AdminApi.deleteUser({ user: user_id })
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          refresh();
        }
      })
      .catch((e) => console.error(e));
  }

  return (
    <div>
      {table()}
      {!loading && pagination()}
    </div>
  );
};

export default AdminUsers;
