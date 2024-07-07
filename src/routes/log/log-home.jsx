import styled from "styled-components";
import { LogList } from "../../components/log/log-list";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default function LogHome() {
  return (
    <Wrapper>
      <LogList dataList={null} />
    </Wrapper>
  );
}
