import React, { useEffect, useState } from 'react';
import AxiosInstance from '../http/AxiosInstance';

const Dashboard = () => {
  const [alluser, setAlluser] = useState([]);
  const [error, setError] = useState(null);
  const [singleuser, setsingleuser] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const response = await AxiosInstance.get('/home', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.status === true) {
          setAlluser(response.data.user);
          setsingleuser(response.data.singleuser)
          console.log(singleuser);

        } else {
          setError('Failed to fetch users');
        }

      } catch (error) {
        console.error(error);
        setError('Error fetching user data');
      }
    };

    getData();
  }, []);

  return (
    <>
      {singleuser ? (<div className='text-right mr-32 mb-4'>
        <p>You are logged in as: {singleuser.name}</p>
        <p>Your email is: {singleuser.email}</p>
      </div>
      )
        : (
          <div>
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
          </div>)
      }




      <div className="overflow-x-auto w-1/2 m-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Number</th>
            </tr>
          </thead>
          {alluser.length > 0 ? (
            alluser.map((user, index) => (<tbody>
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.id}</td>
              </tr>
            </tbody>))
          ) : (<div className='flex flex-row justify-center items-center'>
            <span className="loading loading-spinner loading-xs text-center"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
          </div>)}
        </table>
      </div>
    </>
  );
};

export default Dashboard;
