
import { Account,AppwriteException, Client,Databases,ID} from "appwrite"

const client = new Client()

client.setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint

client.setEndpoint('https://fra.cloud.appwrite.io/v1') 

.setProject('6554dca1a0a5a138e6c6');


const storage = Client.storage;
const database = new Databases(client);




const login = async (Email, password) => {
  const account = new Account(client);

  try {
    const currentSession = await account.getSession('current');
    console.log("Already logged in:", currentSession);
    return currentSession; // Already logged in
  } catch (err) {
    // No session, so proceed with login
    try {
      const session = await account.createEmailSession(Email, password);
      console.log("Logged in successfully:", session);
      return session;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw new Error(error.message);
    }
  }
};






const register = async (Email, password) => {
  try {
    const account = new Account(client)
    return account.create(ID.unique(), Email, password)
  } catch (error) {
    const appwriteError = AppwriteException;
    throw new Error(appwriteError.message)
  }
}

const creatUserDocument = async ({ username, email }) => {
  const account = new Account(client);
  const user = await account.get(); // 👈 get currently logged in user

  try {
    console.log("Creating document for user ID:", user.$id);
    return database.createDocument(
      "6554dcedaf44163b4636",
      "6554dcfe097364a862b5",
      user.$id, // 👈 use user.$id as document ID
      { username, email }
    );
  } catch (e) {
    console.error("Error creating user doc:", e.message);
  }
};




const updateUserDocument = async ({color, side}) => {
  const account = new Account(client)
  const user = await account.get();
  console.log("Logged-in User ID:", user.$id);

  try {
    console.log("updateUserDocs: " + user.$id);
    return database.updateDocument(
     
      "6554dcedaf44163b4636",
      "6554dcfe097364a862b5",
      user.$id,
      {color, side}
    );
  } catch (e) {
    console.error(e.message);
  }
};
const updateUserDocument1 = async ({docname}) => {
  const account = new Account(client)
  const user = await account.get();

  try {
    console.log("updateUserDocs: " + user.$id);
    return database.updateDocument(
     
      "6554dcedaf44163b4636",
      "6554dcfe097364a862b5",
      user.$id,
      {docname}
    );
  } catch (e) {
    console.error(e.message);
  }
};
const updateUserDocument2 = async ({numpages,numcopies,price,totalprice}) => {
  const account = new Account(client)
  const user = await account.get();

  try {
    console.log("updateUserDocs: " + user.$id);
    return database.updateDocument(
   
      "6554dcedaf44163b4636",
      "6554dcfe097364a862b5",
      user.$id,
      {numpages,numcopies,price,totalprice}
    );
  } catch (e) {
    console.error(e.message);
  }
};

export {
 

  Client,
  storage,
  register,
  login,
  creatUserDocument,
  updateUserDocument,
  updateUserDocument1,
  updateUserDocument2,
 
};
