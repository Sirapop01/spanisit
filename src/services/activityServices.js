import Activity from "@/models/activityModel";
import { db } from "@/config/firebase";
import { 
    collection, 
    query,
    where,
    getDocs,
    addDoc,
    getDoc, 
    doc,
    distinct,
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

export const getYearsWithActivities = async () => {
    try {
        const querySnapshot = await getDocs(query(activityRef));
        
        const yearsData = {};  
        
        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data.year && !yearsData[data.year]) {
                yearsData[data.year] = data;  
            }
        });

        const yearsArray = Object.values(yearsData);  

        return {
            success: true,
            data: yearsArray
        };
    } catch (error) {
        console.error('Error fetching years:', error);
        return { success: false };
    }
};


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

export const getActivityById = async (activityId) => {
    try {
      const docRef = doc(activityRef, activityId)
      const docSnap = await getDoc(docRef)
  
      if (!docSnap.exists()) {
        return { success: true, data: null }
      }
  
      return {
        success: true,
        data: {
          id: docSnap.id,
          ...docSnap.data(),
        },
      }
    } catch (e) {
      console.log('Error getting document:', e)
      return { success: false, error: e }
    }
  }