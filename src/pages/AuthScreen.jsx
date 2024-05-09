import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigate('/dashboard');
            }
        });
        return () => unsubscribe();

    }, [auth, navigate]);

    const handleAuthAction = async (event) => {
        event.preventDefault();
        setError('');

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    return (
        <div className="bg-[#111827] flex h-[100vh] w-full items-center justify-center text-gray-100"
        >
            {/* #111827 */}
            {/* <div className="absolute inset-0 overflow-hidden">
                <div className="jumbo absolute -inset-[10px] opacity-50"></div>
            </div> */}

            <div className="blur-[80px] translate-x-[-50%] w-[1102px] z-10 left-[50%] top-0 bottom-0 absolute overflow-hidden">
                <div className="one" />
                <div className="two" />
                <div className="three" />
                <div className="four" />
                <div className="five" />
                <div className="six" />
            </div>

            <div className=' translate-x-[-50%] w-[1102px] z-10 left-[50%] top-0 bottom-0 absolute pointer-events-none'>
                <div className='lineLeftOne' />
                <div className='lineLeftTwo' />
                <div className='lineRightOne' />
                <div className='lineRightTwo' />
            </div>
            <div className="border-[#f0f8ff] absolute w-full border-b-[1px] top-[100px] pb-[1.5rem] opacity-10" />
            <div className="border-[#f0f8ff] absolute w-full border-b-[1px] top-[450px] pb-[1.5rem] opacity-10" />
            <div className="border-[#f0f8ff] absolute w-full border-b-[1px] top-[750px] pb-[1.5rem] opacity-10" />

            <div className="relative ">

                <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-500/30 backdrop-blur-2xl z-10 shadow-2xl px-4 border-[1px]">
                    <div className="flex-auto p-6">

                        <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                            <h1 className="flex items-center gap-2 text-white no-underline">
                                <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100">WattCheck</span>
                            </h1>
                        </div>

                        <h4 className="mb-2 font-medium text-gray-100 xl:text-xl font-sans">Welcome to WattCheck!</h4>
                        <p className="mb-6 text-gray-300 font-sans">Please sign-in to access your account</p>

                        <form onSubmit={handleAuthAction} className="mb-4">
                            <div className="mb-4">
                                <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-100">Email</label>
                                <input
                                    type="email"
                                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:shadow"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between">
                                    <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-100" >Password</label>
                                </div>
                                <div className="relative flex w-full flex-wrap items-stretch">
                                    <input
                                        type="password"
                                        className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500  focus:shadow"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}

                            <div className="mb-4">
                                <button className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                </button>
                            </div>
                        </form>

                        <p className="mb-4 text-center flex items-center">
                            <p className='min-w-[200px]'>
                                {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
                            </p>
                            <button onClick={toggleAuthMode} className="text-center mb-2 justify-center cursor-pointer text-indigo-500 no-underline font-bold outline-none" style={{ background: 'none', border: 'none', padding: 0 }}>
                                {isLogin ? 'Create an account' : 'Login here'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;