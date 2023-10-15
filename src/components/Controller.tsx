import { ReactNode } from "react";

interface Props {
  children: ReactNode
  type?: string;
}

const Controller = ({ children, type }: Props) => {
  return (
    <div className={`w-1/2 h-[10rem] ${type === 'small' ? 'h-[8rem]' : ''} max-w-[1920px] border border-black fixed bottom-0 p-2 flex flex-col gap-4`}>
      <h2 className="text-2xl text-center w-full">Controller</h2>
      {children}
    </div>
  )
}

export default Controller;