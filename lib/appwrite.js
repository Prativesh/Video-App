import { Account, ID, Client, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.prat.aora",
  projectId: "66a0af1a001486b3112c",
  databaseId: "66a0b317001669d3c3fe",
  usersCollectionId: "66a0b341000a817f3140",
  videosCollectionId: "66a0b3520014cd4b467c",
  storageId: "66a0b579001fcf08dc74"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.



const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = databases.createDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, ID.unique(),
                        {
                            accountId: newAccount.$id,
                            email,
                            username,
                            avatar: avatarUrl
                        })
        return newUser

    } catch(error) {
        //console.log(error)
        throw new Error(error)
    }
}

export async function signIn(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
        //console.log(session)
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

  export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, 
                                    [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]
    } catch (error) {
        throw new Error(error)
    }
}


export const getAllPosts = async() => {

    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videosCollectionId, [Query.orderDesc("$createdAt")])
        return posts.documents

    } catch (error) {
        throw new Error(error)
    }
   
}

export const getLatestPosts = async() => {

    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videosCollectionId, 
            [Query.orderDesc("$createdAt"), Query.limit(7)])
        return posts.documents

    } catch (error) {
        throw new Error(error)
    }
   
}

export const searchPosts = async(query) => {

    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videosCollectionId, 
            [Query.search("title", query)])
        return posts.documents

    } catch (error) {
        throw new Error(error)
    }
   
}


export async function getUserPosts(userId) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        [Query.equal("creator", userId)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }



  export async function uploadFile(file, type) {
    if (!file) return;
  
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
  
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        asset
      );
  
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get File Preview
  export async function getFilePreview(fileId, type) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
          appwriteConfig.storageId,
          fileId,
          2000,
          2000,
          "top",
          100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Create Video Post
  export async function createVideoPost(form) {
    try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, "image"),
        uploadFile(form.video, "video"),
      ]);
  
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          creator: form.userId,
        }
      );
  
      return newPost;
    } catch (error) {
      throw new Error(error);
    }
  }


  export const savePost = async(userId, postId) => {
    try {
      const response = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        postId,
        {
          liked : [userId]
        }
      )
      
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  export const removePost = async(userId, postId) => {
    try {
      const document = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        postId,
      )
      
      const updatedLiked = document.liked.filter(like => like.$id !== userId);

      if(!document)
        console.log('No document found')

      else{
        const response = await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.videosCollectionId,
          postId,
          {
            liked : updatedLiked
          }
        )
      }
      
    } catch (error) {
      throw new Error(error)
    }
  }


  export const getSavedPosts = async(userId) => {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
      )

      const allPosts = response.documents
      
      const savedPosts = allPosts.filter(post => post.liked.some(like => like.$id === userId))

      return savedPosts
    } catch (error) {
      throw new Error(error)
    }
  }


