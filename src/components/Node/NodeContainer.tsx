import { motion } from 'framer-motion';
import { NodeObject } from './Node';

interface Props {
  node: NodeObject;
  index: number;
  type: string;
}

const NodeContainer = ({ node, index, type }:Props) => {
  const Stacks = {
    enter: {opacity: 0, translateX:-200},
    visible: {opacity: 1,translateX: 0},
    exit: {opacity: 0, translateX: 200 }
  }

  const Queue = {
    enter: {opacity: 0, translateX: 0, translateY: -200},
    visible: {opacity: 1, translateX: 0, translateY: 0},
    exit: {opacity: 0, translateX: 200, position: 'absolute'}
  }

  return (
      <motion.div
        key={`${node} + ${index}`}
        className={`w-[150px] h-[40px] flex justify-center items-center relative ${node.lastAdded ? 'border-2 border-red-400' : ' border border-black'}`}
        variants={type === 'stack' ? Stacks : Queue}
        initial="enter"
        animate="visible"
        exit="exit"
        transition={{ type:'ease-in', stiffness: 100  }}
      >
        <span className='absolute left-1 bg-white'>{index + 1} : </span>{node.value}
      </motion.div>
  )
}

export default NodeContainer;