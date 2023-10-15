import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const VerticalDataWrapper = ({ children }: Props) => {
  return (
    <section className="border border-black h-[30rem] w-[25rem] relative overflow-hidden">
      <div className="absolute bottom-0 w-full">
        <div className="items-center flex flex-col-reverse relative">
          { children }
        </div>
      </div>
    </section>
  )
}

export default VerticalDataWrapper;