import styled from "styled-components";
import { MINSAPAY_BLUE } from "../components/theme-definition";
import { readExcelFirstChartOfEachSheet } from "./xlsx-conversion";

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const DatabaseInfoButton = styled.label`
  width: 40%;
  height: 5vh;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${MINSAPAY_BLUE};
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default function DeveloperHome() {
  const onXlSubmit = async (e) => {
    const file = e.target.files[0];
    await readExcelFirstChartOfEachSheet(file);
  };
  return (
    <Wrapper>
      <p>Developer Home</p>
      <DatabaseInfoButton htmlFor="xl-submit">
        Upload Database Info
      </DatabaseInfoButton>
      <input
        onChange={onXlSubmit}
        type="file"
        accept=".xls, .xlsx"
        required
        id="xl-submit"
        style={{ display: "none" }}
      />
    </Wrapper>
  );
}
