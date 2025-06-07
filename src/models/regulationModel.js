class Regulation {
  constructor({
    year,
    fileName,
    fileURL, 
    documentMainType,
    message,
  }) {
    this.year = year;
    this.fileName = fileName;
    this.fileURL = fileURL; 
    this.documentMainType = documentMainType;
    this.message = message; 
  }

  toFirestore() {
    return {
      year: this.year,
      fileName: this.fileName,
      fileURL: this.fileURL, 
      documentMainType: this.documentMainType,
      message: this.message, 
    };
  }
}

export default Regulation;