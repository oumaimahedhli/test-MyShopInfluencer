import { initializeApp } from 'firebase/app';
import { getDatabase, ref,  get,  onValue} from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9Vz6mlFI0-8NYAhvwJyvEVu_I_UpPB0o",
  authDomain: "test-technique-a5ac7.firebaseapp.com",
  databaseURL: "https://test-technique-a5ac7.firebaseio.com",
  projectId: "test-technique-a5ac7",
  storageBucket: "test-technique-a5ac7.appspot.com",
  messagingSenderId: "675219586721",
  appId: "1:675219586721:web:01d9b8ca7380847563fae0"
};

// Initialize Firebase
let database
try {
	const app = initializeApp(firebaseConfig);

// Get a reference to the database service
 database = getDatabase(app);
	console.log("Firebase Initialized");
} catch (err) {
	console.log("Error Initializing Firebase");
}
 const dbRef = ref(getDatabase(), "brands")
 const dbRefbrandbyId = ref(getDatabase(), "brands")

 const dbRefPurchase = ref(getDatabase(), "conversions/purchase")
 const dbRefinf= ref(getDatabase(), "Influencers")

 export const getALL = get(dbRef)
 export const getBrandbyId = dbRefbrandbyId

 export const getALLPurchases = dbRefPurchase
 export const onValue1= onValue
 export const getInfluenceur = dbRefinf

