// *******~ Import ~******** //
//? React

//? Assets

//? Components
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const ArcToggle = ({ Label, ClassName, Name, onChange, checked,defaultChecked }) => {
  return (
    <>
      <div className={`arc-input-control arc-toggle ${ClassName}  `}>
        <div className="checkbox-wrapper-2">
          {Label && <label htmlFor="">{Label}</label>}
          <input
            type="checkbox"
            className="toogle-btn"
            name={Name}
            onChange={onChange}
            checked={checked}
            defaultChecked={defaultChecked}
          />
        </div>
      </div>
    </>
  );
};
export default ArcToggle;
