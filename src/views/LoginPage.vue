<template>
  <div>
    <main>
      <div class="signupBox">
        <div class="signupinf">
          <h2>Login</h2>
          <form>
            <label for="username">Username:</label>
            <input class="logininput" type="text" placeholder="username" v-model="username" required> <br>
            <label for="password">Password:</label>
            <input class="logininput" id="password" type="password" placeholder="Password" v-model="password" required>
          </form>
          <div class="formButtons">
            <button id="loginButton" type="button" @click="login">Log in</button>
            <p>Or</p>
            <router-link to="/signup"><button>Signup</button></router-link>
          </div>
          <!-- Sisselogimise teade -->
          <p v-if="loginMessage" :class="loginSuccess ? 'success' : 'error'">{{ loginMessage }}</p>
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
      loginMessage: '',    // Teade kuvamiseks
      loginSuccess: false, // Kas sisselogimine õnnestus
    };
  },
  methods: {
    login() {
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          username: this.username,
          password: this.password
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthed) {
          this.loginSuccess = true;
          this.loginMessage = "Login successful! Redirecting to home page...";
          setTimeout(() => {
            this.$router.push("/"); // Suuna kodulehele
          }, 1000);
        } else {
          this.loginSuccess = false;
          this.loginMessage = "Invalid username or password. Please try again.";
        }
      })
      .catch((e) => {
        console.error("An error occurred:", e);
        this.loginSuccess = false;
        this.loginMessage = "An error occurred during login. Please try again later.";
      });
    },
  },
};
</script>

<style scoped>
/* Lisatud teade klassid */
.success {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}

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
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.signupinf h2 {
  margin-bottom: 20px;
}

.signupinf form {
  width: 100%;
}

.signupinf label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.signupinf input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.signupinf p {
  font-size: medium;
  margin: 10px 0;
}

textarea {
  resize: none;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: azure;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2c3e50;
}

.formButtons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
</style>