import React, { useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import DataTable from "../components/DataTable";
import axios from "axios";
function HomeScreen() {
  const [total, setTotal] = useState(0);
  const [review, setReview] = useState(0);
  const [pending, setPending] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(
        "http://localhost:5000/api/v1/user/customer-count"
      );
      if (res && res.status == 200) {
        setTotal(res.data.total);
        setReview(res.data.review);
        setPending(res.data.pending);
        console.log("rss------", res ? res.data : "no res");
      } else {
        console.log("NO RESS");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <h5>Total Customers</h5>
            <div className="card-data">
              <i className="fa fa-users"></i>
              <h2 className="mt-1 m-2">{total}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <h5>In Review</h5>
            <div className="card-data">
              <i className="fa fa-comments"></i>
              <h2 className="mt-1 m-2">{review}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <h5>Pending</h5>
            <div className="card-data">
              <i className="fa fa-tasks"></i>
              <h2 className="mt-1 m-2">{pending}</h2>
            </div>
          </div>
        </div>
      </div>
      <DataTable />
    </div>
  );
}

export default HomeScreen;
