<template>
  <div>
    <main>
      <div class="signupBox">
        <div class="signupinf">
          <h2>Login</h2>
          <!--<form @submit.prevent="login">-->
          <form>
            <label for="username">Username:</label>
            <input class="logininput" type="text" placeholder="Username" v-model="username" required /> <br />
            <label for="password">Password:</label>
            <input class="logininput" id="password" type="password" placeholder="Password" v-model="password" required />
            <div class="formButtons">
              <!--<button id="loginButton" type="submit">Log in</button>-->
              <button @click="LogIn" id="loginButton">Log in</button>
              <p>Or</p>
              <!--<router-link to="/signup"><button type="button">Signup</button></router-link>-->
              <button @click='this.$router.push("/signup")'>Signup</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    // Login funktsioon
    LogIn() {
      console.log("In LogIn function")
      // Kontrollime, kas kasutaja ja parool on sisestatud
      if (!this.username || !this.password) {
        alert("Please fill in both username and password.");
        return;
      }

      var data = {
        username: this.username,
        password: this.password,
      };

      // Saadame päringu serverisse
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data); // Kontrollige, kas server saadab õigesti "success": true
        /*
        if (data.success) {
          // Salvestame sisselogimisoleku ja kasutaja ID
          localStorage.setItem("userLoggedIn", true);
          localStorage.setItem("userId", data.userId); // Kui server tagastab userId
          this.$router.push("/"); // Suuna kodulehele
        } else {
          alert(data.message || "Login failed"); // Näita serveri sõnumit
        }
        */
        console.log("Redirecting to home page.")
        this.$router.push('/')
        })
        .catch((e) => {
          console.log(e);
          alert("Error occurred during login.");
        });
    },
  },
};
</script>

<style scoped>
.signupBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 50px;
  margin-top: 5%;
}

.signupinf {
  background-color: #d3f1e4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2% 40px;
  font-size: larger;
  border-radius: 10px; /* Added rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added subtle shadow */
}

.signupinf h2 {
  margin-bottom: 20px; /* Added space below the heading */
}

.signupinf form {
  width: 100%; /* Make form elements take full width */
}

.signupinf label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold; /* Make labels bold */
}

.signupinf input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px; /* Rounded corners for inputs */
  box-sizing: border-box; /* Ensure padding doesn't affect width */
}

.signupinf p {
  font-size: medium;
  margin: 10px 0; /* Added margin for better spacing */
}

textarea {
  resize: none;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: azure;
  border: none;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer;
  transition: background-color 0.3s; /* Smoother transition for hover effect */
}

button:hover {
  background-color: #2c3e50;
}

.formButtons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px; /* Add some space between the elements */
}
</style>