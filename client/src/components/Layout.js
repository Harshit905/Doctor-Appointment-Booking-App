import React, { useState } from 'react';
import "../Layout.css"
import hospitalpng from "../assets/hospitalpng.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Badge } from 'antd';
const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user)
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
        }
    ]

    const adminMenu = [
        {
            name: "Home",
            path: "/",
            icon: "fa-solid fa-house-user"
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: "fa-solid fa-hospital-user"
        },
        {
            name: "Doctors",
            path: "/admin/doctors",
            icon: "fa-solid fa-user-doctor"
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "fa-solid fa-user"
        }
    ]

    const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
    return (
        <div className="main">
            <div className='d-flex layout'>
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h1 className='logo'><img src={hospitalpng} width={40} alt="logo" /></h1>
                    </div>
                    <div className="menu">
                        {
                            menuToBeRendered.map((menu) => {
                                const isActive = location.pathname === menu.path;
                                return <div key={menu.path} className={`d-flex menu-item ${isActive && `active-menu-item`}`}>
                                    <Link to={menu.path}><i className={menu.icon}></i></Link>
                                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                </div>
                            })
                        }
                        <div className={`d-flex menu-item`} onClick={() => {
                            localStorage.clear();
                            navigate("/login")
                        }}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            {!collapsed && <Link to="/login">Logout</Link>}
                        </div>
                    </div>

                </div>
                <div className="content">
                    <div className="header">
                        {collapsed ? <i className="fa-solid fa-bars icon-close" onClick={() => setCollapsed(false)}></i> : <i className="fa-solid fa-xmark icon-close" onClick={() => setCollapsed(true)}></i>}
                        <div className="d-flex align-items-center px-4">
                            <Badge count={user?.unseenNotifications.length} onClick={()=>navigate("/notifications")}>
                            <i className="fa-regular fa-bell icon-notification"></i>
                            </Badge>
                           
                            <Link to="/profile" className="anchor mx-3">{user?.name}</Link>
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
