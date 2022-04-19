import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  padding: 10px 0;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingFromThis:boolean;
  isDraggingOver:boolean

}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => props.isDraggingOver? "#b2cffa" : props.isDraggingFromThis? "#dadce0" : "transparent"};
  flex-grow: 1;
  transition: background-color .4s ease-in-out;
  padding: 20px 10px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area isDraggingOver={info.isDraggingOver} isDraggingFromThis={Boolean(info.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;

/**
export interface DraggableStateSnapshot {
    isDragging: boolean;
    isDropAnimating: boolean;
    dropAnimation?: DropAnimation | undefined;
    draggingOver?: DroppableId | undefined;
    // the id of a draggable that you are combining with
    combineWith?: DraggableId | undefined;
    // a combine target is being dragged over by
    combineTargetFor?: DraggableId | undefined;
    // What type of movement is being done: 'FLUID' or 'SNAP'
    mode?: MovementMode | undefined;
}
 */
