import  ImageUrlBuilder  from "@sanity/image-url";
import  { createClient } from "@sanity/client"

const client=createClient({
    projectId:"i5fm9td9",
    dataset:"production",
    useCdn:true,
    apiVersion:"2021-10-21",
});
const builder= ImageUrlBuilder(client)
export const urlFor=(source) => builder.image(source);

// RUN THIS to add exception for localhost 3000 CORS policy
// sanity cors add http://localhost:3000

export default client;