import React from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../config/firebaseAuth';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, removeUserData } from '../Utils/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignIn = ({toggleSignUp}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.authSlice?.userData);

    const handleAuth = async () => {
        try {
            const data = await signInWithPopup(auth, provider);
    
            console.log('Raw data from signInWithPopup:', data);
            console.dir(data);
    
            if (data?.user) {
                // Destructure `reloadUrl` along with other user properties
                const { displayName, photoURL, email, reloadUrl } = data.user;
    
                // Use `reloadUrl` if it exists, otherwise fallback to `photoURL`
                const userPhoto = reloadUrl || photoURL;
    
                const userData = {
                    name: displayName,
                    photo: userPhoto,
                    email: email,
                };
                console.log('User data to be dispatched:', userData);
    
                dispatch(addUserData(userData));
                toast.success(`Welcome ${userData.name}!`);
                navigate('/');
                dispatch(toggleSignUp());
            } else {
                console.error('No user data received from Firebase.');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            // toast.error('Sign-in failed. Please try again.');
        }
    };
    
    

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(removeUserData());
            setTimeout(() => {
                navigate("/")
             toggleSignUp()   
             toast.info('You have logged out.');
            }, 1000);
            // toggleSignUp()
        } catch (error) {
            console.error('Error during sign-out:', error);
        }
    };

    return (
        <div className='text-center mt-6'>
            {userData ? (
                <button onClick={()=>{
                    handleLogout()
                    // toggleSignUp()
                    // navigate("/")
                }}
                    className='w-full font-semibold capitalize p-[14px] bg-[#DD904A] text-xl text-white'
                >
                    Log Out
                </button>
            ) : (
                <button
                    onClick={()=>{

                        handleAuth()
                        // toggleSignUp()
                    }
                }
                    className='w-full font-semibold capitalize p-[14px] bg-[#FF5200] text-xl text-white'
                >
                    Sign up with Google
                </button>
            )}
        </div>
    );
};

export default SignIn;
