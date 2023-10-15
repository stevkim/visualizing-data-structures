import { useState, useRef, Fragment, useEffect, useCallback } from "react";
import { Node, NodeObject } from "../components/Node/Node";
import LinkedListContainer from "../components/Node/LinkedListContainer";
import { AnimatePresence } from "framer-motion";
import HorizontalDataWrapper from "../components/HorizontalDataWrapper";
import Title from "../components/Title";
import Controller from "../components/Controller";
import { AddButton, RemoveButton, ClearButton } from "../components/Buttons/Buttons";

const SinglyLinkedList = () => {
  const [linkedList, setLinkedList] = useState<NodeObject[] | []>([]);
  const [listSize, setListSize] = useState(0);
  const [removed, setRemoved] = useState<NodeObject | null>(null);
  const [insert, setInsert] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const setRemovedNode = (node: NodeObject) => {
    setRemoved(node);
    setTimeout(() => {
      setRemoved(null);
    }, 3000);
  }

  const addNew = useCallback(() => {
    linkedList.forEach((node) => {
      node.lastAdded = false;
    });
  }, [linkedList])

  const addToTail = useCallback(() => {
    const value = inputRef.current!.value;
    if (value === '') return;
    const newNode = Node(value, null);
    if (linkedList.length > 0) {
      addNew();
      const lastNode = linkedList[linkedList.length - 1];
      lastNode.next = newNode;
    }
    setLinkedList([...linkedList, newNode]);
    inputRef.current!.value = '';
  }, [linkedList, addNew])

  const removeFromTail = useCallback(() => {
    if (linkedList.length <= 0) return;
    if (linkedList.length === 1) {
      setRemovedNode(linkedList[0]);
      clearList();
      return;
    }
    const newLastNode = linkedList[linkedList.length - 2];
    newLastNode.next = null;
    const removedNode = linkedList[linkedList.length - 1]
    setLinkedList(linkedList.slice(0, linkedList.length - 1));
    if (removedNode) {
      setRemoved(removedNode);
    }
  }, [linkedList])

  const addToHead = useCallback(() => {
    const value = inputRef.current!.value;
    if (value === '') return;
    let currentFirstNode = null;
    if (linkedList.length > 0) {
      addNew();
      currentFirstNode = linkedList[0];
    }
    const newNode = Node(value, currentFirstNode);
    setLinkedList([newNode, ...linkedList]);
    inputRef.current!.value = '';
  }, [linkedList, addNew])

  const removeFromHead = useCallback(() => {
    if (linkedList.length <= 0 ) return;
    const removedNode = linkedList[0];
    setLinkedList(linkedList.slice(1));
    if (removedNode) {
      setRemovedNode(removedNode);
    }
  }, [linkedList])

  const insertAt= (index: number) => {
    if (!insert || linkedList.length <= 0) return;
    const value = inputRef.current!.value;
    if (value === '') {
      alert('Fill in a value to insert first!');
      return;
    }
    addNew();
    const currentNode = linkedList[index];
    const nextNode = currentNode.next;
    const newNode = Node(value, nextNode);
    currentNode.next = newNode;
    const newList = [];
    let firstNode = linkedList[0];
    while (firstNode) {
      newList.push(firstNode);
      firstNode = firstNode.next!;
    }
    setLinkedList(newList);
    setInsert(false);
    inputRef.current!.value = '';
  }

  const clearList = () => {
    setLinkedList([]);
  }

  useEffect(() => {
    setListSize(linkedList.length);
  }, [linkedList, listSize, addToHead, addToTail, removeFromHead, removeFromTail])

  return (
    <div className="w-full h-full flex flex-col items-center gap-10">
      <Title title="Visualizing Singly Linked List!"/>
      <HorizontalDataWrapper>
        <AnimatePresence>
        {
          linkedList.map((node, index) => {
            return (
              <Fragment key={index}>
                <LinkedListContainer node={node} index={index} insertAt={insertAt} listSize={listSize}/>
              </Fragment>
            )
          })
        }
      </AnimatePresence>
      {linkedList.length > 0 && <div className="aspect-square w-[60px] flex justify-center items-center border border-black">null</div>}
      </HorizontalDataWrapper>
      {
        removed
        ? <div><strong>{removed.value}</strong> was removed from the list!</div>
        : <></>
      }
      <Controller>
        <div className="w-full flex flex-row gap-4 justify-center">
          <input className="border border-black rounded-sm" type="text" ref={inputRef}/>
          <AddButton add={addToHead} type="Head" />
          <AddButton add={addToTail} type="Tail" />
          <button className={`border border-black p-1 relative ${insert ? 'bg-blue-200' : ''}`} onClick={()=> setInsert(!insert)}>
            Insert At
            {insert && <span className="absolute left-0 bottom-[-15px] whitespace-nowrap text-[.5rem]">Click on the Node you'd like to insert at!</span>}
          </button>
        </div>
        <div className="w-full flex flex-row gap-4 justify-center">
          <RemoveButton remove={removeFromHead} type="Head" />
          <RemoveButton  remove={removeFromTail} type="Tail"/>
          <ClearButton clear={clearList}/>
        </div>
      </Controller>
    </div>
  )
}
export default SinglyLinkedList;