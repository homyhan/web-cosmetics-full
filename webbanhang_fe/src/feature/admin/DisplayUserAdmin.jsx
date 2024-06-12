import React, { useCallback, useEffect, useState } from "react";
import LayoutAdmin from "../../HOCs/LayoutAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import _ from "lodash";
import { fetUsers, fetchUsersByName } from "./thunk";
import { Pagination } from "antd";

const DisplayUserAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const users = useSelector((state) => state.admin.users);

  useEffect(() => {
    const page = searchParam.get("page")
      ? parseInt(searchParam.get("page"), 10)
      : 1;
    dispatch(fetUsers(page - 1, 8));
  }, [dispatch, searchParam]);

  const debouncedSearch = useCallback(
    _.debounce((term) => {
      dispatch(fetchUsersByName(term, 0, 8));
    }, 500),
    [dispatch]
  );

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <LayoutAdmin>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="search by name"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button
          onClick={() => {
            navigate("/admin/add-user");
          }}
        >
          Add New User
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Adress</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {users?.content?.map((item, key) => {
            return (
              <tr key={item?.id}>
                <td>{key + 1}</td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.role ? item.role.nameRole : "N/A"}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    onClick={() => {
                      navigate("/admin/edit-info-user/" + item?.id);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/admin/edit-status/" + item?.id);
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="text-center my-4"
        current={
          searchParam.get("page") ? parseInt(searchParam.get("page"), 10) : 1
        }
        pageSize={8}
        total={users?.totalElements}
        onChange={(page) => {
          setSearchParam({ page: page.toString() });
        }}
      />
    </LayoutAdmin>
  );
};

export default DisplayUserAdmin;
