import styled from "styled-components";
import { logFirebase } from "../../features/log-firebase-interaction";
import { onSnapshot, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
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
`;

export default function LogHome() {
  const [log, setLog] = useState([]);

  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await logFirebase.init();
      setLog((await getDoc(logFirebase.logRef)).data().log);
    };
    init();
    unsubscribe = onSnapshot(logFirebase.logRef, (snapshot) => {
      setLog(snapshot.data().log);
    });

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <h1>hi</h1>
      <Table>
        <thead>
          <tr>
            <Th>거래시간</Th>
            <Th>받은사람</Th>
            <Th>보낸사람</Th>
            <Th>거래액</Th>
          </tr>
        </thead>
        <tbody>
          {log.map((logEl, index) => (
            <tr key={index}>
              <Td>{logEl.time}</Td>
              <Td>{logEl.reciever}</Td>
              <Td>{logEl.sender}</Td>
              <Td>{logEl.amount}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}
