import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchcustomers } from "../API/ApiCalling";
import { Link } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import Footer from "./Footer";
import "./Home.css";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { MdOutlineMoving, MdCloudDone } from "react-icons/md";
import FollowUpSidebar from "./Followup";

function Home() {
  const [data, setData] = useState([]);
  const [execuId, setExecuId] = useState("");
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [ongoingCustomers, setOngoingCustomers] = useState(0);
  const [interested, setInterested] = useState(0);
  const [joinedCustomers, setJoinedCustomers] = useState(0);
  const [notJoiningCustomers, setNotJoiningCustomers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [followups, setFollowups] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [check, setCheck] = useState(false)
  const [loading, setLoading] = useState(true);

  const logininfom = useSelector((state) => state.userlogin?.LoginInfo[0]);

  useEffect(() => {
    if (logininfom) {

      setExecuId(logininfom.id);


    }
  }, [logininfom]);

  useEffect(() => {
    if (execuId) {
      async function apicallAllCustomers() {
        setLoading(true);
        try {
          const response = await fetchcustomers(execuId);
          const customers = response.data;
          console.log(response.data);

          setData(customers);
          setTotalCustomers(customers.length);

          setInterested(customers.filter((c) => c.status === "interested").length);
          setOngoingCustomers(customers.filter((c) => c.status === "ongoing").length);
          setJoinedCustomers(customers.filter((c) => c.status === "joined_course").length);
          setNotJoiningCustomers(customers.filter((c) => c.status === "dont_want_to_join").length);

          const followupData = customers
            .filter((customer) => customer.followupcontent)
            .map((customer) => ({
              id: customer._id,
              name: customer.fullname,
              phone: customer.phone,
              content: customer.followupcontent,
              followDate: new Date(customer.followdate).toLocaleDateString("en-GB", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),

              followupassigndate: customer.followupassigndate
                ? new Date(customer.followupassigndate).toLocaleDateString("en-GB", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
                : "Not Assigned",
            }));

          setFollowups(followupData);

        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
        finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
      apicallAllCustomers();
    }
  }, [execuId]);

  useEffect(() => {
    const filtered = data.filter((customer) => {

      const matchesFilter =
        filter === "all" ||
        (filter === "interested" && customer.status === "interested") ||
        (filter === "ongoing" && customer.status === "ongoing") ||
        (filter === "joined" && customer.status === "joined_course") ||
        (filter === "not_joining" && customer.status === "dont_want_to_join") ||
        (filter === "recentlyAdded" &&
          new Date(customer.date) >= new Date().setDate(new Date().getDate() - 1)) ||
        (filter === "recentlyDailyUpdate" &&
          customer.dailyUpdate &&
          customer.dailyUpdate.some(
            (update) =>
              new Date(update.date) >=
              new Date().setDate(new Date().getDate() - 7)
          ));


      const matchesSearch =
        customer.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.phone && customer.phone.toString().includes(searchTerm));

      return matchesFilter && matchesSearch;
    });

    let sortedData = [...filtered];


    if (filter === "recentlyDailyUpdate") {
      sortedData.sort((a, b) => {
        const latestUpdateA = a.dailyUpdate?.filter(
          (update) =>
            new Date(update.date) >=
            new Date().setDate(new Date().getDate() - 7)
        ).sort((x, y) => new Date(y.date) - new Date(x.date))[0]?.date;

        const latestUpdateB = b.dailyUpdate
          ?.filter(
            (update) =>
              new Date(update.date) >=
              new Date().setDate(new Date().getDate() - 7)
          )
          .sort((x, y) => new Date(y.date) - new Date(x.date))[0]?.date;

        return new Date(latestUpdateB) - new Date(latestUpdateA);
      });
    }


    setFilteredData(sortedData);
  }, [data, filter, searchTerm]);

  const handleRecentlyAdded = () => {
    setFilter("recentlyAdded");
  };

  const handleRecentlyDailyUpdate = () => {
    setFilter("recentlyDailyUpdate");
    setCheck(true)
  };

  console.log("datas>>>>>>>>>>>.", filteredData);


  return (
    <div>
      <UserNavbar />
      <FollowUpSidebar followups={followups} />

      <div className="home_container">
        <div className="main_content">
          {loading ? (
            <div className="loading_container">
              <p className="loading_text">Loading data, please wait...</p>
            </div>
          ) : (
            <div className="topSectionMain_div_userHomepage">
              <div className="topsection_inner_div_userHompage">
                <div className="topsection_card_userhomepage" onClick={() => { setFilter("all"), setCheck(false) }}>
                  <MdPlaylistAddCheckCircle />
                  <h3>Total Customers</h3>
                  <p>{totalCustomers}</p>
                </div>
                <div className="topsection_card_userhomepage" onClick={() => { setFilter("interested"), setCheck(false) }}>
                  <AiFillLike />
                  <h3>Interested Customers</h3>
                  <p>{interested}</p>
                </div>
                <div className="topsection_card_userhomepage" onClick={() => { setFilter("ongoing"), setCheck(false) }}>
                  <MdOutlineMoving />
                  <h3>Ongoing Customers</h3>
                  <p>{ongoingCustomers}</p>
                </div>
                <div className="topsection_card_userhomepage" onClick={() => { setFilter("joined"), setCheck(false) }}>
                  <MdCloudDone />
                  <h3>Joined Customers</h3>
                  <p>{joinedCustomers}</p>
                </div>
                <div className="topsection_card_userhomepage" onClick={() => { setFilter("not_joining"), setCheck(false) }}>
                  <AiFillDislike />
                  <h3>Not Joining</h3>
                  <p>{notJoiningCustomers}</p>
                </div>
              </div>
            </div>
          )}
          <div className="middle_data_section_userHomepage">
            <div className="middle_inner_div_userHomepage">
              <input
                type="text"
                placeholder="Search by name or phone"
                className="searchbar_userhomepage"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="customer_actions_button_userhomepage"
                style={{ marginBottom: "10px", marginRight: '10px' }}
                onClick={handleRecentlyAdded}
              >
                Recently Added
              </button>
              <button
                className="customer_actions_button_userhomepage"
                style={{ marginBottom: "10px" }}
                onClick={handleRecentlyDailyUpdate}
              >
                Recently Update
              </button>
              <table className="customer_table_userhomepage">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Course</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((customer, index) => {
                    const latestUpdateDate = customer.dailyUpdate
                      ?.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date;

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{customer.fullname}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.course}</td>
                        <td>{customer.method}</td>
                        <td>{customer.status}</td>
                        <td>
                          {check === true
                            ? new Date(latestUpdateDate).toLocaleDateString("en-GB")  // Display latest update if 'check' is true
                            : new Date(customer.date).toLocaleDateString("en-GB")}
                        </td>
                        <td>
                          <Link to={`/DailyCustomerUpdate/${customer._id}`}>
                            <button className="customer_actions_button_userhomepage">
                              Daily Update
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;