<template>
<<<<<<< HEAD
  <div>
    <p>{{ Remarkable }}</p>
    <p>{{ Country }}</p>
    <h5>{{ Name }}</h5>
  </div>
=======
<div>
  <p>{{ Remarkable }}</p>
  <p>{{ Country }}</p>
  <p>{{ Name }}</p>
</div>
>>>>>>> 40d67d945c470dd6979f3ac3baf11f95116d3786
</template>

<script>
//import axios from "axios";

export default {
  name: "Description",

  data() {
    return {
      Remarkable: null,
      Name: null,
      Country: null
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
    this.Remarkable = localStorage.getItem("remarkable"),
    this.Country = localStorage.getItem("country"),
    this.Name = localStorage.getItem("name")
  }
};
</script>

<style scoped></style>
