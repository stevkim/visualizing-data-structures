export interface NodeObject {
  value: string | number;
  lastAdded: boolean;
  next?: NodeObject | null;
  prev?: NodeObject | null;
}


export const Node = (value: string | number, next?: NodeObject | null, prev?: NodeObject | null) => {
  const node:NodeObject = {
    value: value,
    lastAdded: true,
  }
  if (next) {
    node.next = next;
  }
  if (prev) {
    node.prev = prev;
  }
  return node;
}