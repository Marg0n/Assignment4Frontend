//import React from 'react';
import Home from '../../pages/home/Home';
import Footer from '../../components/shared/Footer';
import ResponsiveNavbar from '@/components/home/ResponsiveNavbar';
const HomeLayout = () => {
    return (
        <div className='w-full space-y-16'>
            <ResponsiveNavbar />
            <Home/>
            <Footer/>
        </div>
    );
};

export default HomeLayout;