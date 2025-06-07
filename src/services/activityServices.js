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
    updateDoc,
    deleteDoc, 
    Timestamp,
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
        const docRef = doc(db, 'activities', activityId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // แปลง Firestore Timestamps เป็น JavaScript Date objects
            if (data.startDate && data.startDate.toDate) {
                data.startDate = data.startDate.toDate();
            }
            if (data.endDate && data.endDate.toDate) {
                data.endDate = data.endDate.toDate();
            }
            return { success: true, data: { id: docSnap.id, ...data } };
        } else {
            return { success: false, error: 'Document not found' };
        }
    } catch (e) {
        console.error('Error getting activity by ID: ', e);
        return { success: false, error: e };
    }
};

export const updateActivity = async (id, updatedData) => {
    try {
        const docRef = doc(db, 'activities', id);
        // แปลงวันที่กลับเป็น Firestore Timestamps ก่อนบันทึก
        const dataToUpdate = {
            ...updatedData,
            startDate: Timestamp.fromDate(new Date(updatedData.startDate)),
            endDate: Timestamp.fromDate(new Date(updatedData.endDate)),
            updatedAt: Timestamp.now(),
        };
        await updateDoc(docRef, dataToUpdate);
        return { success: true, message: 'อัปเดตกิจกรรมสำเร็จ' };
    } catch (error) {
        console.error('Error updating activity: ', error);
        return { success: false, error };
    }
};

// ✅ (ใหม่) ฟังก์ชันสำหรับลบกิจกรรม
export const deleteActivity = async (id) => {
    try {
        const docRef = doc(db, 'activities', id);
        await deleteDoc(docRef);
        return { success: true, message: 'ลบกิจกรรมสำเร็จ' };
    } catch (error) {
        console.error('Error deleting activity: ', error);
        return { success: false, error };
    }
};