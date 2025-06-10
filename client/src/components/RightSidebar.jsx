import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = () => {
  const { selectedUser, messages = [] } = useContext(ChatContext); // default to [] to prevent crash
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  // Extract all images from messages
  useEffect(() => {
    const images = Array.isArray(messages)
      ? messages.filter((msg) => msg.image).map((msg) => msg.image)
      : [];
    setMsgImages(images);
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="bg-[#162456]/10 text-white relative overflow-y-scroll max-md:hidden">
      {/* User Profile */}
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img
          src={selectedUser.profilePic || assets.profile_icon}
          alt={`${selectedUser.fullName}'s profile`}
          className="w-20 aspect-square rounded-full"
        />
        <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500" />
          )}
          {selectedUser.fullName}
        </h1>
        <p className="px-10 mx-auto">{selectedUser.bio || "No bio available."}</p>
      </div>

      <hr className="border-[#ffffff50] my-4" />

      {/* Media Gallery */}
      <div className="ps-5 text-xs">
        <p>Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80 pr-4">
          {msgImages.map((url, index) => (
            <div
              key={index}
              onClick={() => window.open(url, '_blank')}
              className="cursor-pointer rounded"
            >
              <img
                src={url}
                alt={`Shared media ${index + 1}`}
                className="h-full rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default RightSidebar;
