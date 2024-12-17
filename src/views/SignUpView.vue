<template>
  <div>
    <main>
      <div class="signupBox">
        <div class="signupinf">
          <h2>Signup</h2>
          <form>
            <label for="Username">Username:</label>
            <input class="logininput" type="text" placeholder="Username"  v-model="username" required> <br>
            <label for="password">Password:</label>
            <input class="logininput" id="password" type="password" placeholder="Password" v-model="password" required>
          </form>
          <button id="signupButton" type="button" @click="signUp">Sign up</button>
          <div v-if="errMsg">{{errMsg}} </div>
          <!--<p id="validationMessage" v-html="validationMessage"></p>-->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data: function() {
    return {
      username: '',
      password: '',
      // validationMessage: '',
      errMsg: '',
    };
  },
  watch: {
    password(value) {
      this.password = value;
      this.validatePassword(value);
    }
  },
  methods: {
    // Easier function for validating passwords
    validatePassword(value) {
      if (value.length < 8 || value.length >= 16 || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
        this.errMsg = "Password must be at least 8 characters  and less than 16 characters, it must include a capital letter and at least one number"
      }else{
      this.errMsg = ''
      }
    },
    /*
    validatePassword() {
      const conditions = [
        { regex: /^.{8,14}$/, message: "at least 8 chars and less than 15 chars" },
        { regex: /[A-Z]/, message: "at least one uppercase alphabet character" },
        { regex: /[a-z].*[a-z]/, message: "at least two lowercase alphabet characters" },
        { regex: /\d/, message: "at least one numeric value" },
        { regex: /^[A-Z]/, message: "start with an uppercase alphabet" },
        { regex: /_/, message: "include the character '_'" }
      ];

      const failedConditions = conditions.filter(condition => !condition.regex.test(this.password));

      if (!this.username || !this.password) {
        alert("Please fill in both fields.");
        return false;
      }

      if (failedConditions.length > 0) {
        this.validationMessage = `The password is not valid:<br>${failedConditions.map(c => `- ${c.message}`).join('<br>')}`;
        return false;
      }

      this.validationMessage = '';
      return true;
    },
    */

   signUp() {
      var data = {
        username: this.username,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
<<<<<<< HEAD
      this.$router.push("/login");
=======
      // this.$router.push("/login");
      // Redirect to home page after signing up
      this.$router.push("/");
>>>>>>> d35a9e46a95793f78fa670bb54129a458ba05c8d
      //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  }, 
  }
</script>

<style scoped>
.signupBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 50px;
  margin-top: 5%;
  margin-left: 35%;
  margin-right: 35%;
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