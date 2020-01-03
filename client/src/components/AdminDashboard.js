import React from 'react';
import { getUserInStorage } from '../utils/localStorage';

const AdminDashboard = () => {

    const { _id, name, email, role } = getUserInStorage();


    return (
        <section>
            <p>{_id}</p>
            <p>{name}</p>
            <p>{email}</p>
            <p>{role}</p>
        </section>
    );
};


export default AdminDashboard;