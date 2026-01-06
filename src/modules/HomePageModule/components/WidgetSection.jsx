/* eslint-disable no-inner-declarations */
// *******~ Import ~******** //
//? React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "@/request/API/globalrequest";
import { API_TEST_URL } from "@/config/serverApiConfig";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//? Components
import { ArcBarChart } from "@/components/arccomponents/widget/pieChartWidget";
import GridWidget from "@/components/arccomponents/widget/GridWidget";
import ArcProgressBar from "@/components/arccomponents/widget/ProgressWidget";
import { fetchPlanSummeryKPI } from "@/redux/Home/PlanSummery/PlanSummeryKPI";
import { getMasterDataSuccess, changeEntityid } from "@/redux/Home/actions";
import { entityidInfo, masterDataInfo } from "@/redux/Home/selector";
import { login } from "@/auth";
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const WidgetSection = () => {
  const dispatch = useDispatch();
  const entityid = useSelector(entityidInfo);
  const masterData = useSelector(masterDataInfo);
  console.log(entityid);
  console.log(masterData);

  const PlanSummeryKPIState = useSelector(
    (state) => state.PlanSummeryKPIState.response
  );
  const AddFollowupStateStatus = useSelector(
    (state) => state.AddFollowupState.Status
  );
  useEffect(() => {
    dispatch(fetchPlanSummeryKPI());
    dispatch(changeEntityid("F48EF545-9995-4F8F-857D-DDDA2BC063CC"));
  }, [dispatch, AddFollowupStateStatus]);

  useEffect(() => {
    if (entityid !== "") {
      async function getlookupdetails() {
        const postData = {
          entityId: entityid,
        };
        const response = await request.post(
          API_TEST_URL,
          "arcconfiguration/getlookupdatabyid",
          postData
        );
        dispatch(getMasterDataSuccess(response));
      }
      getlookupdetails();
    }
  }, [entityid]);

  return (
    <React.Fragment>
      <section className="home-page-widget">
        <Container fluid>
          <Row>
            <Col xxl={12} xl={12} md={12} lg={12}>
              {/* <pre>{JSON.stringify(PlanSummeryKPIState, null, 2)}</pre> */}
              <div className="home-page-widget-group">
                <ArcBarChart />
                <ArcProgressBar />
                <GridWidget
                  PlanSummeryKPIState={PlanSummeryKPIState}
                  Title={"My Plan Summary"}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};
export default WidgetSection;
