import styled from "styled-components";
import { ModeratorHeader } from "../../components/moderator/moderator-header";
import { moderatorFirebase } from "../../features/moderator-firebase-interaction";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ModeratorHome() {
  useEffect(() => {
    const init = async () => {
      await moderatorFirebase.init();
    };
    init();
  }, []);

  return (
    <Wrapper>
      <ModeratorHeader />
    </Wrapper>
  );
}
