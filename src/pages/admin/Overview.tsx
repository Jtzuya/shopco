import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import LinePlot from "../../components/admin/Graph";

import * as d3 from "d3";
import { useState, MouseEvent } from "react";
import Notification from "../../components/Notification";

export default function Overview() {
  const [graph1, setGraph1] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));
  const [graph2, setGraph2] = useState(() => d3.ticks(-1, 2, 200).map(Math.sin));
  const [graph3, setGraph3] = useState(() => d3.ticks(-3, 2, 200).map(Math.sin));

  function onMouseMove(event: MouseEvent) {
    const [x, y]: [number, number] = d3.pointer(event);
    setGraph1(graph1.slice(-50).concat(Math.atan2(x, y)));
    setGraph2(graph2.slice(-250).concat(Math.atan2(x, y)));
    setGraph3(graph3.slice(-1000).concat(Math.atan2(x, y)));
  }  

  return (
    <div className="admin" onMouseMove={onMouseMove}>
      <div className="admin__wrapper">
        <Sidebar currentPage="admin" />
        <main className="overview">
          <Nav name='Dashboard Overview' />
          
          <div className="overview__daily-statistics">
            <div className="overview__card">
              <div className="overview__card-group">
                <p className="overview__card-title">Today's Revenue</p>
                <p className="overview__card-revenue">$15,000,000</p>
                <div className="overview__card-more">
                  <span className="overview__card-tag overview__card-tag--up">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.72724 6.54099L12.1256 6.54098L12.1256 10.9394" stroke="currentColor" strokeWidth="1.02476" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.96636 12.7002L12.064 6.60258" stroke="currentColor" strokeWidth="1.02476" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="overview__card-percent">4.8%</span>
                  </span>
                  
                  <span className="overview__card-timedate">from yesterday</span>
                </div>
              </div>

              <div className="overview__card-graph">
                <LinePlot data={graph1} />
              </div>
            </div>
            <div className="overview__card">
              <div className="overview__card-group">
                <p className="overview__card-title">Today's Orders</p>
                <p className="overview__card-revenue">7,506</p>
                <div className="overview__card-more">
                  <span className="overview__card-tag overview__card-tag--down">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.72724 6.54099L12.1256 6.54098L12.1256 10.9394" stroke="currentColor" strokeWidth="1.02476" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.96636 12.7002L12.064 6.60258" stroke="currentColor" strokeWidth="1.02476" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="overview__card-percent">3.5%</span>
                  </span>
                  
                  <span className="overview__card-timedate">from yesterday</span>
                </div>
              </div>

              <div className="overview__card-graph">
                <LinePlot data={graph2} />
              </div>
            </div>
            <div className="overview__card">
              <div className="overview__card-group">
                <p className="overview__card-title">Today's Visitors</p>
                <p className="overview__card-revenue">17,058</p>
                <div className="overview__card-more">
                  <span className="overview__card-tag overview__card-tag--up">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.72724 6.54099L12.1256 6.54098L12.1256 10.9394" stroke="currentColor" strokeWidth="1.02476" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.96636 12.7002L12.064 6.60258" stroke="currentColor" strokeWidth="1.02476" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="overview__card-percent">9.3%</span>
                  </span>
                  
                  <span className="overview__card-timedate">from yesterday</span>
                </div>
              </div>

              <div className="overview__card-graph">
                <LinePlot data={graph3} />
              </div>
            </div>
          </div>  

          <Notification message="Current Data in this page is static" />
        </main>
      </div>
    </div>
  )
}