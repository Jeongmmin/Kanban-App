import {
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;



function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // Drag가 끝났을 때  동작하는 함수
  const onDragEnd = (info: DropResult) => {
    console.log(info)
    const {destination, draggableId, source} = info;
    if(!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];

        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
      if (destination?.droppableId !== source.droppableId) {
        // cross board movement.
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];

          const destinationBoard = [...allBoards[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          }
        })
      }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]}/>)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

/**
id를 이용해서 board를 찾는 방법을 알아보자 or id로 todo 찾기

const taskObj = boardCopy[source.index];
object를 바로 지우면 원하는 참조값을 얻을 수 없으니까 없애기전에 복사해서 가지고 있으면 된다




*/