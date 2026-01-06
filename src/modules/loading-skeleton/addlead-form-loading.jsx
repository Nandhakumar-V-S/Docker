// *******~ Import ~******** //
//? React
import React, { useContext } from "react";
//? Assets
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Container, Row, Col } from "react-bootstrap";
//? Components
import ThemeContext from "@/context/themeContext/themecontexts";
//? CSS
import "./css/addlead-form-loading.scss";
//? Images

//? JSON File

//? Icons
// *******~ Import ~******** //

export const MySkeleton = (props) => {
  const { theme } = useContext(ThemeContext);
  const BaseColor = theme === "dark" ? "#02111f" : "#ebebeb";
  const AnimationColor = theme === "dark" ? "#001e3c" : "#f5f5f5";

  return (
    <>
      <Skeleton
        baseColor={BaseColor}
        highlightColor={AnimationColor}
        height={props.height}
        duration={1.5}
        width={props.width}
        count={props.count}
        wrapper={props.div}
        containerClassName={props.clsnme}
        circle={props.circle}
        borderRadius={props.radius}
      />
    </>
  );
};
const AddLeadFormLoading = () => {
  return (
    <>
      <section className="addleadform-loading">
        <Container fluid="xxl">
          <Row>
            <Col xxl={3} xl={3} md={4}>
              <aside className="sidebar-div">
                <ul className="lead-titles">
                  {[...Array(8)].map((data, index) => (
                    <li key={index}>
                      <MySkeleton height={22} radius={0} />
                    </li>
                  ))}
                </ul>
              </aside>
            </Col>
            <Col xxl={9} xl={9} md={8}>
              <div className="lead-form-div">
                {[...Array(3)].map((data, index) => (
                  <div className="form-section" key={index}>
                    <Row>
                      <Col xxl={12} xl={12} md={12}>
                        <h4 className="section-title">
                          <MySkeleton height={20} width={300} radius={0} />
                        </h4>
                      </Col>
                    </Row>
                    <Row>
                      {[...Array(10)].map((data, index) => (
                        <React.Fragment key={index}>
                          <Col xxl={6} xl={6} md={6}>
                            <MySkeleton
                              height={28}
                              radius={0}
                              clsnme="input-div"
                            />
                          </Col>
                        </React.Fragment>
                      ))}
                    </Row>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default AddLeadFormLoading;

export const ListHeaderLoading = () => {
  return (
    <>
      <div className="filter-section filter-section-loading">
        <div className="filter-btn-group">
          <div className="filter-btn-group-left">
            {[...Array(4)].map((data, index) => (
              <>
                <MySkeleton height={17} radius={0} />
              </>
            ))}
          </div>
          <div className="filter-btn-group-right"></div>
        </div>
        <div className="grouping-selected">
          <ul>
            {[...Array(3)].map((data, index) => (
              <>
                <li key={index}>
                  <MySkeleton height={16} width={100} radius={0} />
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
