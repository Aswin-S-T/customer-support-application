import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  IconButton,
  TablePagination,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import axios from "axios";
import { BACKEND_URL } from "../Api";
import Swal from "sweetalert2";
// const data = [
//   { id: 1, name: "John Doe", age: 25 },
//   { id: 2, name: "Jane Smith", age: 30 },
//   { id: 3, name: "Bob Johnson", age: 22 },
//   // Add more data as needed
// ];

const TableWithSearchAndPagination = () => {
  const [username, setUsername] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("pending");
  const [data, setData] = useState([]);

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [totalCutomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(
        "http://localhost:5000/api/v1/user/get-customer"
      );
      if (res && res.status == 200) {
        setCustomers(res.data);
        setData(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset page to 0 when performing a new search
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData =
    data &&
    data.length > 0 &&
    data.filter((item) =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const paginatedData =
    filteredData &&
    filteredData.length > 0 &&
    filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const addCustomer = async (e) => {
    // e.preventDefault();
    let customerData = {
      username,
      summary,
      status,
    };
    let res = await axios
      .post(`http://localhost:5000/api/v1/user/add-customer`, customerData)
      .then((response) => {
        if (response && response.status == 200) {
          Swal.fire({
            title: "Success!",
            text: "Customer Added",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {});
        }
      });
  };

  const editCustomer = async (id, value) => {
    let res = await axios
      .post(`http://localhost:5000/api/v1/user/edit-customer`, {
        id,
        status: value,
      })
      .then((response) => {
        if (response && response.status == 200) {
          Swal.fire({
            title: "Success!",
            text: "Customer Upaated",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {});
        }
      });
  };

  const deleteCustomer = async () => {};

  return (
    <div className="container-fluid mt-5" style={{ backgroundColor: "white" }}>
      <h5>All Customers</h5>
      <div className="mt-2">
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          placeholder="Search by name"
          style={{ marginBottom: 16 }}
        />

        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Create Task
        </button>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Create Task
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div>
                  <form>
                    <p>Customer Name</p>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter assignee name"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <p>Summary</p>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Summary...."
                      onChange={(e) => setSummary(e.target.value)}
                    />
                    <p>Status</p>
                    <select
                      className="form-control"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="development">In development</option>
                      <option value="pending">Pending</option>
                      <option value="review">Review</option>
                      <option value="deploy">Ready to Deploy</option>
                      <option value="backlog">Backlog</option>
                    </select>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={(e) => addCustomer()}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <p>Loading....</p>
        ) : error ? (
          <div className="errorBox">
            <p>Something went wrong</p>
          </div>
        ) : (
          customers &&
          customers.length > 0 && (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Select</TableCell>
                      <TableCell>Key</TableCell>
                      <TableCell>Summary</TableCell>
                      <TableCell>Assignee</TableCell>
                      <TableCell>Current Status</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox color="primary" />
                        </TableCell>
                        <TableCell>{item._id}</TableCell>
                        <TableCell>{item.summary}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>
                          <span
                            style={{
                              backgroundColor:
                                item.status === "pending"
                                  ? "#ffd1d1"
                                  : "#a6f8a6",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <select
                            className="form-control"
                            onChange={(e) => {
                              editCustomer(item._id, e.target.value);
                            }}
                          >
                            <option value="development">In development</option>
                            <option value="pending">Pending</option>
                            <option value="review">Review</option>
                            <option value="deploy">Ready to Deploy</option>
                            <option value="backlog">Backlog</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={filteredData.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default TableWithSearchAndPagination;
