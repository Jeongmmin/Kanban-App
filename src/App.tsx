import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import DraggableCard from './Components/DraggableCard';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  /* color: #9bbdf1; */
  padding: 30px 10px 20px;
  border-radius: 5px;
  min-height: 200px;
`;



function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // Drag가 끝났을 때  동작하는 함수
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if(!destination) return;
    setToDos(oldToDos => {
      const toDosCopy = [...oldToDos];
      // 1. source.index에서 item 지울 것이다.
      toDosCopy.splice(source.index, 1)
      // 2. Put back the item on the destination.index
      toDosCopy.splice(destination?.index, 0 , draggableId)
      return toDosCopy
    })
    
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DraggableCard key={toDo} index={index} toDo={toDo}/>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

/**
글자 흔들리는 문제 수정하기


 */