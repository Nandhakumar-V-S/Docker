// *******~ Import ~******** //
//? React

//? Assets

//? Components

//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //
export const ArcButtonPrimary = ({ ClassName, BtnText, OnClick, disabled }) => {
  return (
    <>
      <button
        className={`arc-btn-primary ${ClassName}`}
        onClick={OnClick}
        disabled={disabled}
      >
        {BtnText}
      </button>
    </>
  );
};
export const ArcButtonSecondary = ({ ClassName, BtnText, OnClick, Icon }) => {
  return (
    <>
      <button
        className={`arc-btn-primary arc-btn-secondary ${ClassName}`}
        onClick={OnClick}
      >
        {Icon && <span>{Icon}</span>}
        {BtnText}
      </button>
    </>
  );
};

export const ArcButtonWithIcon = ({ ClassName, BtnText, OnClick, Icon }) => {
  return (
    <>
      <button className={`arc-btn-primary ${ClassName}`} onClick={OnClick}>
        {Icon && <span>{Icon}</span>}
        {BtnText}
      </button>
    </>
  );
};
export const ArcButtonWithIconType1 = ({
  ClassName,
  BtnText,
  OnClick,
  Icon,
}) => {
  return (
    <>
      <button
        className={`arc-btn-primary arc-btn-type1 ${ClassName}`}
        onClick={OnClick}
      >
        {Icon && <span>{Icon}</span>}
        {BtnText}
      </button>
    </>
  );
};

export const ArcButtonWithIconType2 = ({
  ClassName,
  BtnText,
  OnClick,
  Icon,
}) => {
  return (
    <>
      <button className={`arc-btn-type2 ${ClassName}`} onClick={OnClick}>
        {Icon && <span>{Icon}</span>}
        {BtnText}
      </button>
    </>
  );
};

export const ArcButtonWithIconType3 = ({
  ClassName,
  BtnText,
  OnClick,
  Icon,
}) => {
  return (
    <>
      <button
        className={`arc-btn-type2 arc-btn-type3 ${ClassName}`}
        onClick={OnClick}
      >
        {Icon && <span>{Icon}</span>}
        {BtnText}
      </button>
    </>
  );
};

export const ArcButtonWithIconType4 = ({
  ClassName,
  BtnText,
  OnClick,
  Icon,
}) => {
  return (
    <>
      <button className={`arc-btn-type4  ${ClassName}`} onClick={OnClick}>
        {Icon && <span>{Icon}</span>}
        {BtnText}
      </button>
    </>
  );
};
