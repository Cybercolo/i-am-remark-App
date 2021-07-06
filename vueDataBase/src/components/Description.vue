<template>
<div>
  <p>{{ Remarkable }}</p>
  <p>{{ Country }}</p>
  <h5>{{ Name }}</h5>
</div>
</template>

<script>
import axios from "axios";

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
    axios
      .get("http://localhost:8082")
      .then(
        response => (
          (response.remarkable = localStorage.getItem("remarkable")),
          (this.Remarkable = response.remarkable),
          (response.country = localStorage.getItem("country")),
          (this.Country = response.country),
          (response.name = localStorage.getItem("name")),
          (this.Name = response.name)
        )
      );
  }
};
</script>

<style scoped></style>
