import './form-input.styles.scss';
// Input options
const FormInput = ({ label, ...otherProps }) => {
  return (
    // Shrink lable text when input form is selected 
    <div className='group'>
      <input className='form-input' {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
