(function () {

    var oauth = {},
        curruser = localStorage["portfolio-generator-oauth"] || null;

    function toggleSignIn() {
        if (!firebase.auth().currentUser) {
            var provider = new firebase.auth.GoogleAuthProvider();

            provider.addScope('https://www.googleapis.com/auth/plus.login');
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithRedirect(provider);

        } else {
            firebase.auth().signOut();
            localStorage.removeItem("portfolio-generator-oauth");
        }
        document.getElementById('quickstart-sign-in').disabled = true;
    }

    function setRole(uid, func) {

        return function () {

            database.ref("users").on("value", snap => {
                snap.forEach(function (csnap) {
                    if (csnap.key === uid) {
                        if (!csnap.val().role) {
                            func();
                        } else {
                            return;
                        }
                    } else {
                        return;
                    }
                })
            })

        }
    }

    function initApp() {

        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                var token = result.credential.accessToken;
                location.reload();
                console.log(token);
            }
            var user = result.user;
        }).catch(function (error) {
            var errorCode = error.code,
                errorMessage = error.message,
                email = error.email,
                credential = error.credential;

            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
            } else {
                console.error(`${errorCode}: ${errorMessage}`);
            }
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                oauth.displayName = user.displayName;
                oauth.email = user.email;
                oauth.photoURL = user.photoURL;
                oauth.uid = user.uid;

                localStorage["portfolio-generator-oauth"] = JSON.stringify(oauth);

                document.getElementById('quickstart-sign-in').textContent = 'Sign out';

                var roleSetter = setRole(user.uid, function () {
                    database.ref(`users/${user.uid}`).update({
                        role: 0,
                    });
                });

                database.ref('users/' + user.uid).update({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }, roleSetter);

            } else {
                document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
            }
            document.getElementById('quickstart-sign-in').disabled = false;
        });
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    }

    if (typeof curruser === "string") {
        console.log("Current user in session.");
    } else {
        console.log("No user in session.")
    }

    window.onload = function () {
        initApp();
    };

}())
