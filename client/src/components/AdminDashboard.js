import React from 'react';
import { getUserInStorage } from '../utils/localStorage';

const AdminDashboard = () => {

    const { _id, name, email, role } = getUserInStorage();


    return (
        <section>

        </section>
    );
};


export default AdminDashboard;