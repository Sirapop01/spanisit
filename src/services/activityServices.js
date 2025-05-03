import Activity from "@/models/activityModel";
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const addActivity = async (activityData) => {
    try {
        const activity = new Activity(activityData)

        const activityDataForFirestore = activity.toFirestore()

        const docRef = await addDoc(collection(db, 'activities'), activityDataForFirestore)

        console.log('Document written with ID: ', docRef.id)
        return { success: true, id: docRef.id }
    } catch (e) {
        console.log('Error adding document: ',e)
        return { success: false, error: e }
    }
}