// import { ReadStream } from "fs-capacitor";


// declare module 'graphql-upload' {
//   export interface FileUpload {
//     filename: string;
//     mimetype: string;
//     encoding: string;
//     createReadStream(): ReadStream;

//   }
//   export const GraphQLUpload: any;
//   // 其他需要覆盖或添加的类型和导出
// }


declare module "graphql-upload/GraphQLUpload.mjs" {
  export default function GraphQLUpload(): any;
}

