<template>
<div id="card-container" class="card-container">
  <div class="card" v-for="person in people" :key="person">
    <p>{{ person.description }}</p>
    <br>
    <p>{{ person.country }}</p>
    <br>
    <h5>{{ person.name }}</h5>
  </div>
</div>
</template>

<script>
export default {
  name: 'Card',
  data: function() {
    return {
      people: [{
        "name": "Mei",
        "description": "I 'm remarkable because I decided to follow my dreams and becore and artist.",
        "country": "China"
      }, {
        "name": "Sam ",
        "description": "I 'm remarkable because I'm self confident after facing years and years of bullying.",
        "country": "Holand"
      }, {
        "name": "Zara",
        "description": "I'm remarkable because I was the first girl in my neightbourhood to go to college.",
        "country": "India"
      }, {
        "name": "Mayra",
        "description": "I'm remarkable because I help my parents at work.",
        "country": "India"
      }, {
        "name": "Leon",
        "description": "I'm remarkable because soy un gato persa y solo como y duermo :3 .",
        "country": "Greek"
      }, {
        "name": "Anna",
        "description": "I'm remarkable because I don't drink alcohol",
        "country": "USA"
      }, {
        "name": "Irma",
        "description": "I'm remarkable because I'm finishing my Bachelors in a couple of months while having depression.",
        "country": "Latvia"
      }, {
        "name": "Velvet",
        "description": "I'm remarkable because I'm queer.",
        "country": "Russia"
      }, {
        "name": "Julie",
        "description": "I'm remarkable because I love to play basketball and noone else does.",
        "country": "France"
      }, {
        "name": "Lucia",
        "description": "I'm remarkable because I work since  i was 15yo.",
        "country": "Spain"
      }, {
        "name": "Mark",
        "description": "I'm remarkable because I got A+ in Maths.",
        "country": "Europe"
      }, {
        "name": "David",
        "description": "I'm remarkable because I take care of my disabled cousin.",
        "country": "Spain"
      }]
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  overflow: hidden;
}

.card-container {
  position: fixed;
  overflow: hidden;
  display: flex;
}

p {
  float: left;
}

.card {
  width: 100vw;
  padding: 120px 20vw 0 20vw;
}

h5 {
  font-size: 1em;
  margin: 0;
  margin-top: 20px;
}
</style>
