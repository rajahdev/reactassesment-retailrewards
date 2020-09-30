import React from "react";
// import logo from './logo.svg';
import "./App.css";
import customerData from "./data.json";

const FC = () => {
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
        tmpSpent = 0,
        tmpRewards = 0,
        totalRewards = 0;

      sortedRewards.map((reward: any) => {
        if (reward.customer !== tmpCust) {
          output +=
            tmpCust !== ""
              ? "   [TOTAL REWARDS FOR CUSTOMER]:  " +
                tmpCust +
                "   [TOTAL REWARDS]:  " +
                totalRewards +
                ";"
              : "";

          tmpCust = reward.customer;
          tmpMonth = "";
          tmpRewards = 0;
          tmpSpent = 0;
          totalRewards = 0;
        }

        tmpMonth = reward.month;
        tmpSpent = reward.moneyspent;
        tmpRewards = calculatePoints(tmpSpent);
        totalRewards += tmpRewards;
        output +=
          "  [CUSTOMER NAME]:   " +
          tmpCust +
          "  [MONTH]:   " +
          tmpMonth +
          "  [AMOUNT]:  " +
          tmpSpent +
          "  [FOUND REWARDS]:  " +
          tmpRewards +
          "          ";
      });

      output +=
        tmpCust !== ""
          ? "    [TOTAL REWARDS FOR CUSTOMER NAME]:  " +
            tmpCust +
            "    [TOTAL REWARDS]: " +
            totalRewards +
            ";"
          : "";
    }
    return output;
  }
  
  let output;
  const [dataset, setDataset] = React.useState({});

  React.useEffect(() => {
    setDataset(customerData);

    return () => {};
  }, [dataset]);

  if (dataset !== undefined) {
    output = buildOutput(dataset);
  } else {
    output = "Loading...";
  }

  return <div>{output}</div>;
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

export default FC;
