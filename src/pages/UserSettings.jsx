import React, { useState, useEffect } from 'react';
import Navbar from '../templates/Navbar';
import { auth, DB } from '../firebase';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { Input, Typography } from '@material-tailwind/react';
import { message } from 'antd';
import phil from 'phil-reg-prov-mun-brgy';

export default function UserSettings() {
    const [newDisplayName, setNewDisplayName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);
    const [lastDisplayNameChangeTime, setLastDisplayNameChangeTime] = useState(0);
    const [barangays, setBarangays] = useState([]);
    const [selectedBarangay, setSelectedBarangay] = useState("Select a Barangay"); // Set default value to "Select a Barangay"

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                loadLastDisplayNameChangeTime(user.uid);
            }
        });

        const fetchBarangays = async () => {
            try {
                const barangayList = phil.getBarangayByMun("097332");
                setBarangays(barangayList);
            } catch (error) {
                console.error('Error fetching barangays:', error);
            }
        };

        fetchBarangays();

        return () => unsubscribe();
    }, []);

    const loadLastDisplayNameChangeTime = async (userId) => {
        try {
            const docRef = doc(DB, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.lastDisplayNameChangeTime) {
                    setLastDisplayNameChangeTime(data.lastDisplayNameChangeTime);
                }
            }
        } catch (error) {
            console.error('Error loading last display name change time:', error);
        }
    };

    const handleSubmit = async () => {
        if (!user) {
            console.error('No user is currently signed in or user object is not properly initialized');
            setErrorMessage('No user is currently signed in or user object is not properly initialized');
            return;
        }

        // Check if any input fields (except the select box) have values
        if (newDisplayName !== "" || selectedBarangay !== "Select a Barangay") {
            // Fetch existing user data from the database
            let existingUserData;
            try {
                const docRef = doc(DB, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    existingUserData = docSnap.data();
                }
            } catch (error) {
                console.error('Error fetching existing user data:', error);
                setErrorMessage('Error fetching existing user data');
                return;
            }

            // Merge existing user data with new data to be saved
            const userData = {
                uid: user.uid,
                ...existingUserData // Merge existing user data
            };

            // Update new data only if the values are not empty
            if (newDisplayName !== "") {
                userData.username = newDisplayName;
            }

            if (selectedBarangay !== "Select a Barangay") {
                userData.barangay = selectedBarangay;
            }

            try {
                // Save merged user data to the database
                await setDoc(doc(DB, "users", user.uid), userData);

                message.success('Values saved successfully.');
                setNewDisplayName('');
                setSelectedBarangay('Select a Barangay');

                // Update the last display name change time only if the display name is changed
                if (newDisplayName !== "") {
                    const currentTime = Date.now();
                    setLastDisplayNameChangeTime(currentTime);
                    await setDoc(doc(DB, "users", user.uid), { lastDisplayNameChangeTime: currentTime }, { merge: true });
                }
            } catch (error) {
                console.error('Error saving values to the database:', error);
                setErrorMessage('Error saving values to the database');
            }
        } else {
            // Display an error message if no input fields have values
            message.error('Please enter at least one value to save.');
        }
    };



    return (
        <div className="flex flex-col justify-start items-center">
    <Navbar />
    <div className="flex flex-col justify-center pt-20 p-4 bg-white gap-4">
      <h1 className='font-Roboto font-semibold text-xl text-center'>Settings</h1>
      <div className="p-4">
        <Input variant="outlined" label="Change Username" placeholder="Outlined" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} />
      </div>

      <div className="p-4">
        <input
          type="tel"
          id="phone-input"
          className="placeholder-blue-gray-500 w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  empty:!bg-gray-200 focus:border-2  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          pattern="[0-9]{11}"
          maxLength="11"
          placeholder="09975342236"
        />
        <label htmlFor="phone-input" className="text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">Phone number</label>
      </div>

      <div className="p-4">
        <select
          className="w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  empty:!bg-gray-900 focus:border-2  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          value={selectedBarangay}
          onChange={(e) => setSelectedBarangay(e.target.value)}
        >
          <option disabled>Select a Barangay</option>
          {barangays.map(barangay => (
            <option key={barangay.code} value={barangay.name}>{barangay.name}</option>
          ))}
        </select>
      </div>

      <div className="p-4">
        <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Changes</button>
      </div>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
    </div>
  </div>
);
}
