class Member {
    constructor({ year, prefix, name, surname, nickname, faculty, position, motto, photoURL}) {
      this.year = year;
      this.prefix = prefix;
      this.name = name;
      this.surname = surname;
      this.nickname = nickname;
      this.faculty = faculty;
      this.position = position;
      this.motto = motto;
      this.photoUrl = photoURL;
    }
  
    toFirestore() {
      return {
        year: this.year,
        position: this.position,
        prefix: this.prefix,
        faculty: this.faculty,
        name: this.name,
        surname: this.surname,
        nickname: this.nickname,
        motto: this.motto,
        photoUrl: this.photoUrl,
      };
    }
}
export default Member;  