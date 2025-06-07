// src/services/complaintService.js

import { db } from "@/config/firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    Timestamp,
    orderBy,
    query
} from "firebase/firestore";
import ComplaintModel from "@/models/complaintModel";

const complaintRef = collection(db, 'complaints');

// แก้ไข addComplaint เพื่อใช้ Model ใหม่
export const addComplaint = async (complaintData) => {
    try {
        const newComplaint = new ComplaintModel(complaintData);
        const dataToSave = newComplaint.toFirestore();
        const docRef = await addDoc(complaintRef, dataToSave);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error('Error adding complaint: ', e);
        return { success: false, error: e };
    }
};

// (ใหม่) ดึงข้อมูลเรื่องร้องเรียนทั้งหมด
export const getAllComplaints = async () => {
    try {
        const q = query(complaintRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const complaints = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return { success: true, data: complaints };
    } catch (e) {
        return { success: false, error: e };
    }
};

// (ใหม่) ดึงข้อมูลเรื่องร้องเรียนตาม ID
export const getComplaintById = async (id) => {
    try {
        const docRef = doc(db, 'complaints', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
        } else {
            return { success: false, error: 'Document not found' };
        }
    } catch (e) {
        return { success: false, error: e };
    }
};

// (ใหม่) อัปเดตสถานะ, หลักฐาน, และหมายเหตุ
export const updateComplaint = async (id, updateData) => {
    try {
        const docRef = doc(db, 'complaints', id);
        const dataWithTimestamp = {
            ...updateData,
            updatedAt: Timestamp.now()
        };
        await updateDoc(docRef, dataWithTimestamp);
        return { success: true, message: 'อัปเดตข้อมูลสำเร็จ' };
    } catch (error) {
        return { success: false, message: 'ไม่สามารถอัปเดตข้อมูลได้' };
    }
};