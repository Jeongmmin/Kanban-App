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
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
      if (destination?.droppableId !== source.droppableId) {
        // cross board movement.
        setToDos((allBoards) => {
          // 이동 시작한 지점의 boardId를 알 수 있다.
          const sourceBoard = [...allBoards[source.droppableId]];
          const destinationBoard = [...allBoards[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, draggableId);
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


 */