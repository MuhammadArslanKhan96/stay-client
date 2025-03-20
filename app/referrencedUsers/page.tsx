// app/dashboard/referenced-users/page.tsx
'use client';
import { useEffect, useState } from 'react';

interface User{
    id: string;
    email: string;
    username: string;
    createdAt: string;
    referencedBy: string;
}

export default function ReferencedUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch referenced users from the API
    async function fetchReferencedUsers() {
      try {
        const store:any = localStorage.getItem('dynamic_store');
        const storeJson = JSON.parse(store);
        const email = storeJson?.state?.user?.email;
        if(!email){
          alert("Please login");
          return;
        }

        const user:any = JSON.parse(localStorage.getItem('dbuser') as any);
        const userId = user?.id;
        const response = await fetch(`/api/user/referrals?userId=${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch referenced users');
        }
        const data = await response.json();
        console.log('Data--- ', data, " : user ID", userId);
        setUsers(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchReferencedUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading referenced users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h4 className="mb-4 mt-2">Referenced Users</h4>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}