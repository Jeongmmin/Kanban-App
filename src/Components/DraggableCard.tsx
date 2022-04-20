import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{isDragging:boolean}>`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${(props) => props.isDragging? "#497dd7" : props.theme.cardColor};
  box-shadow: ${(props) => props.isDragging? "0px 2px 10px rgba(0,0,0,0.1)" : "none"};
`;

export interface IDragabbleCardProps {
  toDoId: number;
  toDotext:string;
  index: number;
}

function DraggableCard({toDoId,toDotext, index}:IDragabbleCardProps) {
  // console.log(toDo, "has been render")
  return (
    <Draggable draggableId={toDoId+""} index={index}>
      {(magic, snapshot) => (
        <Card
        isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDotext}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);