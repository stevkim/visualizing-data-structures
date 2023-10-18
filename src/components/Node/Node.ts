export interface NodeObject {
  value: string | number;
  lastAdded: boolean;
  next?: NodeObject | null;
  prev?: NodeObject | null;
  id: number;
}


export const Node = (value: string | number, id: number, next?: NodeObject | null, prev?: NodeObject | null) => {
  const node:NodeObject = {
    value: value,
    lastAdded: true,
    id: id,
  }
  if (next) {
    node.next = next;
  }
  if (prev) {
    node.prev = prev;
  }
  return node;
}