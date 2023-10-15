import { motion } from 'framer-motion';
import { NodeObject } from './Node';

interface Props {
  node: NodeObject;
  index: number;
  insertAt(index: number) : void;
  listSize: number;
}

const LinkedListContainer = ({ node, index, insertAt, listSize}: Props) => {
  return (
    <motion.div
      key={`${node} + ${index}`}
      className={`flex flex-row relative h-[60px] cursor-pointer ${node.lastAdded ? 'border-2 border-red-400' : ''}`}
      initial={{ opacity: 0, translateX: -200}}
      animate={{ opacity: 1, translateX: 0}}
      exit={{ opacity: 0, translateX: 200 }}
      transition={{ type: 'ease-in' }}
      onClick={() => insertAt(index)}
    >
      {index === 0 && index === listSize - 1
        ? (<><span className='absolute top-[-20px] left-[5px] text-green-400'>Head</span><span className='absolute bottom-[-20px] right-[5px] text-red-400'>Tail</span></>)
        : index === 0
        ? <span className='absolute top-[-20px] left-[5px] text-green-400'>Head</span>
        : index === listSize - 1
        ? <span className='absolute bottom-[-20px] right-[5px] text-red-400'>Tail</span>
        : <></>
      }
      <div className='aspect-square w-[60px] border border-black flex justify-center items-center overflow-hidden'>
        {node.value}
      </div>
      <div className='aspect-square w-[60px] border border-black flex justify-center items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </div>
    </motion.div>
  )
}

export default LinkedListContainer ;