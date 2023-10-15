interface IAddProps {
  add(): void;
  type: string;
}

export const AddButton = ({add, type}:IAddProps) => {
  return (
    <button className="border border-black bg-green-400 p-1 max-h-[40px]" onClick={add}>Add to {type}</button>
  )
}

interface IRemoveProps {
  remove(): void;
  type: string;
}

export const RemoveButton = ({ remove, type }:IRemoveProps) => {
  return (
    <button className="border border-black bg-red-400 p-1 max-h-[40px]" onClick={remove}>Remove from {type}</button>
  )
}

interface IClearProps {
  clear(): void;
}

export const ClearButton = ({ clear }:IClearProps) => {
  return (
    <button className="border border-black p-1 max-h-[40px] min-w-[80px]" onClick={clear}>Clear</button>
  )
}