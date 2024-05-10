/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { ChevronFirst, ChevronLast, Trash2, User } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import { DragAndDrop } from './DragAndDrop';
import { GoSignOut } from 'react-icons/go';
import { toast } from 'sonner';

const SideBarContext = createContext();

export const SideBar = ({ children, activeSideBar, setSignal, signal }) => {
    const [expanded, setExpanded] = useState(true);
    const auth = getAuth();
    const user = getAuth().currentUser;

    return (
        <div className="z-20">
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-[#11141ba8] px-2 shadow-sm">

                    <div className={`p-4 pb-2 flex justify-between items-center relative transition-none ${!expanded && "mt-5 mb-5"} `}>
                        <img src={logo} className={`overflow-hidden transition-all mt-2 ${expanded ? "w-32" : "w-0"}`} />

                        <button onClick={() => setExpanded((curr) => !curr)} className={`p-1.5 rounded-lg bg-[#212121] hover:bg-[#2c2c2c] text-gray-200 absolute right-2 w-10`}>
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <SideBarContext.Provider value={{ expanded }} className="h-full">
                        <ul className={`flex flex-col ${activeSideBar == 0 && 'flex-1'}`}>{children}</ul>

                        {activeSideBar == 1 && (
                            <>
                                {expanded && (
                                    <div className='h-full'>
                                        <DragAndDrop styles={`h-full w-[275px]`} setSignal={setSignal} signal={signal} />
                                    </div>
                                )}
                            </>
                        )}
                    </SideBarContext.Provider>

                    <div className='flex p-3'>
                        <User className='w-8 h-8 rounded-md' color='white' />
                        <div className={`flex justify-between items-center overflow-hidden ${expanded ? "w-52 ml-3" : "w-0"}`}>
                            <div className='leading-4'>
                                <p className='font-semibold text-gray-200'>User:</p>
                                <span className='text-xs text-gray-400'>
                                    {user.email}
                                </span>
                            </div>
                            <GoSignOut onClick={() => signOut(auth)} size={20} color='white' className='cursor-pointer' />

                        </div>
                    </div>

                </nav>
            </aside>
        </div>
    )
}

export default SideBar;


export function SideBarElement({ icon, text, active, alert, onClick, canDelete = false, onDeleteClick }) {
    const { expanded } = useContext(SideBarContext);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (onDeleteClick) {
            onDeleteClick();
            toast.success('File deleted succesfully');
        }
    };

    return (
        <li className={`relative h-11 flex items-center justify-center py-2 px-3 my-1 hover:bg-[#212121] cursor-pointer text-white rounded-md font-medium transition-all group ${active && 'bg-[#212121]'}`} onClick={onClick}>
            {icon}
            <span className={` overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 h-2 w-2 bg-white rounded ${expanded ? "" : "top-2"} `}></div>
            )}
            {canDelete && (
                <div onClick={handleDeleteClick}>
                    {expanded && <Trash2 size={20} color='white' className='cursor-pointer' />}
                </div>
            )}
            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-[#212121] text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    )
}

