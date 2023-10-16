import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Stack from './pages/Stack.tsx'
import Queue from './pages/Queue.tsx'
import DoublyLinkedList from './pages/DoublyLinkedList.tsx'
import SinglyLinkedList from './pages/SinglyLinkedList.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
        path:'/stack',
        element: <Stack />
      },
      {
        path:'/queue',
        element: <Queue />
      },
      {
        path:'/singly-linked-list',
        element: <SinglyLinkedList />
      },
      {
        path: '/doubly-linked-list',
        element: <DoublyLinkedList />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
