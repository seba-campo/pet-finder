import { v2 as cloudinary } from 'cloudinary';


const CLOUD_NAME= "dlhotzwpo"
const CLOUD_API_KEY = "658649741377831"
const CLOUD_API_SECRET = "ZgXXDgM8aUYnFBVI-J5DCwUITjw"

export function cloudConfig(){
    cloudinary.config({ 
        cloud_name: CLOUD_NAME, 
        api_key: CLOUD_API_KEY, 
        api_secret: CLOUD_API_SECRET
    });
}



async function getImageFromCloudinary(publicId){
    // Return colors in the response
    const options = {
        colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
}

async function uploadImageToCloudinary(path: string){
    // Use the uploaded file's name as the asset's public ID and 
// allow overwriting the asset with new versions        
    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(path);
        console.log(result);
        return result.public_id;
      } catch (error) {
        console.error(error);
      }
}