import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";

export const ArcDateTimePicker = ({
  Label,
  Required,
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  handleDateTimeChange,
  timeInterval,
  PlaceHolder,
  formatForDateTime,
  invalidinput,
}) => {  
  console.log(startDate,"startDate",typeof(startDate));
  
  return (
    <>
      <div className="arc-input-control-datetimepicker-container">
        <div className="arc-input-control datetimepicker">
          {Label && (
            <Form.Label>
              {Label} {Required && <sup>*</sup>}
            </Form.Label>
          )}
        </div>
        <div className="date-time-picker">
          <DatePicker
            className={`arc-datetime ${Required ? "required" : ""} ${
              invalidinput ? "invalid-input" : ""
            }`}
            selected={startDate}
            onChange={handleDateTimeChange}
            placeholderText={PlaceHolder}
            showTimeSelect
            timeFormat="HH:mm:ss"
            timeIntervals={timeInterval}
            dateFormat="MMMM d, yyyy h:mm aa"
            // excludeTimes={[
            //   setHours(setMinutes(new Date(), 0), 17),
            //   setHours(setMinutes(new Date(), 30), 18),
            //   setHours(setMinutes(new Date(), 30), 19),
            //   setHours(setMinutes(new Date(), 30), 17),
            // ]}
            // dateFormat={formatForDateTime}
          />
        </div>
      </div>
    </>
  );
};