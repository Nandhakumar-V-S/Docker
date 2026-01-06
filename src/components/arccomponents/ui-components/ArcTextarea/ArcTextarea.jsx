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

const ArcTextarea = ({
  Label,
  ClassName,
  PlaceHolder,
  Name,
  Required,
  Value,
  onChange,
  DefaultValue,
  ReadOnly,
  Id,
}) => {
  return (
    <>
      <div
        className={`arc-input-control arc-textarea ${ClassName} ${
          Required ? "mandatory-field" : null
        }`}
      >
        {Label && (
          <Form.Label>
            {Label} {Required && <sup>*</sup>}
          </Form.Label>
        )}
        <Form.Control
          as="textarea"
          placeholder={PlaceHolder}
          name={Name}
          value={Value}
          defaultValue={DefaultValue}
          onChange={onChange}
          required={Required}
          readOnly={ReadOnly}
          id={Id}
          //   rows={2}
        />
      </div>
    </>
  );
};
export default ArcTextarea;
