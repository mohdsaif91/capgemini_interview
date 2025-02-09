import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "../assets/backbutton.png";
import DummyData from "../data/local_data";
import Button from "../atom/button";
import Table from "../components/table";
import Dropdown from "../atom/dropdown";
import { getRewardPoints } from "../util/utils";

const initailRedwardData = {
  rewardData: DummyData[0],
  showData: "All",
  customerName: DummyData[0].name,
};

function account() {
  const [reward, setReward] = useState({ ...initailRedwardData });
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (reward.rewardData.shopping_history.length > 0) {
      calculateTotalPoint();
    }
  }, [reward]);

  const calculateTotalPoint = () => {
    let totalPoint = 0;
    reward.rewardData.shopping_history.map((m) => {
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
    console.log(DummyData, " <>? before");

    const customerData = JSON.parse(JSON.stringify(DummyData)).find(
      (f) => f.name === reward.customerName
    );
    const date = new Date();
    switch (filterType) {
      case "lastMonth":
        date.setMonth(date.getMonth() - 1);
        const lastMonthCustomerData = customerData.shopping_history.filter(
          (sm) => {
            if (new Date(sm.purchase_date) >= date) {
              return sm;
            }
          }
        );
        customerData.shopping_history = lastMonthCustomerData;
        setReward({
          rewardData: customerData,
          showData: "Last Month",
          ...reward,
        });
        break;
      case "threeMonth":
        date.setMonth(date.getMonth() - 3);
        console.log(date, " <>? Date");
        const threeMonthCustomerData = customerData.shopping_history.filter(
          (f) => {
            if (date < new Date(f.purchase_date)) {
              return f;
            }
          }
        );
        customerData.shopping_history = threeMonthCustomerData;
        setReward({
          rewardData: customerData,
          showData: "Three Months",
          ...reward,
        });
        break;
      default:
        setReward({
          rewardData: customerData,
          showData: "All",
          ...reward,
        });
        break;
    }
  };
  return (
    <div>
      <div className="flex items-center p-2"></div>
      <div className="mt-5 rounded-2xl border-1 p-5">
        <div className="flex items-center">
          <img
            src={BackButton}
            className="h-[40px] w-[40px] cursor-pointer"
            alt="back button image"
            onClick={() => navigate("/")}
          />
          <div className="text-3xl ml-4 font-bold">Reward Points Tally</div>
        </div>
        <div className="mt-5">
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
              setReward({
                rewardData: selectedUserData,
                showData: reward.showData,
                customerName: user,
              });
            }}
            userOptions={DummyData.map((m) => {
              return m.name;
            })}
          />
        </div>
        <div className="flex items-center w-full justify-between p-4">
          <div className="flex items-center">
            <div className="">Showing Data- {reward.showData}</div>
            <div className=" ml-4">
              Count- {reward.rewardData.shopping_history.length}
            </div>
          </div>
          <div className="ml-4 flex items-center text-2xl">
            <div className="">
              Customer-
              <span className=" text-blue-500 font-bold">
                {" "}
                {reward.customerName}
              </span>
            </div>
            <span className="ml-4">
              Total Points-{" "}
              <span className=" text-blue-500 font-bold">{points}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4">
        {reward.rewardData.shopping_history.map((m, i) => (
          <Table data={m} key={i} getPriceCallback={(p) => totalPoints + p} />
        ))}
        {reward.rewardData.shopping_history.length === 0 && (
          <span className="font-bold text-2xl">
            No Data!, For selected Filter
          </span>
        )}
      </div>
    </div>
  );
}

export default account;
