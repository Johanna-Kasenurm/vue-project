<template>
    <footer>
        <div class="contactUs">
            <h4>Contact Us</h4>
            <p>example.example@gmail.com</p>
            <p>+372 1234 5678</p>
        </div>
        <div class="legal">
            <h4>Legal Specifications</h4>
            <p>Terms of Serfice</p>
            <p>Privacy Policy</p>
        </div>
        <div class="team">
            <h4>Team Members</h4>
            <p>Johanna Kasenurm</p>
            <p>Rihard Lainemäe</p>
            <p>Karl Prink</p>
        </div>
    </footer>
</template>

<script>

</script>

<style scoped>
footer {
    background-color:rgb(103, 124, 139);
    display: flex;
    flex-direction: row;
    justify-content:center;
    margin-top: auto;
    width: 100%;
    padding-top: 1%;
    padding-bottom: 1%;
}
div{
    margin-left: 4%;
    color: azure;
}
div p {
    font-size: small;
}
h4 {
    margin-bottom: 7%;
}
</style>