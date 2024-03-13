export const StyledLabel = (props) => {
  return (
    <label className="transition-all duration-700 ease-in-out bg-[#5a4ae3] ml-[8px]">
      <props.icon
        style={{
          color: "white",
          fontSize: "3ch",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </label>
  );
};
