import Member from "@/models/memberModel";
import { db } from "@/config/firebase";
import { collection, addDoc } from  "firebase/firestore"

export const addMember = async (memberData) => {
    try {
        const member = new Member(memberData)

        const memberDataForFirestore = member.toFirestore()
        
        const docRef = await addDoc(collection(db, 'members'), memberDataForFirestore)

        console.log('Document written with ID: ', docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.log('Error adding document: ', e);
        return { success: false, error: e };
    }
}