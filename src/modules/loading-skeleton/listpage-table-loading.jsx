// *******~ Import ~******** //
//? React
import React, { useContext } from "react";
//? Assets
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Table from "react-bootstrap/Table";
//? Components
import ThemeContext from "@/context/themeContext/themecontexts";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
//? CSS
import "./css/listpage-table-loading.scss";
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
const ListPageTableLoading = () => {
  const { isGrouping } = useContext(ArcGlobalContextProvider);
  return (
    <section className="list-page-loading">
      <div
        className={`data-table-loading ${isGrouping ? "is-grouping" : null}`}
      >
        <Table bordered>
          <thead>
            <tr>
              {[...Array(5)].map((data, index) => (
                <React.Fragment key={index}>
                  <th>
                    <MySkeleton height={20} radius={0} />
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(20)].map((data, index) => (
              <React.Fragment key={index}>
                <tr key={index}>
                  <td>
                    <div className="name-div">
                      <MySkeleton height={13} radius={0} width={"15px"} />
                      <MySkeleton height={13} clsnme="name" radius={0} />
                    </div>
                  </td>
                  {[...Array(4)].map((data, index) => (
                    <td key={index}>
                      <MySkeleton height={13} radius={0} />
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};
export default ListPageTableLoading;

export const ListHeaderLoading = () => {
  return (
    <>
      <div className="filter-section filter-section-loading">
        <div className="filter-btn-group">
          <div className="filter-btn-group-left">
            {[...Array(4)].map((data, index) => (
              <React.Fragment key={index}>
                <MySkeleton height={17} width={100} radius={0} />
              </React.Fragment>
            ))}
          </div>
          <div className="filter-btn-group-right"></div>
        </div>
        <div className="grouping-selected">
          <ul>
            {[...Array(3)].map((data, index) => (
              <React.Fragment key={index}>
                <li key={index}>
                  <MySkeleton height={16} width={100} radius={0} />
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export const SubTaskGridLoading = () => {
  return (
    <section className="list-page-loading ">
      <div className={`data-table-loading with-subtask-grid`}>
        <Table bordered>
          <thead>
            <tr>
              {[...Array(4)].map((data, index) => (
                <React.Fragment key={index}>
                  <th>
                    <MySkeleton height={20} radius={0} />
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(4)].map((data, index) => (
              <React.Fragment key={index}>
                <tr key={index}>
                  <td>
                    <div className="name-div">
                      <MySkeleton height={13} radius={0} width={"15px"} />
                      <MySkeleton height={13} clsnme="name" radius={0} />
                    </div>
                  </td>
                  {[...Array(3)].map((data, index) => (
                    <td key={index}>
                      <MySkeleton height={13} radius={0} />
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export const TagGridLoading = () => {
  return (
    <section className="list-page-loading ">
      <div className={`data-table-loading with-subtask-grid`}>
        <Table bordered>
          <thead>
            <tr>
              {[...Array(2)].map((data, index) => (
                <React.Fragment key={index}>
                  <th>
                    <MySkeleton height={20} radius={0} />
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((data, index) => (
              <React.Fragment key={index}>
                <tr key={index}>
                  <td>
                    <div className="name-div">
                      <MySkeleton height={13} radius={0} width={"15px"} />
                      <MySkeleton height={13} clsnme="name" radius={0} />
                    </div>
                  </td>
                  {[...Array(1)].map((data, index) => (
                    <td key={index}>
                      <MySkeleton height={13} radius={0} />
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export const FilterTableLoading = () => {
  const { isGrouping } = useContext(ArcGlobalContextProvider);
  return (
    <section className="list-page-loading with-filter">
      <div
        className={`data-table-loading ${isGrouping ? "is-grouping" : null}`}
      >
        <Table bordered>
          <thead>
            <tr>
              {[...Array(1)].map((data, index) => (
                <React.Fragment key={index}>
                  <th>
                    <MySkeleton height={20} radius={0} />
                  </th>
                  <th>
                    <MySkeleton height={20} radius={0} />
                  </th>
                  <th>
                    <MySkeleton height={20} radius={0} />
                  </th>
                  <th>
                    <MySkeleton height={20} radius={0} />
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(20)].map((data, index) => (
              <React.Fragment key={index}>
                <tr key={index}>
                  <td>
                    <div className="name-div">
                      <MySkeleton height={13} radius={0} width={"15px"} />
                      <MySkeleton height={13} clsnme="name" radius={0} />
                    </div>
                  </td>
                  {[...Array(1)].map((data, index) => (
                    <>
                      <td key={index}>
                        <MySkeleton height={13} radius={0} />
                      </td>
                      <td key={index}>
                        <MySkeleton height={13} radius={0} />
                      </td>
                      <td key={index}>
                        <MySkeleton height={13} radius={0} />
                      </td>
                    </>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export const SubtaskGridLoading = () => {
  return (
    <section className="list-page-loading ">
      <div className={`data-table-loading with-task-subtask-grid`}>
        <Table bordered>
          <thead>
            <tr>
              {[...Array(10)].map((data, index) => (
                <React.Fragment key={index}>
                  <th>
                    <MySkeleton height={20} radius={0} />
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((data, index) => (
              <React.Fragment key={index}>
                <tr key={index}>
                  <td>
                    <div className="name-div">
                      <MySkeleton height={13} radius={0} width={"15px"} />
                      <MySkeleton height={13} clsnme="name" radius={0} />
                    </div>
                  </td>
                  {[...Array(9)].map((data, index) => (
                    <td key={index}>
                      <MySkeleton height={13} radius={0} />
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export const JourneyLoading = () => {
  const JourneyData = [5, 4, 6, 3];
  return (
    <React.Fragment>
      {JourneyData.map((item, index) => (
        <div className="journey-container with-loading" key={index}>
          <h4 className="title">
            <MySkeleton height={16} width={160} radius={0} />
          </h4>
          <ul>
            {[...Array(item)].map((data, index) => (
              <li key={index}>
                <MySkeleton height={80} width={90} radius={2} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </React.Fragment>
  );
};
