export function createStore() {
  return {
    notes: [],
    doctorsInfo: [["Johnny Jones", "Business Analyst", "St. Petersburg"]],
    ButtonState: false,
    addNote(text, id) {
      this.notes.push({
        text,
        id: id,
      });
    },
    removeNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
    setButtonState(state) {
      this.ButtonState = state;
    },
    AddDoctor(name, speciality, location) {
      const item = [name, speciality, location];
      const list = [...this.doctorsInfo];
      list.push(item);
      this.doctorsInfo = list;
    },
    DeleteDoctor(data) {
      const newData = data.map((item) => item.data);
      this.doctorsInfo = newData;
    },
  };
}
