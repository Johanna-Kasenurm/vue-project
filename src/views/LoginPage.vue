<template>
    <div>
      <main>
        <div class="signupBox">
          <div class="signupinf">
            <h2>Login</h2>
            <form>
              <label for="Email">Email:</label>
              <input class="logininput" type="text" placeholder="Email" v-model="email" required> <br>
              <label for="password">Password:</label>
              <input class="logininput" id="password" type="password" placeholder="Password" v-model="password" required>
            </form>
            <div class="formButtons">
              <button id="loginButton" type="button" @click="login">Log in</button>
              <p>Or</p>
              <router-link to="/signup"><button>Signup</button></router-link>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
        login() {
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');

      if (!this.email || !this.password) {
        alert('Please fill in both fields.');
        return;
      }

      if (this.email === storedEmail && this.password === storedPassword) {
        localStorage.setItem('userLoggedIn', true); // Mark as logged in
        alert('Login successful!');
        this.$router.push('/'); // Redirect to Home
      } else {
        alert('Invalid email or password.');
      }
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
    

  