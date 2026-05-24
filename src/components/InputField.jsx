
export const InputField = ({ type, name, value, onChange, placeholder, className, inputRef }) => {
  return (
    <>
    <input
      ref={inputRef}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
    </>
  )
}
