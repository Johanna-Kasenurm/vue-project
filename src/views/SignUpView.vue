<template>
    <div>
      <main>
        <div class="signupBox">
          <div class="signupinf">
            <h2>Signup</h2>
            <form>
              <label for="Email">Email:</label>
              <input class="logininput" type="text" placeholder="Email" v-model="email" required> <br>
              <label for="password">Password:</label>
              <input class="logininput" id="password" type="password" placeholder="Password" v-model="password" required>
            </form>
            <button id="signupButton" type="button" @click="validatePassword">Submit</button>
            <p id="validationMessage" v-html="validationMessage"></p>
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
        validationMessage: '',
      };
    },
    methods: {
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
  
        if (!this.email || !this.password) {
          alert("Please fill in both fields.");
          return;
        }
  
        if (failedConditions.length > 0) {
          this.validationMessage = `The password is not valid:<br>${failedConditions.map(c => `- ${c.message}`).join('<br>')}`;
        } else {
          window.location.href = 'index.html'; // Replace with router navigation if applicable
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
    /*border-radius: 1pc;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2%;
    padding-inline: 40px;
    font-size: larger;
  }
  
  .signupinf p {
    font-size: medium;
  }
  
  textarea {
    resize: none;  
  }
  
  button {
    margin-top: 10px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #42b983;
    color: azure;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2c3e50;
  }
  </style>