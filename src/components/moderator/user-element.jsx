import styled from "styled-components";
//import {BORDER_GRAY} from "../theme-definitiongit ";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
`;

const Table = styled.table`
  width: 90%;
  max-width: 800px;
  margin-top: 50px;
  margin-bottom: 50px;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #ccc;
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  font-size: 14px;
`;
const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  text-align: center; /* 텍스트 가운데 정렬 */
  vertical-align: middle; /* 세로 가운데 정렬 */
  margin-top: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

export function UserElement({ userName, balance, onUserSelect, id }) {
  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <Th>이름</Th>
            <Th>잔고</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>{userName}</Td>
            <Td
              onClick={() => {
                onUserSelect(id);
              }}
            >
              {balance}
            </Td>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
}
