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

재 배열 기능 살리기 + 다른 보드로 이동 시에도 드래그 되도록 만들기

modifier 함수를 사용하는 방법
1. value를 그냥 보내주기 -> 그 value가 state를 완전히 대체한다.
2. 새 state를 return하는 함수를 만든다. -> 자동적으로 current state가 () 자리에 들어가게 된다.

추가적으로 해결해볼 문제 - 드래그 했을 때 목록 제일 위 까지 와야만 옮겨진다. + 카드 옮겨질 때 배경색 바꿔주기

 */