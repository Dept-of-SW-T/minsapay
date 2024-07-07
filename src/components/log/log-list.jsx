import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export function LogList({ dataList }) {
  return <Wrapper>{dataList}</Wrapper>;
}
