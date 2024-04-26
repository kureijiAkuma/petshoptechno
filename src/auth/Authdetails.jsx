import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, DB } from "../firebase";
import { getDoc, doc } from "firebase/firestore"; // Import getDoc and doc
import userdefault from "../icons/user.svg";
import { useNavigate, NavLink } from "react-router-dom";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
} from "@material-tailwind/react";

import { message } from "antd";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const [username, setUsername] = useState("");

    const history = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                fetchUsername(user.uid);
            } else {
                setAuthUser(null);
                setUsername("");
            }
        });

        return () => {
            listen();
        };
    }, []);

    const fetchUsername = async (uid) => {
        try {
            const userDoc = await getDoc(doc(DB, "users", uid));
            if (userDoc.exists()) {
                setUsername(userDoc.data().username);
            } else {
                setUsername("");
            }
        } catch (error) {
            console.error("Error fetching username:", error);
            setUsername("");
        }
    };

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                localStorage.clear();
                history("/");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            {authUser ? (
                <Menu>
                    <MenuHandler>
                        <div className="flex justify-center items-center cursor-pointer">
                            <h1 className="pl-1 pt-1 pr-2 font-Roboto font text-black">{username}</h1>
                            <img className="p-1 size-9" src={userdefault} alt="" />
                        </div>
                    </MenuHandler>
                    <MenuList>
                        {authUser.email === "admin@gmail.com" ? (
                            <MenuItem className="hover:bg-gray-500">
                                <NavLink to="/adminsettings">Admin Settings</NavLink>
                            </MenuItem>
                        ) : (
                            ""
                        )}
                        <MenuItem>
                            <NavLink to="/settings">Settings</NavLink>
                        </MenuItem>
                        <MenuItem className="hover:bg-gray-500" onClick={userSignOut}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            ) : (
                <NavLink to="/signin" className="h-fit flex items-center px-2 hover:bg-red-100 rounded-3xl">
                    <h1 className="pl-1 pt-1 pr-2 font-Roboto font text-black">Login</h1>
                    <img className="p-1 size-9" src={userdefault} alt="" />
                </NavLink>
            )}
        </div>
    );
};

export default AuthDetails;
