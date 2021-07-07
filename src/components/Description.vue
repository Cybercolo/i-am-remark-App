<template>
<div>
  <p>{{ Remarkable }}</p>
  <p>{{ Country }}</p>
  <p>{{ Name }}</p>
</div>
</template>

<script>
//import axios from "axios";

export default {
  name: "Description",

  data() {
    return {
      Remarkable: "",
      Name: "",
      Country: ""
    };
  },
  mounted() {
    /*axios.get("http://localhost:8080/")
      .then(response => (
        response.remarkable = localStorage.getItem("remarkable"),
        this.Remarkable = response.remarkable,
        response.country = localStorage.getItem("country"),
        this.Country = response.country,
        response.name = localStorage.getItem("name"),
        this.Name = response.name
      )
    );*/
    this.Remarkable = localStorage.getItem("remarkableLS"),
      this.Country = localStorage.getItem("countryLS"),
      this.Name = localStorage.getItem("nameLS")
  }
};
</script>

<style scoped></style>
