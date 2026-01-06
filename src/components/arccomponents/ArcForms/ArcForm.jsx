const ArcForm = ({ onSubmit, children }) => {
  return (
    <>
      <form onSubmit={onSubmit}>{children}</form>
    </>
  );
};
export default ArcForm;
