// src/models/complaintModel.js

import { Timestamp } from "firebase/firestore";

class ComplaintModel {
  constructor({ name, email, subject, message }) {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.status = "รอรับเรื่อง"; // สถานะเริ่มต้น
    this.evidenceURLs = []; // URL ของหลักฐานจากแอดมิน
    this.adminNote = ""; // หมายเหตุจากแอดมินเพื่อแสดงให้ผู้ใช้เห็น
    this.createdAt = Timestamp.now();
    this.updatedAt = Timestamp.now();
  }

  toFirestore() {
    return {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
      status: this.status,
      evidenceURLs: this.evidenceURLs,
      adminNote: this.adminNote,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default ComplaintModel;