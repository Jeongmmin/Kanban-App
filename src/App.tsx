import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";

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

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
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
                  <Draggable key={toDo} draggableId={toDo} index={index}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
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
 * 우리는 State를 변형시키지 않고 항상 새로운 State를 return한다. ( 완전히 바뀌는 것은 좋지 않음 )
const name = "nico"
undefined
name.toUpperCase()
name
'NICO'

=> non mutation, 우리도 State를 mutate하지 않을 것이다.

const onDragEnd = ({draggableId, destination, source}:DropResult) => {
    if(!destination) return;
    setToDos(oldToDos => {
      const toDosCopy = [...oldToDos];  
      // source.index에서 item 지울 것이다.
      toDosCopy.splice(source.index, 1)
      // Put back the item on the destination.index
      toDosCopy.splice(destination?.index, 0 , draggableId)
      return toDosCopy
    })
  };
  여기까지만 하면  <Draggable key={index} draggableId={toDo} index={index}> 이 부분에서 오류 발생한다.
  key={toDo} 이걸로 바꿔야 한다. react.js에서 우리는 key를 숫자인 index로 주는 것에 익숙하지만 이경우는 draggableId는 모두 같아야한다. 이게 beautiful-dnd를 사용하면서 배울 점이다.

  여기까지 하면 드래그는 잘 되지만, 한 번씩 글자가 이상하게 보이는 문제가 발생한다.(로드되는 데 시간이 소요된다.)
  react.js가 모든 draggable을 다시 렌더링 하기 때문

  // if (!destination) return;
    // setToDos((oldToDos) => {
    //   const toDosCopy = [...oldToDos];
    //   // source.index에서 item 지울 것이다.
    //   console.log("Delete item on", source.index);
    //   console.log(toDosCopy);
    //   toDosCopy.splice(source.index, 1);
    //   console.log("Delete item ");
    //   console.log(toDosCopy);
    //   // Put back the item on the destination.index
    //   console.log("Put back", draggableId, "on ", destination.index);
    //   toDosCopy.splice(destination?.index, 0, draggableId);
    //   console.log(toDosCopy);
    //   return toDosCopy;
    // });

  Delete item on 3
  (6) ['a', 'b', 'c', 'd', 'e', 'f']
  Delete item 
  (5) ['a', 'b', 'c', 'e', 'f']
  Put back d on  0
  (6) ['d', 'a', 'b', 'c', 'e', 'f']
*/
