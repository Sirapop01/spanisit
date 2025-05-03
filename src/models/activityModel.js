import { Timestamp } from 'firebase/firestore';

class Activity {
    constructor({ year, startDate, endDate, title, details, location, photoURL }) {
        this.year = year
        this.startDate = startDate
        this.endDate = endDate
        this.title = title
        this.details = details
        this.location = location
        this.photoURL = photoURL
    }

    toFirestore() {
        return {
            year: this.year,
            startDate: Timestamp.fromDate(new Date(this.startDate)),
            endDate: Timestamp.fromDate(new Date(this.endDate)),
            title: this.title,
            details: this.details,
            location: this.location,
            photoURL: this.photoURL,
        }
    }
}

export default Activity