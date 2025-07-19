import React from 'react'

export const Navbar = () => {
    const links = [
        {
            title: "Guide",
            href: "#"
        },
        {
            title: "Pricing",
            href: "#"
        },
        {
            title: "login",
            href:"#"
        }
    ]

    return <div className='navbar-root'>
        <div className='logo'>Finlet</div>
        <div className='links'>
            {links.map((link, idx) => <a className='link-items' key={link.title} href={link.href}>{link.title}</a>)}
        </div>
        <div>
            <button className='btn'>Login</button>
        </div>
    </div>
}