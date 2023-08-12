import './myCheckbox.scss';

const MyCheckbox = () => {
  return (
    <>
      <input
        className="checkbox"
        type="checkbox"
        id="happy"
        name="happy"
        value="yes"
      />
      <label htmlFor="happy">Happy</label>
    </>
  );
};
export default MyCheckbox;
