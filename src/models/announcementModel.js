
import { Timestamp } from "firebase/firestore";

class AnnouncementModel {
  constructor({ title, details, imageUrl = '', link = '' }) {
    this.title = title;
    this.details = details;
    this.imageUrl = imageUrl;
    this.link = link;
    this.createdAt = Timestamp.now();
    this.updatedAt = Timestamp.now();
  }

  toFirestore() {
    return {
      title: this.title,
      details: this.details,
      imageUrl: this.imageUrl,
      link: this.link,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default AnnouncementModel;