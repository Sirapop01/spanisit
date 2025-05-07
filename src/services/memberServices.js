import Member from "@/models/memberModel";
import { db } from "@/config/firebase";
import { 
    collection,
    addDoc, 
    getDocs, 
    query,
    where,
} from  "firebase/firestore"

const memberRef = collection(db, 'members')

export const addMember = async (memberData) => {
    try {
        const member = new Member(memberData)

        const memberDataForFirestore = member.toFirestore()
        
        const docRef = await addDoc(memberRef, memberDataForFirestore)

        console.log('Document written with ID: ', docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.log('Error adding document: ', e);
        return { success: false, error: e };
    }
}

export const getMemberByYrs = async (memberYrs) => {
    try {
        const querySnapshot = await getDocs(query(memberRef, where('year', '==', memberYrs)))

        if(querySnapshot.empty) {
            return { success:true, data: [] }
        }

        const members = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return { success: true, data: members }
    } catch (e) {
        console.log('Error getting document: ',e)
        return { success: false, error: e }
    }
}