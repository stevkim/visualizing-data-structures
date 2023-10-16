import { Outlet, Link } from "react-router-dom";

function App() {
  const Links = [
    {
      name: 'Stack',
      link: '/stack',
    },
    {
      name: 'Queue',
      link: '/queue'
    },
    {
      name: 'Singly Linked List',
      link: '/singly-linked-list'
    },
    {
      name: 'Doubly Linked List',
      link: '/doubly-linked-list'
    }
  ];

  return (
    <div className="w-full max-w-[1920px] h-full flex flex-col justify-center items-center mx-auto p-2">
      <header className="w-full h-[50px] flex">
        <div>Visualizing Data Structures</div>
        <div className="flex flex-row gap-4 ml-auto mr-4">
          {
            Links.map((link) => {
              return (
                <Link key={link.name} className="p-2" to={link.link}>{link.name}</Link>
              )
            })
          }
        </div>
      </header>
      <section className="w-full h-full text-center">
        <Outlet />
      </section>
    </div>
  )
}

export default App
