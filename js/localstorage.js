export default class Storage {
  constructor() {
    this.selecteds = JSON.parse(localStorage.getItem("selecteds"));
  }

  saveStorage() {
    localStorage.setItem("selecteds", JSON.stringify(this.selecteds));
  }

  addSelected(id) {
    let selected = { id };
    !this.selecteds
      ? (this.selecteds = [selected])
      : this.selecteds.push(selected);
    this.saveStorage();
  }

  removeSelected(id) {
    const index = this.selecteds.findIndex((selected) => selected.id === id);
    this.selecteds.splice(index, 1);
    this.saveStorage();
  }

  loadStorage() {
    this.selecteds.forEach((selected) => {
      this.obtain(selected.id);
    });
  }

  obtain(id) {
    let row = document.getElementById(id);
    row.className = "bg-success";
    row.querySelectorAll("td")[2].innerHTML = "Obtenido";
  }
}
