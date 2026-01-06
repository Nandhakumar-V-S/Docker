// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineContacts } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { BiTagAlt } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";

// *******~ Import ~******** //

const Details360V2 = () => {
  const TabLists = [
    {
      TabKey: "overview",
      TabTitle: (
        <>
          <MdOutlineContacts /> Overview
        </>
      ),
      TabContent: (
        <>
          <OverView />
        </>
      ),
    },
    {
      TabKey: "notes",
      TabTitle: (
        <>
          <GrNotes /> Notes
        </>
      ),
      TabContent: (
        <>
          <Notes />
        </>
      ),
    },
    {
      TabKey: "activites",
      TabTitle: (
        <>
          <FaTasks /> Activites
        </>
      ),
      TabContent: (
        <>
          <Activites />
        </>
      ),
    },
    {
      TabKey: "deals",
      TabTitle: (
        <>
          <ImStatsBars /> Deals
        </>
      ),
      TabContent: (
        <>
          <Deals />
        </>
      ),
    },
    {
      TabKey: "products",
      TabTitle: (
        <>
          <MdProductionQuantityLimits /> Products
        </>
      ),
      TabContent: (
        <>
          <Products />
        </>
      ),
    },
  ];
  const [key, setKey] = useState(TabLists[0].TabKey);
  return (
    <>
      <section className="page-360-detail-v2">
        <Container fluid>
          <Row>
            <Col xxl={12} xl={12} md={12} lg={12}>
              <div className="details-tab">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  transition={true}
                  onSelect={(k) => setKey(k)}
                >
                  {TabLists.map((TabList, index) => (
                    <Tab
                      key={index}
                      eventKey={TabList.TabKey}
                      title={TabList.TabTitle}
                    >
                      {TabList.TabContent}
                    </Tab>
                  ))}
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Details360V2;

const OverView = () => {
  const ActivitiesData = [
    {
      Date: "Today, February 01, 2024",
      List: [
        { Name: "Admin", Time: "1 months ago", Lead: "New" },
        { Name: "Admin 2", Time: "2 months ago", Lead: "Contacted" },
        { Name: "Admin 3", Time: "2 months ago", Lead: "Contacted" },
        { Name: "Admin 4", Time: "2 months ago", Lead: "Contacted" },
      ],
    },
    {
      Date: "Yesterday, February 02, 2024",
      List: [
        { Name: "Admin", Time: "5 months ago", Lead: "Contacted" },
        { Name: "Admin", Time: "6 months ago", Lead: "Contacted" },
      ],
    },
    {
      Date: "January 03, 2024",
      List: [{ Name: "Admin", Time: "5 months ago", Lead: "Contacted" }],
    },
  ];
  const [VisibleContent, setVisibleContent] = useState("overview");
  return (
    <>
      {VisibleContent === "overview" ? (
        <>
          <div className="tab-main-content overview">
            <div className="changed-btns">
              <button
                className={VisibleContent === "overview" ? "active" : null}
                onClick={() => setVisibleContent("overview")}
              >
                Overview
              </button>
              <button
                className={VisibleContent === "timeline" ? "active" : null}
                onClick={() => setVisibleContent("timeline")}
              >
                Timeline
              </button>
            </div>
            <h4 className="tab-title">Overview</h4>
            <div className="info-table">
              <Table>
                <tbody>
                  <tr>
                    <td>Contact Owner</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>
                      <a href="mailto:admin@example.com">admin@example.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>
                      <a href="call:0123456789">
                        <span>
                          <MdCall />
                        </span>
                        +91 01234 56789
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>
                      <a href="call:0123456789">
                        <span>
                          <MdCall />
                        </span>
                        +91 01234 56789
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Department</td>
                    <td>Development</td>
                  </tr>
                  <tr>
                    <td>Account Name</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>Account Number</td>
                    <td>1234567890</td>
                  </tr>
                  <tr>
                    <td>Account Status</td>
                    <td>Active</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="tab-main-content activities">
            {/* <h4 className="tab-title">Activites</h4> */}
            <div className="changed-btns">
              <button
                className={VisibleContent === "overview" ? "active" : null}
                onClick={() => setVisibleContent("overview")}
              >
                Overview
              </button>
              <button
                className={VisibleContent === "timeline" ? "active" : null}
                onClick={() => setVisibleContent("timeline")}
              >
                Timeline
              </button>
            </div>
            <div className="activities-list">
              {ActivitiesData.map((data, index) => (
                <>
                  <ul key={index}>
                    <h5>{data.Date}</h5>
                    {data.List.map((datalist, index) => (
                      <>
                        <li key={index}>
                          <span className="tag-icon">
                            <BiTagAlt />
                          </span>
                          <div className="activities-box">
                            <p>
                              Contact Status Updated
                              <span>
                                <CiEdit /> {datalist.Name}
                              </span>
                              <span>{datalist.Time}</span>
                            </p>
                            <span>Updated to Lead : {datalist.Lead}</span>
                          </div>
                        </li>
                      </>
                    ))}
                  </ul>
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const Notes = () => {
  return (
    <>
      <div className="tab-main-content notes">
        <div className="input-control">
          <Form.Label>Add Notes</Form.Label>
          <Form.Control as="textarea" placeholder="Add a note..." rows={3} />
          <div className="group-btn">
            <button>Save</button>
            <button className="cancel">Cancel</button>
          </div>
        </div>
        <ul className="notes-list">
          <li>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
              officiis laudantium.
            </p>
            <p className="name-time">
              <span>Admin</span>
              <span>in 3 minutes</span>
            </p>
          </li>
          <li>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
              officiis laudantium. dolor sit amet consectetur.
            </p>
            <p className="name-time">
              <span>Admin</span>
              <span>5 hours ago</span>
            </p>
          </li>
          <li>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p className="name-time">
              <span>Admin</span>
              <span>2 months ago</span>
            </p>
          </li>
          <li>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p className="name-time">
              <span>Admin</span>
              <span>2 months ago</span>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};
const Activites = () => {
  const ActivitiesData = [
    {
      Date: "Today, February 01, 2024",
      List: [
        { Name: "Admin", Time: "1 months ago", Lead: "New" },
        { Name: "Admin 2", Time: "2 months ago", Lead: "Contacted" },
        { Name: "Admin 3", Time: "2 months ago", Lead: "Contacted" },
        { Name: "Admin 4", Time: "2 months ago", Lead: "Contacted" },
      ],
    },
    {
      Date: "Yesterday, February 02, 2024",
      List: [
        { Name: "Admin", Time: "5 months ago", Lead: "Contacted" },
        { Name: "Admin", Time: "6 months ago", Lead: "Contacted" },
      ],
    },
    {
      Date: "January 03, 2024",
      List: [{ Name: "Admin", Time: "5 months ago", Lead: "Contacted" }],
    },
  ];
  return (
    <>
      <div className="tab-main-content activities">
        {/* <h4 className="tab-title">Activites</h4> */}
        <div className="activities-list">
          {ActivitiesData.map((data, index) => (
            <>
              <ul key={index}>
                <h5>{data.Date}</h5>
                {data.List.map((datalist, index) => (
                  <>
                    <li key={index}>
                      <span className="tag-icon">
                        <BiTagAlt />
                      </span>
                      <div className="activities-box">
                        <p>
                          Contact Status Updated
                          <span>
                            <CiEdit /> {datalist.Name}
                          </span>
                          <span>{datalist.Time}</span>
                        </p>
                        <span>Updated to Lead : {datalist.Lead}</span>
                      </div>
                    </li>
                  </>
                ))}
              </ul>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
const Deals = () => {
  return (
    <>
      <div className="tab-main-content">Deals</div>
    </>
  );
};
const Products = () => {
  return (
    <>
      <div className="tab-main-content">Products</div>
    </>
  );
};
