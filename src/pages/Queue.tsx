import { useState, useRef, Fragment } from "react";
import { Node, NodeObject } from "../components/Node/Node";
import Title from "../components/Title";
import VerticalDataWrapper from "../components/VerticalDataWrapper";
import NodeContainer from "../components/Node/NodeContainer";
import { AnimatePresence } from "framer-motion";
import Controller from "../components/Controller";
import { AddButton, RemoveButton, ClearButton } from "../components/Buttons/Buttons";

const Queue = () => {
  const [queue, setQueue] = useState<NodeObject[] | []>([]);
  const [removed, setRemoved] = useState<NodeObject | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addToQueue = () => {
    const value = inputRef.current!.value;

    if (value === '') return;
    const newNode = Node(value);

    queue.forEach((node) => {
      node.lastAdded = false;
    })
    setQueue([...queue, newNode]);
    inputRef.current!.value = '';
  }

  const removeFromQueue = () => {
    const newQueue = queue;
    const removedNode = newQueue.shift();
    setQueue(newQueue);
    if (removedNode) {
      setRemoved(removedNode);
      setTimeout(() => {
        setRemoved(null);
      }, 3000)
    }
  }

  const clearQueue = () => {
    setQueue([]);
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <Title title='Visualizing the Queue!'/>
      <VerticalDataWrapper>
         <AnimatePresence mode="popLayout">
          {
            queue.map((node, index) => {
              return (
                <Fragment key={index}>
                  <NodeContainer node={node} index={index} type="queue"/>
                </Fragment>
              )
            })
          }
         </AnimatePresence>
      </VerticalDataWrapper>
      <div>
        {
          removed
          ? <div><strong>{removed.value}</strong> was removed from the Queue!</div>
          : <></>
        }
      </div>
      <Controller type="small">
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <input className="border border-black rounded-sm" type="text" ref={inputRef}/>
          <AddButton add={addToQueue} type="Queue" />
          <RemoveButton remove={removeFromQueue} type="Queue"/>
          <ClearButton clear={clearQueue} />
        </div>
      </Controller>
    </div>
  )
}

export default Queue;