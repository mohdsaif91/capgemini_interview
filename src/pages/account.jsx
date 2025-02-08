import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "../assets/backbutton.png";
import DummyData from "../data/local_data";
import Button from "../atom/button";
import Table from "../components/table";
import Dropdown from "../atom/dropdown";
import { getRewardPoints } from "../util/utils";

function account() {
  const [rewardData, setRewardData] = useState(DummyData[0] || []);
  const [showData, setShowData] = useState("All");
  const [customerName, setCustomerName] = useState(DummyData[0].name);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (rewardData.shopping_history.length > 0) {
      calculateTotalPoint();
    }
  }, [rewardData]);

  const calculateTotalPoint = () => {
    let totalPoint = 0;
    rewardData.shopping_history.map((m) => {
      m.products.map((pm) => {
        totalPoint = totalPoint + getRewardPoints(pm.price_in_dollars);
      });
    });
    console.log(totalPoint, " <>?");
    setPoints(totalPoint);
  };

  let totalPoints = 0;

  const navigate = useNavigate();

  const filterDataByDate = (filterType) => {
    console.log(filterType);

    const customerData = DummyData.filter((f) => f.name === customerName);
    const date = new Date();
    switch (filterType) {
      case "lastMonth":
        calculateTotalPoint();
        setShowData("Last Month");
        const lastMonth = date.getMonth() - 1;
        const lastMonthCustomerData = customerData[0].shopping_history.filter(
          (sm) => {
            if (new Date(sm.purchase_date).getMonth() - 1 === lastMonth) {
              return sm;
            }
          }
        );
        customerData[0].shopping_history = lastMonthCustomerData;
        setRewardData(...customerData);
        break;
      case "threeMonth":
        date.setMonth(date.getMonth() - 3);
        calculateTotalPoint();
        const threeMonthCustomerData = customerData[0].shopping_history.filter(
          (f) => {
            if (date < new Date(f.purchase_date)) {
              return f;
            }
          }
        );
        customerData[0].shopping_history = threeMonthCustomerData;
        setShowData("Three Months");
        console.log(customerData);

        // setRewardData(...customerData);
        break;
      default:
        setShowData("All");
        calculateTotalPoint();
        // setRewardData(...customerData);
        break;
    }
  };

  return (
    <div>
      <div className="flex items-center p-2">
        <div className="">
          <img
            src={BackButton}
            className="h-[40px] w-[40px] cursor-pointer"
            alt="back button image"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
      <div className="mt-5 rounded-2xl border-1 pl-10">
        <div className="text-2xl flex ">Reward Points Tally</div>
        <div className="mt-5 mb-5 border-b">
          <Button
            text="Last Month"
            callback={() => filterDataByDate("lastMonth")}
          />
          <Button
            text="3 Months"
            callback={() => filterDataByDate("threeMonth")}
          />
          <Button text="All" callback={() => filterDataByDate("all")} />
          <Dropdown
            callback={(user) => {
              const selectedUserData = DummyData.find((m) => m.name === user);
              setRewardData(selectedUserData);
              setCustomerName(user);
            }}
            userOptions={DummyData.map((m) => {
              return m.name;
            })}
          />
        </div>
        <div className=" mt-4 text-3xl flex items-center">
          <div className="">Showing- {showData} Data</div>
          <div className="ml-4">Customer- {customerName}</div>
          <div className="ml-4">
            Total Points-{" "}
            <span className="text-blue-500 font-bold">{points}</span>
          </div>
        </div>
        <div className="mt-4 p-4">
          {rewardData.shopping_history.map((m, i) => (
            <Table data={m} key={i} getPriceCallback={(p) => totalPoints + p} />
          ))}
          {rewardData.shopping_history.length === 0 && (
            <span className="font-bold text-2xl">
              No Data!, For selected Filter
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default account;
