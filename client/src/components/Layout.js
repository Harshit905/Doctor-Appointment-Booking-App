import React, { useState } from 'react';
import "../Layout.css"
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
const Layout = ({ children }) => {
    const location = useLocation();
    const user = useSelector((state) => state.user)
    const [collapsed, setCollapsed] = useState(false)
    const userMenu = [
        {
            name: "Home",
            path: "/",
            icon: "fa-solid fa-house-user"
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: 'fa-solid fa-calendar-check'
        },
        {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: "fa-solid fa-stethoscope"
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "fa-solid fa-user"
        },
        {
            name: 'Logout',
            path: '/logout',
            icon: "fa-solid fa-arrow-right-from-bracket"
        }
    ]

    const menuToBeRendered = userMenu;
    return (
        <div className="main">
            <div className='d-flex layout'>
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h1>SH</h1>
                    </div>
                    <div className="menu">
                        {
                            menuToBeRendered.map((menu) => {
                                const isActive = location.pathname === menu.path;
                                return <div key={menu.path} className={`d-flex menu-item ${isActive && `active-menu-item`}`}>
                                    <i className={menu.icon}></i>
                                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                </div>
                            })
                        }
                    </div>

                </div>
                <div className="content">
                    <div className="header">
                        {collapsed ? <i className="fa-solid fa-bars icon-close" onClick={() => setCollapsed(false)}></i> : <i className="fa-solid fa-xmark icon-close" onClick={() => setCollapsed(true)}></i>}
                        <div className="d-flex">
                            <i className="fa-regular fa-bell icon-notification"></i>
                                    <Link to="profile" className="anchor">{user?.name}</Link>
                        </div>
                    </div>
                    <div className="body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
