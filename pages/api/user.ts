import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import multer  from 'multer';

// const upload = multer({ storage: multer.memoryStorage() });

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_SECRET
// });


import nextConnect from 'next-connect';

const upload = multer({ dest: "/tmp" });

const apiRoute = nextConnect({
  onError(error, req: any, res: any) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('profilePicture'));

apiRoute.post(async (req, res) => {
  dbConnect();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
  });
  console.log(req.file, 'REQ FILE');
  console.log(req.body, 'REQ BODY');
  try {
    const { name, username, email, pass } = req.body;
    const hashedPassword = await bcrypt.hash(pass, 10);
    let newUser = {}
    if (req.file !== undefined) {
      const image = req.file;
      const result = await cloudinary.uploader.upload(image.path, {
        width: 512,
        height: 512,
        crop: "fill",
      })
      console.log('CLOUD RESULT: ', result);
      const imageUrl = result.secure_url
      newUser = {
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
        avatar: imageUrl,
      }
      // @ts-ignore
      const user = await User.create(newUser)
      return res.status(200).json({success: true, data: user })
      } else {
        newUser = {
          name: name,
          username: username,
          email: email,
          password: hashedPassword,
        }
        // @ts-ignore
        const user = await User.create(newUser);
        return res.status(200).json({success: true, data: user });
        }
  } catch (error) {
        console.log(error);
        if (error.toString().includes('duplicate key error collection:')) {
          return res.status(201).json({success: false, data: 'Email or Username already in use.'})
        }
      }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};


// export default async function handler (req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await runMiddleware(req, res, upload.single("profilePicture"))
//   } catch (e) {
//     console.log(e, 'from UPLOAD THING');
//   }
//   await dbConnect()
//   const { method } = req
  
//   switch (method) {
//     case 'GET':
//       try {
//         //@ts-ignore
//         const users = await User.find({})
//         res.status(200).json({ success: true, data: users })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break

//     /*
//       ***** POST REQUESTS
//     */
//     case 'POST':
   
//     try {
//       console.log(req.body, 'req.body found this');
//       const { name, username, email, pass, file } = req.body;
//       const hashedPassword = await bcrypt.hash(pass, 10);
//       let newUser = {}
//       if (file !== null) {

//         const image = (req as any).file;
//         console.log(image);
//         const result = await cloudinary.uploader.upload(image.buffer, { resource_type: 'raw' })
//         const imageUrl = result.secure_url
//         newUser = {
//           name: name,
//           username: username,
//           email: email,
//           password: hashedPassword,
//           avatar: imageUrl,
//         }
//         // @ts-ignore
//         const user = await User.create(newUser)
//         return res.status(200).json({success: true, data: user })
//       } else {
//         newUser = {
//           name: name,
//           username: username,
//           email: email,
//           password: hashedPassword,
//         }
//         // @ts-ignore
//         const user = await User.create(newUser);
//         return res.status(200).json({success: true, data: user });
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.toString().includes('duplicate key error collection:')) {
//         return res.status(201).json({success: false, data: 'Email or Username already in use.'})
//       }
//     }
//     break
//     default:
//       res.status(400).json({ success: false })
//       break
//   }
// }


// function extractBase64(dataUrl: string): string | null {
//   const base64Regex = /^data:([a-z]+\/[a-z0-9-+.]+)?;base64,(.+)$/;
//   const match = dataUrl.match(base64Regex);
//   if (match) {
//     return match[2];
//   }
//   return null;
// }

// function extractDataUrlPrefix(dataUrl: string): string | null {
//   const base64Regex = /^data:([a-z]+\/[a-z0-9-+.]+)?;base64,(.+)$/;
//   const match = dataUrl.match(base64Regex);
//   if (match) {
//     const [, contentType] = match;
//     const fileType = contentType.split('/')[1];
//     return `data:${contentType};base64,`;
//   }
//   return null;
// }

