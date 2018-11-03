import * as firebase from 'firebase'

const action = {
    signUserup ( {commit}, payload ) {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then()
    }
}