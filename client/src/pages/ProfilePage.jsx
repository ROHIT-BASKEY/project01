import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { authUser, updateProfile, setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const avatarPreview = selectedImage
    ? URL.createObjectURL(selectedImage)
    : authUser?.profilePic || assets.profile_icon;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedImage) {
        await updateProfile({ fullName: name, bio });
        setAuthUser((prev) => ({ ...prev, fullName: name, bio }));
        navigate('/');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);
        reader.onload = async () => {
          const base64Image = reader.result;
          await updateProfile({ profilePic: base64Image, fullName: name, bio });

          setAuthUser((prev) => ({
            ...prev,
            profilePic: base64Image,
            fullName: name,
            bio,
          }));

          navigate('/');
        };
      }
    } catch (err) {
      console.error("Profile update failed:", err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-cover bg-no-repeat items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-lg">Profile Details</h3>

          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
            />
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            Upload profile image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            className="p-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
            rows={4}
          />

          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
          >
            Save
          </button>
        </form>

        <img
          className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 object-cover"
          src={avatarPreview}
          alt="Profile Preview"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
