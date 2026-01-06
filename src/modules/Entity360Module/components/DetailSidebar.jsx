// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets
import Form from "react-bootstrap/Form";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { TbMessagePlus } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdAddCall } from "react-icons/md";
import { LiaAddressCardSolid } from "react-icons/lia";
// *******~ Import ~******** //

const DetailSidebar = () => {
  const [ContactPopup, setContactPopup] = useState(false);
  const [AssociationPopup, setAssociationPopup] = useState(false);
  return (
    <>
      <section className="detail-sidebar">
        <div
          className={`sidebar-popup ${
            ContactPopup || AssociationPopup ? "active" : null
          }`}
        >
          {ContactPopup && (
            <>
              <ContactPopupSection />
            </>
          )}
          {AssociationPopup && (
            <>
              <AssociationPopupSection />
            </>
          )}
        </div>

        <div className="group-btn">
          <button
            className={`${ContactPopup ? "active" : null}`}
            // onClick={() => {
            //   setContactPopup((prevContactPopup) => !prevContactPopup);
            //   setAssociationPopup(false);
            // }}
          >
            <LiaAddressCardSolid />
          </button>
          <button
            className={`${AssociationPopup ? "active" : null}`}
            // onClick={() => {
            //   {
            //     setAssociationPopup(
            //       (prevAssociationPopup) => !prevAssociationPopup
            //     );
            //     setContactPopup(false);
            //   }
            // }}
          >
            <IoNotificationsOutline />
          </button>
        </div>
      </section>
    </>
  );
};
export default DetailSidebar;

const ContactPopupSection = () => {
  const ContactList = [
    {
      Name: "Joe McCarthy",
    },
    {
      Name: "John Wagner",
    },
    {
      Name: "Carla Bragagnolo",
    },
    {
      Name: "Andrea Mugnolo",
    },
    {
      Name: "Carlos Castro",
    },
    {
      Name: "Carla Bragagnolo",
    },
    {
      Name: "Andrea Mugnolo",
    },
  ];
  ContactList;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = ContactList.filter((contact) =>
    contact.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="sidebar-main-content contact-popup">
        <div className="filter-header">
          <Form.Control
            className="search-contact"
            type="text"
            placeholder="Search contact name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul>
          {filteredContacts.length === 0 && (
            <>
              <p className="not-found-contact">Contact Not Found.</p>
            </>
          )}
          {filteredContacts.map((List, index) => (
            <React.Fragment key={index}>
              <li>
                <div className="details">
                  <div className="title">
                    <span>
                      {List.Name.split(" ")
                        .map((word) => word.charAt(0))
                        .join("")}
                    </span>
                    <h4>{List.Name}</h4>
                  </div>

                  <p className="desgi">
                    <span>Food Consultant</span>
                    <span>World Cuisine, LLC</span>
                  </p>
                  <p className="location">Evans, Georgia, United States.</p>
                  <p className="about">
                    5 years 10 month in role | 5 years 10 month in company.
                  </p>
                  <p className="description">
                    <span>
                      <strong>About:</strong> Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit.
                    </span>
                    &nbsp;
                    <span className="read-more-btn">Read more...</span>
                  </p>
                </div>
                <div className="action-btn">
                  <button>
                    <BsThreeDots />
                  </button>
                  <button>
                    <MdAddCall />
                  </button>
                  <button>
                    <TbMessagePlus />
                  </button>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};

const AssociationPopupSection = () => {
  const ContactList = [
    { Name: "Joe McCarthy", Type: "Lead" },
    { Name: "John Wagner", Type: "Account" },
    { Name: "Carla Bragagnolo", Type: "Admin" },
    { Name: "Andrea Mugnolo", Type: "Admin" },
    { Name: "Carlos Castro", Type: "Admin" },
    { Name: "Jane Doe", Type: "Admin" },
    { Name: "Mark Smith", Type: "Admin" },
    { Name: "Laura Johnson", Type: "Admin" },
    { Name: "David Brown", Type: "Admin" },
    { Name: "Sophie Miller", Type: "Admin" },
    { Name: "Michael Davis", Type: "Admin" },
    { Name: "Emily White", Type: "Admin" },
    { Name: "Brian Taylor", Type: "Admin" },
    { Name: "Olivia Jones", Type: "Admin" },
    { Name: "Kevin Moore", Type: "Admin" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = ContactList.filter((contact) =>
    contact.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedValue, setSelectedValue] = useState("Lead"); // Initial value

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
  };
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  return (
    <>
      <div className="sidebar-main-content association-popup">
        <div className="filter-header">
          <DropdownButton
            id="dropdown-item-button"
            title={selectedValue}
            onSelect={handleSelect}
          >
            <div className="item-div">
              {["Lead", "Contact", "Account", "Oppurtunity"].map(
                (data, index) => (
                  <React.Fragment key={index}>
                    <Dropdown.Item eventKey={data} as="button" key={index}>
                      {data}
                    </Dropdown.Item>
                  </React.Fragment>
                )
              )}
            </div>
          </DropdownButton>
          <Form.Control
            className="search-contact"
            type="text"
            placeholder="Search Lead Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ul className="listing-contact">
          {currentContacts.length === 0 && (
            <>
              <p className="not-found-contact">Not Found</p>
            </>
          )}
          {currentContacts.map((List, index) => (
            <React.Fragment key={index}>
              <li>
                <div className="details">
                  <div className="title">
                    {/* <span>
                      {List.Name.split(" ")
                        .map((word) => word.charAt(0))
                        .join("")}
                    </span> */}
                    <h4>{List.Name}</h4>
                  </div>

                  <p className="desgi">
                    <span>Food Consultant</span>
                    <span>World Cuisine, LLC</span>
                  </p>
                  <p className="location">Evans, Georgia, United States.</p>
                  <p className="about">
                    5 years 10 month in role | 5 years 10 month in company.
                  </p>
                  <p className="description">
                    <span>
                      <strong>About:</strong> Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit.
                    </span>
                    &nbsp;
                    <span className="read-more-btn">Read more...</span>
                  </p>
                </div>
                <div className="action-btn">
                  <button>
                    <BsThreeDots />
                  </button>
                  <button>
                    <MdAddCall />
                  </button>
                  <button>
                    <TbMessagePlus />
                  </button>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
        <Pagination>
          <Pagination.First
            disabled={currentPage === 1}
            onClick={() => paginate(1)}
          />
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          />
          {Array.from({
            length: Math.ceil(filteredContacts.length / itemsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          />
          <Pagination.Last
            disabled={currentPage === totalPages}
            onClick={() => paginate(totalPages)}
          />
        </Pagination>
      </div>
    </>
  );
};
