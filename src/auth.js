
export default {
    user: { authenticated: false }, // Algseis: mitteautentitud
  
    // Funktsioon, mis kontrollib, kas kasutaja on autentitud
    authenticated: async function () {
      try {
        const response = await fetch("http://localhost:3000/auth/authenticate", {
          credentials: 'include', // Kasutame küpsiseid autentimiseks
        });
        const data = await response.json();
        this.user.authenticated = data.authenticated;
        console.log("Authentication status:", data.authenticated);
      } catch (e) {
        console.error("Error authenticating:", e);
        this.user.authenticated = false; // Kui tõrkub, siis loeme, et kasutaja ei ole autentitud
      }
      return this.user.authenticated;
    },
  };
  