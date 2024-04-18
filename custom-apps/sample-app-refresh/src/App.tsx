import { useEffect, useState } from "react";
import SampleTable from "./components/SampleTable";

const App = () => {

  const [refreshData, setRefreshData] = useState(false);

  return (
    <>
      <nav className="navbar navbar-fixed-top command-container">
          <div className="command-container-center-controls">
              <button
                  className="btn btn-primary"
                  onClick={() => {
                      setRefreshData(!refreshData);
                  }}
              >
                  <span>Refresh</span>
              </button>
          </div>
        </nav>

        <div className="app-contentarea">
          <SampleTable refresh={refreshData} />
        </div>
    </>
  );

};

export default App;
