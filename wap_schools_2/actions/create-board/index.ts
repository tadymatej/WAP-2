// "use server";

// import { createSaveAction } from "@/lib/create-save-action";
// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs";
// import { revalidatePath } from "next/cache";
// import { CreateBoard } from "./schema";
// import { InputType, ReturnType } from "./types";


// const handler = async(data: InputType) : Promise<ReturnType> => {
//   const {userId, orgId} = auth();

//   if(!userId || !orgId){
//     return {
//       error:  "Unauthorized",
//     }
//   }

//   //We can use it, because it is already validated
//   const {title, image} = data;
//   const [
//     imageId,
//     imageThumbUrl,
//     imageFullUrl,
//     imageLinkHtml,
//     imageUserName,
//   ] = image.split("|");
//   if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHtml || !imageUserName){
//     return {
//       error: "Missing image fields.",
//     }
//   }
//   let board;
//   try {
//     board = await db.board.create({
//       data: {
//         title,
//         orgId,
//         imageId,
//         imageThumbUrl,
//         imageFullUrl,
//         imageUserName,
//         imageLinkHtml,

//       }
//     });
//   } catch(error){
//     return {
//       error: "Failed to create board.",
//     }
//   }

//   revalidatePath(`/board/${board.id}`);
//   return {data: board};
// }

// export const createBoard = createSaveAction(CreateBoard, handler);


