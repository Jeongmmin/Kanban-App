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
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if(!destination) return;
    /* setToDos(oldToDos => {
      const toDosCopy = [...oldToDos];
      // 1. source.index에서 item 지울 것이다.
      toDosCopy.splice(source.index, 1)
      // 2. Put back the item on the destination.index
      toDosCopy.splice(destination?.index, 0 , draggableId)
      return toDosCopy
    }) */
    
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
  board 종류 3개로 만들기

  object를 mapping 하는 법 알아보기

  Object.keys() 사용하기, object가 가진 key만 array로 뽑아내준다.
  const toDos = {x: ["a", "b"],z: ["n", "t"],}
  Object.keys(toDos)
  (2) ['x', 'z']


  toDos['x']
(2) ['a', 'b']
위랑 아래랑 같은 것을 하고 있는 것이다.
Object.keys(toDos).map(boardId => toDos[boardId])

여기까지 해주고 나면 재배열 기능이 사라져버린다.

 */