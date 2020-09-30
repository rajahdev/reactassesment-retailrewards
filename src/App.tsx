import React from "react";
// import logo from './logo.svg';
import "./App.css";
import customerData from "./data.json";
import { CustomerRewardsBody } from "./styles";

const CustomerRewardsComponent = () => {
  function sortBy(rewards: any, property: any) {
    if (rewards !== undefined) {
      return rewards.sort(function (a: any, b: any) {
        return a[property] - b[property];
      });
    } else {
      return null;
    }
  }

  function calculatePoints(price: any) {
    let points = 0;
    let overOneHundredPoints = 0;
    let overFiftyPoints = 0;
    if (!isNaN(price)) {
      if (price > 100) {
        overOneHundredPoints = 2 * (price - 100);
      }
      if (price > 50) {
        const newPrice = price > 100 ? 100 : price;
        overFiftyPoints = 1 * (newPrice - 50);
      }
      points = overOneHundredPoints + overFiftyPoints;
    }
    return points;
  }

  const printMonthlyRewards = (
    customerName: any,
    month: any,
    monthlyRewards: any
  ) => {
    return (
      "[MONTHLY REWARD CALCULATIONS FOR CUSTOMER]:   " +
      customerName +
      " [FOR MONTH]:  " +
      month +
      "  [MONTHLY REWARD TOTAL]:  " +
      monthlyRewards +
      " , "
    );
  };

  const printTotalCustomerRewards = (
    customerName: any,
    monthlyRewards: any
  ) => {
    return (
      "[TOTAL REWARDS FOR CUSTOMER]:  " +
      customerName +
      "   [TOTAL REWARDS]:  " +
      monthlyRewards +
      " ; "
    );
  };

  function buildOutput(customerData: any) {
    let output = "";

    if (
      customerData !== undefined &&
      customerData.rewards !== undefined &&
      customerData.rewards[0].data !== undefined
    ) {
      const rewards = customerData.rewards[0].data;
      //sort data by customer and then month
      const sortedRewards = sortBy(sortBy(rewards, "customer"), "month");

      let tmpCust = "",
        tmpMonth = "",
        //tmpSpent = 0,
        tmpRewards = 0,
        totalRewardsPerCustomer = 0,
        totalRewardsPerMonth = 0;

      sortedRewards.map((reward: any) => {
        if (reward.customer !== tmpCust) {
          output +=
            tmpCust !== ""
              ? printMonthlyRewards(tmpCust, tmpMonth, totalRewardsPerMonth) +
                printTotalCustomerRewards(tmpCust, totalRewardsPerCustomer)
              : "";

          tmpCust = reward.customer;
          tmpMonth = "";
          tmpRewards = 0;
          // tmpSpent = 0;
          totalRewardsPerMonth = 0;
          totalRewardsPerCustomer = 0;
        } else if (reward.customer === tmpCust && tmpMonth !== reward.month) {
          //print month report
          output += printMonthlyRewards(
            tmpCust,
            tmpMonth,
            totalRewardsPerMonth
          );
          totalRewardsPerMonth = 0;
        }

        tmpMonth = reward.month;
        // tmpSpent = reward.moneyspent;
        tmpRewards = calculatePoints(reward.moneyspent);
        totalRewardsPerMonth += tmpRewards;
        totalRewardsPerCustomer += tmpRewards;
      });

      output +=
        tmpCust !== ""
          ? printMonthlyRewards(tmpCust, tmpMonth, totalRewardsPerMonth) +
            printTotalCustomerRewards(tmpCust, totalRewardsPerCustomer)
          : "";
    }
    return output;
  }

  const [dataset, setDataset] = React.useState({});

  React.useEffect(() => {
    setDataset(customerData);

    return () => {};
  }, [dataset]);

  return (
    <CustomerRewardsBody>
      <div className="customer__output">
        {dataset ? <>{buildOutput(dataset)}</> : "Loading..."}
      </div>
    </CustomerRewardsBody>
  );
};

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default CustomerRewardsComponent;
