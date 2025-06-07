
import { db } from "@/config/firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    Timestamp,
    query,
    orderBy
} from "firebase/firestore";
import AnnouncementModel from "@/models/announcementModel";

const announcementRef = collection(db, 'announcements');

// --- ฟังก์ชันสำหรับดึงข้อมูล (Read) ---

export const getAllAnnouncements = async () => {
    try {
        const q = query(announcementRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const announcements = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return { success: true, data: announcements };
    } catch (e) {
        console.error("Error getting announcements: ", e);
        return { success: false, error: e };
    }
};

// --- ฟังก์ชันสำหรับสร้าง (Create) ---

export const addAnnouncement = async (announcementData) => {
    try {
        const newAnnouncement = new AnnouncementModel(announcementData);
        const dataToSave = newAnnouncement.toFirestore();
        const docRef = await addDoc(announcementRef, dataToSave);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding announcement: ", e);
        return { success: false, error: e };
    }
};


// --- ฟังก์ชันสำหรับอัปเดต (Update) ---

export const updateAnnouncement = async (id, updateData) => {
    try {
        const docRef = doc(db, 'announcements', id);
        const dataWithTimestamp = {
            ...updateData,
            updatedAt: Timestamp.now()
        };
        await updateDoc(docRef, dataWithTimestamp);
        return { success: true, message: "อัปเดตประกาศสำเร็จ" };
    } catch (e) {
        console.error("Error updating announcement: ", e);
        return { success: false, error: e };
    }
};


// --- ฟังก์ชันสำหรับลบ (Delete) ---

export const deleteAnnouncement = async (id) => {
    try {
        const docRef = doc(db, 'announcements', id);
        await deleteDoc(docRef);
        return { success: true, message: "ลบประกาศสำเร็จ" };
    } catch (e) {
        console.error("Error deleting announcement: ", e);
        return { success: false, error: e };
    }
};