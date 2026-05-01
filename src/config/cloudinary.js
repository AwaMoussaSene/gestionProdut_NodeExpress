import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dforeshog",
  api_key: "799496668861926",
  api_secret: "t1KJ_ITIJ3xXEEA8Fgr0DNP7hGc"
});

export default cloudinary;

// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_dforeshog,
//   api_key: process.env.CLOUDINARY_799496668861926,
//   api_secret: process.env.CLOUDINARY_t1KJ_ITIJ3xXEEA8Fgr0DNP7hGc,
// });

// export default cloudinary;