<template>
<div>
  <h2>I'm Remarkable because</h2>
  <p>{{ Remarkable }}</p>
  <h5>{{ Name }}</h5>
</div>
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

<style scoped>
p {
  max-width: 100%;
}

h2 {
  margin: 5px 0px 5px 0px;
}
</style>
