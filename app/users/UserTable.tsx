import Link from 'next/link';
import React from 'react'
import { sort } from  'fast-sort'

interface User {
    id: number;
    name: string;
    email: string;
}
interface Props {
    sortOrder : string
}

const UserTable = async ({sortOrder} : Props) => {
     const res = await fetch('https://jsonplaceholder.typicode.com/users' 
    , { next: {revalidate:10} }); //retrive data frlom api every 10 sec
    const  users : User[] = await res.json();

    const sortedUsers = sort(users).asc(sortOrder === "Email" ? (user) => user.email : (user) =>user.name)
  return (
    <table className='table'>
        <thead>
            <th><Link href="/users?sortOrder=Name">Name</Link></th>
            <th><Link href="/users?sortOrder=Email">Email</Link></th>
        </thead>
        <tbody>
            {sortedUsers.map(user => <tr key={user.id}>
                <td>{user.name}</td><td>{user.email}</td></tr>)}
        </tbody>
   </table>
  )
}

export default UserTable
