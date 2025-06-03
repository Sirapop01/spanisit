import Member from "@/models/memberModel";
import { db } from "@/config/firebase";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore"


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

        if (querySnapshot.empty) {
            return { success: true, data: [] }
        }

        const members = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return { success: true, data: members }
    } catch (e) {
        console.log('Error getting document: ', e)
        return { success: false, error: e }
    }
}

export const getAvailableYears = async () => {
    try {
        const querySnapshot = await getDocs(memberRef);

        if (querySnapshot.empty) {
            return { success: true, data: [] };
        }

        const yearsSet = new Set();

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.year) {
                yearsSet.add(data.year);
            }
        });

        const yearsArray = Array.from(yearsSet).sort((a, b) => b - a);

        return { success: true, data: yearsArray };
    } catch (e) {
        console.log('Error getting available years: ', e);
        return { success: false, error: e };
    }
};

export const getMemberById = async (id) => {
    try {
        const docRef = doc(db, 'members', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
        } else {
            return { success: false, error: 'Document not found' };
        }
    } catch (e) {
        console.log('Error getting document by ID: ', e);
        return { success: false, error: e };
    }
};

export const updateMember = async (id, updatedData) => {
    try {
        const docRef = doc(db, 'members', id);

        await updateDoc(docRef, updatedData);

        return { success: true, message: 'อัปเดตข้อมูลสมาชิกสำเร็จ' };
    } catch (error) {
        console.log('Error updating document: ', error);
        return { success: false, message: 'ไม่สามารถอัปเดตข้อมูลสมาชิกได้' };
    }
};

export const deleteMemberById = async (id) => {
    try {
        const docRef = doc(db, 'members', id);

        const memberSnapshot = await getDoc(docRef);
        if (!memberSnapshot.exists()) {
            return { success: false, message: 'ไม่พบสมาชิกที่ต้องการลบ' };
        }

        // 1. ลบเอกสารสมาชิกจาก Firestore เท่านั้น
        await deleteDoc(docRef);

        return { success: true, message: 'ลบสมาชิกสำเร็จ' };
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบเอกสารสมาชิก: ', error);
        return { success: false, message: 'ไม่สามารถลบสมาชิกได้' };
    }
};