import { useState, useRef, Fragment } from "react";
import { Node, NodeObject } from "../components/Node/Node";
import NodeContainer from "../components/Node/NodeContainer";
import { AnimatePresence } from "framer-motion";
import Title from "../components/Title";
import VerticalDataWrapper from "../components/VerticalDataWrapper";
import Controller from "../components/Controller";
import { AddButton, RemoveButton, ClearButton } from "../components/Buttons/Buttons";

const Stack = () => {
  const [stack, setStack] = useState<NodeObject[] | []>([]);
  const [removed, setRemoved] = useState<NodeObject | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addToStack = () => {
    const value = inputRef.current!.value;
    if (value === '') return;

    const newNode = Node(value);
    stack.forEach((node) => {
      node.lastAdded = false;
    });
    setStack([...stack, newNode]);
    inputRef.current!.value = '';
  }

  const removeFromStack = () => {
    if (stack.length <= 0) return;

    const currentStack = stack;
    const removedNode = currentStack.pop();
    setStack(currentStack);
    if (removedNode) {
      setRemoved(removedNode);
      setTimeout(() => {
        setRemoved(null);
      }, 3000);
    }
  }

  const clearStack = () => {
    setStack([]);
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <Title title='Visualizing the Stack!' />
      <VerticalDataWrapper>
        <AnimatePresence>
          {
            stack.map((node, index) => {
              return (
                <Fragment key={index}>
                  <NodeContainer node={node} index={index} type="stack"/>
                </Fragment>
              )
            })
          }
        </AnimatePresence>
      </VerticalDataWrapper>
      <div>
        {
          removed
          ? <div><strong>{removed.value}</strong> was removed from the Stack!</div>
          : <></>
        }
      </div>
      <Controller type="small">
        <div className="flex flex-row justify-center items-center gap-2 w-full">
          <input className="border border-black rounded-sm" type='text' ref={inputRef}/>
          <AddButton add={addToStack} type="Stack" />
          <RemoveButton remove={removeFromStack} type="Stack"/>
          <ClearButton clear={clearStack} />
        </div>
      </Controller>
    </div>
  )
}

export default Stack;
