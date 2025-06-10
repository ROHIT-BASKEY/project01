import logo from "./logo.svg"
import menu from "./menu.svg"
import search from "./search_icon.svg"
import logo_full from "./logo1.svg"
import profile from "./profile.jpg"
import arrow from "./arrow-right.svg"
import info from "./info.svg"
import gallery from "./gallery.svg"
import send_icon from "./send_button.svg"
import profile_icon from "./profile.png"
import angle_left from "./angles-left.svg"
const assets = {
    logo,
    logo_img,
    menu,
    search,
    profile,
    arrow,
    info,
    gallery,
    send_icon,
    profile_icon,
    angle_left,
    users: [
        { id: 1, name: "Rohit Sharma", avatar: "./avatar1.png" },
        { id: 2, name: "Aisha Patel", avatar: "./avatar2.png" },
        { id: 3, name: "Jay Verma", avatar: "./avatar3.png" },
        { id: 4, name: "Neha Gupta", avatar: "./avatar4.png" },
        { id: 5, name: "Karan Mehta", avatar: "./avatar5.png" }
    ],
     message: [
    {
      senderId: '680f43r53f34r4f', // current user
      text: 'Hey there! How are you?',
      image: '',
      createdAt: '10:30 AM',
    },
    {
      senderId: 'user_12345',
      text: 'I’m good, thanks! What about you?',
      image: '',
      createdAt: '10:32 AM',
    },
    {
      senderId: '680f43r53f34r4f',
      text: 'flknsl',
      image: '/path/to/image1.jpg',
      createdAt: '10:35 AM',
    },
    {
      senderId: 'user_12345',
      text: 'Check this out!',
      image: '',
      createdAt: '10:36 AM',
    },
    {
      senderId: 'user_12345',
      text: 'lkmsdf',
      image: '/path/to/image2.jpg',
      createdAt: '10:37 AM',
    },
    {
      senderId: '680f43r53f34r4f',
      text: 'Looks great!',
      image: '',
      createdAt: '10:38 AM',
    }
  ]
}
export default assets ;