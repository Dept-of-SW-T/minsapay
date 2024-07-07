import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

export function SingleList({ dataList }) {
  return <Wrapper>{dataList}</Wrapper>;
}
