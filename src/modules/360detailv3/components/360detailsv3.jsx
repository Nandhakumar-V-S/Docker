// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Form } from "react-bootstrap";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { IoIosCalendar } from "react-icons/io";
import { BiMessageDetail } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { GoInfo } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
// *******~ Import ~******** //

const Details360V3 = () => {
  const TabLists = [
    {
      TabKey: "user1",
      TabTitle: <>User Name 1</>,
      TabContent: (
        <>
          <TaskDetails />
        </>
      ),
    },
    {
      TabKey: "user2",
      TabTitle: <>User Name 2</>,
      TabContent: (
        <>
          <TaskDetails />
        </>
      ),
    },
    {
      TabKey: "user3",
      TabTitle: <>User Name 3</>,
      TabContent: (
        <>
          <TaskDetails />
        </>
      ),
    },
    {
      TabKey: "user4",
      TabTitle: <>User Name 4</>,
      TabContent: (
        <>
          <TaskDetails />
        </>
      ),
    },
    {
      TabKey: "user5",
      TabTitle: <>User Name 5</>,
      TabContent: (
        <>
          <TaskDetails />
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
                  className="main-tab"
                  activeKey={key}
                  transition={true}
                  onSelect={(k) => setKey(k)}
                >
                  {TabLists.map((TabList, index) => (
                    <Tab
                      key={index}
                      eventKey={TabList.TabKey}
                      title={
                        <>
                          <FaRegUserCircle />
                          {TabList.TabTitle}
                        </>
                      }
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
export default Details360V3;

const TaskDetails = () => {
  const [selectedValue, setSelectedValue] = useState(); // Initial value

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
  };
  const [key, setKey] = useState("comments");
  return (
    <>
      <div className="tab-main-content ">
        <div className="task-title">
          <h4>Multiple users can be owners of the same task</h4>
          <div className="name-others">
            <p>By Admin </p>
            <p className="explore">
              <span>
                <MdOutlineWorkOutline />
              </span>
              Explore the projects
            </p>
            <p>
              <span>
                <MdCall />
              </span>
              <span>
                <IoMailOutline />
              </span>
              <span>
                <IoIosCalendar />
              </span>
              <span>
                <BiMessageDetail />
              </span>
              <span>
                <GoInfo />
              </span>
            </p>
          </div>
        </div>

        <div className="inside-sub-div current-status">
          <div className="select-div">
            <span className="status-color"></span>
            <DropdownButton
              id="dropdown-item-button"
              title={`${selectedValue ? selectedValue : "Inprogress"}`}
              onSelect={handleSelect}
            >
              <div className="item-div">
                {["Inprogress", "Todo", "Hold", "Completed"].map(
                  (data, index) => (
                    <>
                      <Dropdown.Item eventKey={data} as="button" key={index}>
                        {data}
                      </Dropdown.Item>
                    </>
                  )
                )}
              </div>
            </DropdownButton>
          </div>
          <p>Current Status</p>
        </div>
        <div className="inside-sub-div description">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <IoIosArrowForward /> Description
              </Accordion.Header>
              <Accordion.Body>
                <p className="desc">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Velit rem iure eos ex ullam
                  molestias omnis veniam possimus dicta! Obcaecati sint,
                  mollitia sed quidem dolore quia consequatur suscipit rem nemo.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Velit rem iure eos ex ullam
                  molestias omnis veniam possimus dicta! Obcaecati sint,
                  mollitia sed quidem dolore quia consequatur suscipit rem nemo.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="inside-sub-div description">
          <Accordion defaultActiveKey="">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <IoIosArrowForward /> Task Information
              </Accordion.Header>
              <Accordion.Body>
                <p className="desc">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Velit rem iure eos ex ullam
                  molestias omnis veniam possimus dicta! Obcaecati sint,
                  mollitia sed quidem dolore quia consequatur suscipit rem nemo.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Velit rem iure eos ex ullam
                  molestias omnis veniam possimus dicta! Obcaecati sint,
                  mollitia sed quidem dolore quia consequatur suscipit rem nemo.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="inside-sub-div sub-tab-div">
          <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="comments" title="Comments">
              <div className="contant-box">
                <div className="input-control">
                  <Form.Label>Add Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Add a note..."
                    rows={3}
                  />
                  <div className="group-btn">
                    <button>Add</button>
                    <button className="cancel">Cancel</button>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="subtask" title="Subtask">
              <div className="contant-box">
                <div className="input-control">
                  <Form.Label>Subtask</Form.Label>
                </div>
              </div>
            </Tab>
            <Tab eventKey="documents" title="Documents">
              <div className="contant-box">
                <div className="input-control">
                  <Form.Label>Documents</Form.Label>
                </div>
              </div>
            </Tab>
            <Tab eventKey="statustimeline" title="Status Timeline">
              <div className="contant-box">
                <div className="input-control">
                  <Form.Label>Status Timeline</Form.Label>
                </div>
              </div>
            </Tab>
            <Tab eventKey="issue" title="Issue">
              <div className="contant-box">
                <div className="input-control">
                  <Form.Label>Issue</Form.Label>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia, tempora cupiditate. Maxime quos exercitationem
                    earum, corrupti excepturi minus facilis iusto? Explicabo,
                    ipsam nesciunt. Vitae ullam nesciunt, vero voluptates
                    reiciendis dolore?
                  </p>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};
