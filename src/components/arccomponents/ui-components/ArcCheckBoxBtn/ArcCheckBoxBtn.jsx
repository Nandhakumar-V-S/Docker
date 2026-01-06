// *******~ Import ~******** //
//? React

//? Assets
import Form from "react-bootstrap/Form";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const ArcCheckBoxBtn = ({ CheckBtnData, Name, Label, Required, ClassName }) => {
  return (
    <>
      <div className={`arc-input-control arc-radiobtn ${ClassName}`}>
        {Label && (
          <Form.Label>
            {Label} {Required && <sup>*</sup>}
          </Form.Label>
        )}
        {/* <Form.Label>Select Owner</Form.Label> */}
        <div className="radio-check-div">
          {CheckBtnData.map((data, index) => (
            <label key={index}>
              <input type="checkbox" name={Name} value={data.Value} />
              {data.Title} {Required && <sup>*</sup>}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default ArcCheckBoxBtn;
