import Activity from "@/models/activityModel";
import { db } from "@/config/firebase";
import { 
    collection, 
    query,
    where,
    getDocs,
    addDoc 
} from "firebase/firestore";

const activityRef = collection(db, 'activities');

export const addActivity = async (activityData) => {
    try {
        const activity = new Activity(activityData)

        const activityDataForFirestore = activity.toFirestore()

        const docRef = await addDoc(activityRef, activityDataForFirestore)

        console.log('Document written with ID: ', docRef.id)
        return { success: true, id: docRef.id }
    } catch (e) {
        console.log('Error adding document: ',e)
        return { success: false, error: e }
    }
}

export const getActivityByYrs = async (activityYrs) => {
    try {
        const querySnapshot = await getDocs(query(activityRef, where('year', '==', activityYrs)));
        
        if(querySnapshot.empty) {
            return { success: true, data: [] };
        }

        const activity = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return { success: true, data: activity }
    } catch (e) {
        console.log('Error getting document: ',e)
        return { success: false, error: e }
    }
}