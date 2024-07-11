import styled from "styled-components";
import { CPUHeader } from "../../components/CPU/cpu-header";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function AddSeller() {
  return (
    <Wrapper>
      <CPUHeader />
    </Wrapper>
  );
}
