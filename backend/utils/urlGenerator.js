// to generate the url from the songs

import DataUriParser from "datauri/parser.js";
import path from "path";

// get data url function
const getDataurl = (file) => {
  const parser = new DataUriParser();

  // for the file name extenstion
  // get file from path extension name and then
  // convert the file name to string
  const extName = path.extname(file.originalname).toString();

  //    then simply return the parser with extname and file
  return parser.format(extName, file.buffer);
};

// export the function
export default getDataurl;
