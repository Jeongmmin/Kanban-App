import { DragDropContext } from 'react-beautiful-dnd';


function App() {

  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <span>Hello</span>
    </DragDropContext>
  );
}

export default App;
