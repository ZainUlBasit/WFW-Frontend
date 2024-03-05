export const StyledSelect = ({ value, onChange, children }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="h-[35px] w-[244px] pl-[5px] mr-[3px] ml-[7px] outline-none transition-all duration-700 ease-in-out text-[1rem] rounded-tl-[0px] rounded-tr-[5px] rounded-bl-[0px] rounded-br-[5px] overflow-hidden font-[raleway] text-[#5a4ae3] font-[600]"
    >
      {children}
    </select>
  );
};
