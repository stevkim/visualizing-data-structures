import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

const HorizontalDataWrapper = ({ children }: Props) => {
  return (
    <div className="w-full h-[20rem] border border-black flex justify-center items-center p-4 overflow-hidden">
    <div className="flex flex-row gap-4 relative">
      {children}
    </div>
    </div>
  )
}

export default HorizontalDataWrapper;