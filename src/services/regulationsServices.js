import { db } from "@/config/firebase";
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    doc,
    getDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

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

export const getDocuments = async () => {
    try {
        const q = query(documentRef, orderBy("year", "desc"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: true, data: {} };
        }

        const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

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

export const getRegulationById = async (id) => {
    try {
        const docRef = doc(db, 'documents', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
        } else {
            return { success: false, error: 'Document not found' };
        }
    } catch (e) {
        console.error('Error getting document by ID:', e);
        return { success: false, error: e };
    }
};


export const updateRegulation = async (id, updatedData) => {
    try {
        const docRef = doc(db, 'documents', id);
        await updateDoc(docRef, updatedData);
        return { success: true, message: 'อัปเดตข้อมูลสำเร็จ' };
    } catch (error) {
        console.error('Error updating document:', error);
        return { success: false, error };
    }
};


export const deleteRegulation = async (id) => {
    try {
        const docRef = doc(db, 'documents', id);
        await deleteDoc(docRef);
        return { success: true, message: 'ลบข้อมูลสำเร็จ' };
    } catch (error) {
        console.error('Error deleting document:', error);
        return { success: false, error };
    }
};