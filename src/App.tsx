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
원래는 DraggableId가 text여서 그냥 board에 넣기만 하면 됐는데, 이제는 destinationBoard가 많은 toDo array로 이루어진 board라서 이전처럼 할 수 없다.

이제 한 과정이 더 필요함 => object 삭제전에 먼저 object를 grab해야 함

이전 : ["a", "b"] 일 떄 a, b가 draggableId + list item이라서 단지 slice로 옮길 수 있었다.

현재 : [{text: "hello", id: 1}, {text: "world", id: 2}] 이런 형태임
요소를 옮길 때 우리가 받을 수 있는 정보는 아이디 밖에 없는데 그걸로는 알 수 없음





*/