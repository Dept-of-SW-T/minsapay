import { useState, useEffect } from "react";
import styled from "styled-components";
import { CPUHeader } from "../../components/CPU/cpu-header";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";
import Loading from "../../components/loading";
import {
  MINSAPAY_TITLE,
  MINSAPAY_BLUE,
} from "../../components/theme-definition";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 20px 0;
  font-family: ${MINSAPAY_TITLE};
  font-size: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  & > input {
    margin: 5px 0;
    padding: 8px;
    font-size: 16px;
  }

  & > button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: ${MINSAPAY_BLUE};
    color: white;
    border: none;
    border-radius: 2px;
  }
`;

const Table = styled.table`
  width: 90%;
  max-width: 100vw;
  margin-top: 50px;
  margin-bottom: 50px;
  border-collapse: collapse;
  background-color: #fff;
  border: 2px solid #ccc;
  font-family: ${MINSAPAY_TITLE};
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: ${MINSAPAY_BLUE};
  color: white;
  font-size: 14px;
  text-align: center;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  color: white;
  background-color: red;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: darken(${MINSAPAY_BLUE}, 10%);
  }
`;

export default function AddSeller() {
  const [studentNumber, setStudentNumber] = useState("");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      await CPUFirebase.init();
      const studentList = await CPUFirebase.fetchStudentList();
      setStudents(studentList);
      setIsLoading(false);
    };

    fetchStudents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (studentNumber) {
      setIsLoading(true);
      try {
        const student = await CPUFirebase.addStudent(studentNumber);
        setStudents([...students, student]);
        setStudentNumber("");
      } catch (error) {
        console.error("Error adding student: ", error);
        alert("Error adding student");
      }
      setIsLoading(false);
    }
  };

  const handleDelete = async (studentNumber) => {
    setIsLoading(true);
    try {
      await CPUFirebase.removeStudent(studentNumber);
      setStudents(
        students.filter((student) => student.studentNumber !== studentNumber),
      );
    } catch (error) {
      console.error("Error removing student: ", error);
      alert("Error removing student");
    }
    setIsLoading(false);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CPUHeader />
          <Title>팀원 추가하기</Title>
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              placeholder="Enter student number"
            />
            <button type="submit">Add Student</button>
          </Form>
          <Table>
            <thead>
              <tr>
                <Th>Student Number</Th>
                <Th>Username</Th>
                <Th>Edit</Th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <Td>{student.studentNumber}</Td>
                  <Td>{student.username}</Td>
                  <Td>
                    <DeleteButton
                      onClick={() => handleDelete(student.studentNumber)}
                    >
                      Delete
                    </DeleteButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Wrapper>
  );
}
