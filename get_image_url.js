import cloudinary from 'cloudinary'
import path from 'path'
import url from 'url'
import dotenv from 'dotenv';
dotenv.config()

cloudinary.v2.config(
    {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    }
)
let __dirname = path.dirname(url.fileURLToPath(import.meta.url))
let images = path.join(__dirname,'public','images') // GETTING THE IMAGES PATH


async function get_Image_Url(file){
    try {//USING THE IMAGES FOLDER PATH + THE FILE NAME TO UPLOAD IT
        console.log(images,file) 
        let result = await cloudinary.v2.uploader.upload(path.join(images,file),
        {   //THE OPTIONS FOLDERNAME AND THE PUBLIC_ID WILL BE FILE NAME WITHOUT THE EXTENSION 
            folder:'products',
            public_id:path.parse(file).name.toUpperCase(),
        })//RETURN THE URL
        return result['url'] 
    } catch (error) {
        console.log(error.message)
    }
}

export default get_Image_Url;


//let files  =  fs.readdirSync(images) //get all file name ['patrick.png', 'sheldon.png', 'spong.png']
/* THE result returned from the uploader
{
 men

  asset_id: '1a9fff56485ec1f10a145fe8f86644b0',
  public_id: 'customer/ASHWAGANDHA',
  version: 1789749456,
  version_id: '8057cf28ec4e74cf016664b06a53211d',
  signature: '8e761e35a541d4949eaa45bcc6bc28c4a77b7c43',
  width: 1440,
  height: 1440,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2026-09-18T16:37:36Z',
  tags: [],
  bytes: 160211,
  type: 'upload',
  etag: '17824f15841ca9f387ff8b0e5d3a7a90',
  placeholder: false,
  url: 'http://res.cloudinary.com/cx6wimqr/image/upload/v1789749456/customer/ASHWAGANDHA.jpg',
  secure_url: 'https://res.cloudinary.com/cx6wimqr/image/upload/v1789749456/customer/ASHWAGANDHA.jpg',
  asset_folder: 'customer',
  display_name: 'ASHWAGANDHA',
  original_filename: 'ASHWAGANDHA',
  api_key: '282157523576528'
}
*/
