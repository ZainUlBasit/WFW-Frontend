export const StyledInput = ({
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      className="pl-[5px] py-[4px] w-[244px] mr-[2px] ml-[7px] outline-none border-[2px] transition-all duration-700 text-[1.05rem] rounded-l-[0px] rounded-r-[5px] font-[raleway]  text-[#5A4AE3] font-[700]"
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
