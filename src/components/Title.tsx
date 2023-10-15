
interface Props {
  title: string;
}

const Title = ({ title }: Props) => {

  return (
    <>
      <h1 className="text-4xl my-2">{title}</h1>
    </>
  );
}

export default Title;