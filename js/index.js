import Storage from "./localstorage.js";
import Firebase from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const db = new Firebase();
  const storage = new Storage();

  const table = document.getElementById("table");

  document.addEventListener("click", select);

  window.addEventListener("DOMContentLoaded", async () => {
    db.onGetData((querySnapshot) => {
      table.innerHTML = "";
      querySnapshot.forEach((doc) => {
        insertDt(doc.id, doc.data());
      });
      storage.loadStorage();
    });
  });

  function insertDt(id, arr) {
    const row = table.insertRow();
    row.setAttribute("id", id);
    let status = "No Disponible";
    if (arr.amount > 0) {
      status = "Disponible";
    } else {
      row.className += "bg-danger";
    }

    row.innerHTML = `
      <td>${arr.hour}</td>
      <td>${arr.amount}</td>
      <td>${status}</td>
      `;
  }

  const validation = (id) => {
    db.updateData(id, { amount: 8 });
    return 8;
  };

  async function select(e) {
    const id = e.target.parentElement.getAttribute("id");
    let selectedRow = document.getElementById(id);
    const isSelected = selectedRow.className == "bg-success";

    const doc = await db.getData(id);
    let amount = doc.data().amount > 8 ? validation(id) : doc.data().amount;

    if (!isSelected && amount > 0) {
      db.updateData(id, { amount: --amount });
      selectedRow.className = "bg-success";
      storage.addSelected(id);
    } else if (isSelected && amount < 8) {
      db.updateData(id, { amount: ++amount });
      selectedRow.className = "";
      storage.removeSelected(id);
    }
  }
});
