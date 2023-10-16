import { useState, Fragment, useRef, useCallback, useEffect } from "react";
import { Node, NodeObject } from "../components/Node/Node";
import Title from "../components/Title";
import HorizontalDataWrapper from "../components/HorizontalDataWrapper";
import { AnimatePresence } from "framer-motion";
import LinkedListContainer from "../components/Node/LinkedListContainer";
import Controller from "../components/Controller";
import { AddButton, RemoveButton, ClearButton } from "../components/Buttons/Buttons";

const DoublyLinkedList = () => {
  const [doublyList, setDoublyList] = useState<NodeObject[] | []>([]);
  const [listSize, setListSize] = useState(0);
  const [removed, setRemoved] = useState<NodeObject | null>(null);
  const [insert, setInsert] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const setRemovedNode = (node: NodeObject) => {
    setRemoved(node);
    setTimeout(() => {
      setRemoved(null)
    }, 3000);
  }

  const addNew = useCallback(() => {
    doublyList.forEach((node) => {
      node.lastAdded = false;
    })
  }, [doublyList])

  const addToHead = useCallback(() => {
    const value = inputRef.current!.value;
    if (value === '') return;
    const nextNode = doublyList.length > 0 ? doublyList[0] : null;
    const newNode = Node(value, nextNode, null);
    if (nextNode) {
      nextNode.prev = newNode;
    }
    addNew();
    setDoublyList([newNode, ...doublyList]);
    inputRef.current!.value = '';
  }, [doublyList, addNew]);

  const addToTail = useCallback(() => {
    const value = inputRef.current!.value;
    if (value === '') return;
    const currentLastNode = doublyList.length > 0 ? doublyList[doublyList.length - 1] : null;
    const newNode = Node(value, null, currentLastNode);
    if (currentLastNode) {
      currentLastNode.next = newNode;
    }
    addNew();
    setDoublyList([...doublyList, newNode]);
    inputRef.current!.value = '';
  }, [doublyList, addNew])

  const removeFromHead = useCallback(() => {
    if (doublyList.length <= 0) return;
    if (doublyList.length === 1) {
      setRemoved(doublyList[0]);
      clearList();
      return;
    }
    const removedNode = doublyList[0];
    doublyList[1].prev = null;
    setDoublyList(doublyList.slice(1));
    if (removedNode) {
      setRemovedNode(removedNode);
    }
  }, [doublyList])

  const removeFromTail = useCallback(() => {
    if (doublyList.length <= 0) return;
    if (doublyList.length === 1) {
      setRemovedNode(doublyList[0]);
      clearList();
      return;
    }
    const newLastNode = doublyList[doublyList.length - 2];
    newLastNode.next = null;
    const removedNode = doublyList[doublyList.length - 1];
    setDoublyList(doublyList.slice(0, doublyList.length - 1));
    if (removedNode) {
      setRemovedNode(removedNode);
    }
  }, [doublyList])

  const insertAt = (index: number) => {
    if (!insert || doublyList.length <= 0) return;
    const value = inputRef.current!.value;
    if (value === '') {
      alert('Fill in a value to insert first!');
      return;
    }
    addNew();
    const currentNode = doublyList[index];
    const nextNode = currentNode.next;
    const newNode = Node(value, nextNode, currentNode);
    currentNode.next = newNode;
    if (nextNode) {
      nextNode.prev = newNode;
    }
    const newList = [];
    let firstNode = doublyList[0];
    while (firstNode) {
      newList.push(firstNode);
      firstNode = firstNode.next!;
    }
    setDoublyList(newList);
    setInsert(false);
    inputRef.current!.value = '';
  }

  const clearList = () => {
    setDoublyList([]);
  }

  useEffect(() => {
    setListSize(doublyList.length);
  }, [doublyList, listSize, addToHead, addToTail, removeFromHead, removeFromTail])

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <Title title="Visualizing Doubly Linked List!" />
      <HorizontalDataWrapper>
        <AnimatePresence>
          {doublyList.length > 0 && <div key={'head-null'} className="aspect-square w-[60px] flex justify-center items-center border border-black">null</div>}
            {
              doublyList.map((node, index) => {
                return (
                  <Fragment key={`${node.value}+${index}`} >
                    <LinkedListContainer node={node} index={index} listSize={listSize} insertAt={insertAt}  type="doubly"/>
                  </Fragment>
                )
              })
            }
          {doublyList.length > 0 && <div key={'tail-null'} className="aspect-square w-[60px] flex justify-center items-center border border-black">null</div>}
        </AnimatePresence>
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
          <RemoveButton remove={removeFromTail} type="Tail" />
          <ClearButton clear={clearList} />
        </div>
      </Controller>
    </div>
  )
}

export default DoublyLinkedList;