// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineCancel } from "react-icons/md";
import { BiTask } from "react-icons/bi";
// *******~ Import ~******** //

const Task = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="action-btn" onClick={handleShow}>
        <span>
          <BiTask />
        </span>
        Task
      </button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="add-contact-form-canva"
        backdrop="static"
      >
        <Offcanvas.Body>
          <div className="add-contact-form">
            <div className="header-content">
              <h3>Task</h3>

              <span onClick={handleClose} className="close-btn">
                <MdOutlineCancel />
              </span>
            </div>
            <div className="main-content">
              <Form>
                <Form.Group className="form-group">
                  <div className="input-control">
                    <Form.Label>Add Task</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter task name"
                      name=""
                    />
                  </div>
                  <div className="input-control">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter the task details..."
                      rows={3}
                    />
                  </div>
                </Form.Group>
              </Form>
            </div>
            <div className="footer-content">
              <button className="cancel" onClick={handleClose}>
                Cancel
              </button>
              <button>Add</button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default Task;
