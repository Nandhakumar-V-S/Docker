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
const ArcFileSelect = ({ Label, ClassName, Name, Required }) => {
  return (
    <>
      <div className={`arc-input-control arc-fileselect ${ClassName}`}>
        {Label && (
          <Form.Label>
            {Label} {Required && <sup>*</sup>}
          </Form.Label>
        )}
        <Form.Control type="file" name={Name} />
      </div>
    </>
  );
};
export default ArcFileSelect;
