import React, { useContext, useEffect, useRef, useState } from 'react';
import assets from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessage } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const scrollEnd = useRef();
  const [input, setInput] = useState('');

  // handle sending a text message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage({ text: input.trim() });
    setInput('');
  };


  // handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error("Select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessage(selectedUser._id);
    }
  }, [selectedUser, getMessage]);

useEffect(() => {
  if (scrollEnd.current && Array.isArray(messages) && messages.length > 0) {
    scrollEnd.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  return selectedUser ? (
    <div className='h-full overflow-hidden relative backdrop-blur-lg flex flex-col'>
      
      {/* Header */}
      <div className='flex items-center gap-3 py-3 px-4 border-b border-stone-500'>
        <img
          src={selectedUser.profilePic || assets.profile_icon}
          alt='profile'
          className='w-8 rounded-full'
        />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow}
          alt='back'
          className=' w-5 cursor-pointer'
        />
        
      </div>

      {/* Messages */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messages.map((msg) => (
          <div key={msg._id || msg.createdAt} className={`flex gap-2 items-end justify-end ${msg.senderId !== authUser._id ? 'flex-row-reverse' : ''}`}>
            {msg.image ? (
              <img
                src={msg.image}
                alt='sent'
                className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'
              />
            ) : (
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all  bg-gradient-to-r from-green-400 via-green-500 to-green-600  text-white ${msg.senderId === authUser._id ? "rounded-br-none" : "rounded-bl-none"}`}>
                {msg.text}
              </p>
            )}
            <div className='text-center text-xs'>
              <img
                src={msg.senderId === authUser._id ? authUser?.profilePic || assets.profile_icon : selectedUser?.profilePic || assets.profile_icon}
                alt='avatar'
                className='w-6 h-6 rounded-full'
              />
              <p className='text-white'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input */}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-black/30'>
        <div className='flex-1 flex items-center bg-gray-100/10 px-3 rounded-full'>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)}
            type='text'
            placeholder='Send a message'
            className='flex-1 text-sm p-3 border-none bg-transparent rounded-lg outline-none text-white placeholder-gray-400'
          />
          <input
            onChange={handleSendImage}
            type='file'
            id='image'
            accept='image/png, image/jpeg'
            hidden
          />
          <label htmlFor='image'>
            <img src={assets.gallery} alt='upload' className='w-5 mr-2 cursor-pointer' />
          </label>
        </div>
        <img
          onClick={handleSendMessage}
          src={assets.send_icon}
          alt='send'
          className='w-7 cursor-pointer'
        />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <p className='text-5xl'>Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
