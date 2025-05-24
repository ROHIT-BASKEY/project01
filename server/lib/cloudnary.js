import {v2 as cloudnary} from "cloudinary"

cloudnary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret :process.env.CLOUDIANRY_API_SECRET,
})

export default cloudnary;