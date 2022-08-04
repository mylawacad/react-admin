import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { faCashRegister, faChartLine } from "@fortawesome/free-solid-svg-icons";

import {
  CounterWidget,
  CircleChartWidget,
  SalesValueWidgetPhone,
} from "../../components/Widgets";
import { trafficShares } from "../../data/charts";

import CheckPermissions from "../../components/multitools/CheckPermissions";

const Component = () => {
  // this component requirements
  const [componentId] = useState(`DashboardPage_${Date.now()}`);
  const requirements = {
    componentId,
    auth: true,
    endpoints: [{ method: "GET", path: "/user" }],
  };
  return (
    <CheckPermissions requirements={requirements}>
      <main>
        <section className="mt-5 mb-5">
          <Row className="justify-content-md-center">
            <Col xs={12} className="mb-4 d-sm-none">
              <SalesValueWidgetPhone
                title="Sales Value"
                value="10,567"
                percentage={10.57}
              />
            </Col>
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Cases"
                title="345k"
                period="Feb 1 - Apr 1"
                percentage={18.2}
                icon={faChartLine}
                iconColor="shape-secondary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Revenue"
                title="$43,594"
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faCashRegister}
                iconColor="shape-tertiary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CircleChartWidget title="Market Share" data={trafficShares} />
            </Col>
          </Row>
        </section>
      </main>
    </CheckPermissions>
  );
};

export default Component;
