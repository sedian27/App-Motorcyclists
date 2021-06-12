export default class Firebase {
  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyAyTWak5kSkA3vjq2_rXsXWGi92qRAKUW8",
      authDomain: "motorcyclists.firebaseapp.com",
      projectId: "motorcyclists",
      storageBucket: "motorcyclists.appspot.com",
      messagingSenderId: "1066640180750",
      appId: "1:1066640180750:web:45fb427671b3e319c39e5f",
      measurementId: "G-CL07EPW37B",
    };
    // Initialize Firebase
    firebase.initializeApp(this.firebaseConfig);
    this.db = firebase.firestore();
  }

  onGetData = (callback) =>
    this.db.collection("motorcyclists-schedule").onSnapshot(callback);

  getData = (id) => this.db.collection("motorcyclists-schedule").doc(id).get();

  updateData = (id, data) =>
    this.db.collection("motorcyclists-schedule").doc(id).update(data);
}
