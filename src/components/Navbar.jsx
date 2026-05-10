import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className='flex justify-between py-3 px-5'>
            <ul className='flex gap-4'>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/destinations">Destinations</Link></li>
                <li><Link href="/my-bookings">My Bookings</Link></li>
                <li><Link href="/add-destination">Add Destination</Link></li>
            </ul>

            <div className='absolute top-3 left-1/2 -translate-x-1/2'>
                <Link href={'/'}>
                    <Image src={'/assets/Wanderlast.png'} width={162} height={24} alt='wanderlust logo' />                
                </Link>
            </div>
            <ul className='flex gap-4'>
                <li><Link href="/profile">Profile</Link></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/signup">Sign Up</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;