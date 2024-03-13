import styled from "styled-components";

export const CrossButton = ({ setOpen }) => {
  return (
    <button
      className="flex absolute top-[15px] right-[12px] border-[2px] border-[#5a4ae3] bg-[#fff] text-[#5a4ae3] px-[8px] py-[1px] rounded-[100%] overflow-hidden hover:bg-[#5a4ae3] hover:text-white transition-all duration-500"
      onClick={() => setOpen(false)}
    >
      X
    </button>
  );
};

export const StyledButton = styled.button`
  background-color: ${(props) =>
    props.primary && props.update
      ? "#15803cd9"
      : props.primary && props.delete
      ? "#dc2626cb"
      : props.primary
      ? "#5A4AE3"
      : "#5A4AE3"};
  /* width: ${(props) => (!props.primary ? "80%" : "")}; */
  padding: ${(props) => (props.primary ? "9px 35px 8px 35px" : "5px 10px")};
  font-family: raleway;
  font-size: 1rem;
  font-weight: ${(props) => (props.primary ? "500" : "700")};
  color: ${(props) => (props.primary ? "white" : "white")};
  border-radius: ${(props) => (props.primary ? "5px" : "9999px")};
  margin-top: ${(props) => (props.secondary ? "15px" : "0px")};
  border: ${(props) => (!props.primary ? "1px solid #5a4ae3" : "")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
