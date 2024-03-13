import DatePicker from "react-date-picker";

const DatePickerComp = (props) => {
  return (
    <>
      <div className="w-[100%] flex flex-col px-[20px]">
        <span className="w-[100%] p-[3px] text-white font-bold pl-[10px] select-none">
          {props.title}
        </span>
        <input
          type="date"
          onChange={(e) => props.onChange(e.target.value)}
          value={props.value}
          className="w-[100%] bg-white font-bold text-[1.2rem] px-[8px] py-[5px]"
        />
      </div>
    </>
  );
};

export default DatePickerComp;
