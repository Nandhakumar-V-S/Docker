// *******~ Import ~******** //
//? React

//? Assets
import { toast, Flip } from "react-toastify";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //
const toastConfig = {
  autoClose: 1500,
  newestOnTop: false,
  transition: Flip,
  icon: true,
  className: "default-notifi",
  draggable: true,
};

const NotificationSuccess = ({ Message }) => {
  return (
    <>
      <div className="default-notifi-content">
        <p>Success!</p>
        <span>{Message}</span>
      </div>
    </>
  );
};
const NotificationFailed = ({ Message }) => {
  return (
    <>
      <div className="default-notifi-content">
        <p>Failed!</p>
        <span>{Message}</span>
      </div>
    </>
  );
};
const NotificationFailedDynamic = ({ Message, Title }) => {
  return (
    <>
      <div className="default-notifi-content">
        <p>{Title}</p>
        <span>{Message}</span>
      </div>
    </>
  );
};

export const ArcSuccess = ({ Message, position }) =>
  toast.success(<NotificationSuccess Message={Message} />, {
    ...toastConfig,
    position,
  });
export const ArcError = ({ Message, position }) =>
  toast.error(<NotificationFailed Message={Message} />, {
    ...toastConfig,
    position,
  });
export const ArcFaild = ({ Message, position, Title }) =>
  toast.error(<NotificationFailedDynamic Title={Title} Message={Message} />, {
    ...toastConfig,
    position,
  });
