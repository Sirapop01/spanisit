import { db } from "@/config/firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

const documentRef = collection(db, 'documents'); 

export const addDocument = async (documentData) => {
    try {
        const docRef = await addDoc(documentRef, documentData);
        console.log('Document written with ID: ', docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error('Error adding document: ', e);
        return { success: false, error: e };
    }
};

// เพิ่มฟังก์ชันนี้เข้าไป
/**
 * ดึงข้อมูลเอกสารทั้งหมดและจัดกลุ่มตาม category
 * @returns {Promise<{success: boolean, data: object, error?: any}>}
 */
export const getDocuments = async () => {
    try {
        // ดึงข้อมูลโดยเรียงจากปีล่าสุดไปเก่าสุด
        const q = query(documentRef, orderBy("year", "desc"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: true, data: {} }; // คืนค่าเป็น object ว่าง
        }

        const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // จัดกลุ่มข้อมูลตาม category (เช่น 'rules', 'constitutions')
        const groupedData = documents.reduce((acc, doc) => {
            const category = doc.category || 'other';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(doc);
            return acc;
        }, {});

        return { success: true, data: groupedData };

    } catch (e) {
        console.error('Error getting documents: ', e);
        return { success: false, error: e };
    }
};