<template>
  <div class="l-main">
    <div class="p-logo">
      <img src="../assets/images/hero/logo.png" alt="Rate Me Logo" srcset="">
    </div>
    <Nav/>
    <div class="p-hero">
      <div class="p-hero__overlay"></div>
      <img src="../assets/images/hero/hero.jpg" class="p-hero__img" alt="Main Hero" srcset="">
      <div class="p-hero__contents">
        <h1 class="p-hero__tagline">Engage yourself with someone</h1>
        <ul class="p-hero__subtagline">
          <li>Listen</li>
          <li>Participate</li>
          <li>Review</li>
        </ul>
        <router-link :to="{ name: 'register'}"><div class="p-hero__btn">Get Started</div></router-link>
      </div>
    </div>
    <div class="p-events" id="events">
      <h1 class="p-events__title">Events and Presentations</h1>
      <agile class="main" ref="main" :options="options1" :as-nav-for="asNavFor1">
        <div class="slide" v-for="(slide, index) in slides" :key="index" :class="`slide--${index}`">
          <img :src="slide" alt="">
        </div>
      </agile>
      <agile class="thumbnails" ref="thumbnails" :options="options2" :as-nav-for="asNavFor2">
        <div class="slide slide--thumbnail" v-for="(slide, index) in slides" :key="index" :class="`${index}`" @click="$refs.thumbnails.goTo(index)">
          <img :src="slide" alt="">
        </div>
      </agile>
    </div>
    <div class="p-news" id="news">
      <h1 class="p-news__title">News</h1>
      <div class="p-news__content">
        <div class="p-news__content-profile">
          <img src="../assets/images/gallery/news.jpg" alt="News Img">
          <h4>Mitsuha Miyamizu</h4>
        </div>
        <div class="p-news__content-text">
          <h1 class="p-news__content-title">Chatbot Project</h1>
          <p class="p-news__content-desc">
            Miyamizu’s projects stunned the viewers’ heart. Her project was one of the highlights of the 56th Batch Engineering Student Presentation.
            <br>
            <b>Chatbot</b> are usually stateful services remembering previous commands. A chatbot is a type of software that conducts a conversation via auditory or textual methods. Most of us have interacted with chatbots while online shopping or planning a holiday. Logistic includes tangible goods such as material equipment and supplies. Logistics can be benefited using chatbots by improving customer-facing operations and supply chain operations. Chatbots do not make mistakes and they are intuitive and easy to use. There are two modules in this online logistics system namely, Admin and Chatbot. Chat where we can chat using AI chatbot. Admin can login using credentials. There you can add questions and give main three keywords. We can enter the message by typing “hi” where AI chatbot will reply with hello greetings. As per the question asked, it will give response accordingly.
          </p>

          <div class="p-news__content-compare">
            <div class="p-news__content-compare-division">
              <h5>Disadvantages</h5>
              <ul>
                <li>User can get basis information by chatting.</li>
                <li>It is user friendly.</li>
                <li>This will save time and money.</li>
              </ul>
            </div>
            <div class="p-news__content-compare-division">
              <h5>Advantages</h5>
              <ul>
                <li>This application requires active internet connection.</li>
                <li>User needs to enter correct data or else it behaves abnormally.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-about" id="about">
      <div class="p-about__content">
        <h1 class="p-about__content-title">About Us</h1>
        <p><b>Rate Me</b> is a web service that provides <b>easy</b>, <b>efficient</b> and <b>hassle free</b> review for presenters. This service is inspired from the Nexseed’s engineering student presentation wherein the students showcase their web/ios applications.  The viewers of the presentation give review to each presenters based on their performance and the quality of their application. We offer systematic and digital way for giving reviews to the presenters. We are based on Nexseed’s  sofware development team. </p>
      </div>
      <img src="../assets/images/gallery/clip-programming.png" alt="">
    </div>
    <footer>© Rate Me Inc. 2020</footer>
  </div>
</template>
<script>
import Nav from './nav.vue'
import { VueAgile } from 'vue-agile'
export default {
  components: {
    Nav,
    agile: VueAgile
  },
  data: () => ({
    asNavFor1: [],
    asNavFor2: [],
    options1: {
      dots: false,
      fade: true,
      navButtons: false
    },
    options2: {
      autoplay: true,
      centerMode: true,
      dots: false,
      navButtons: false,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 5
          }
        },

        {
          breakpoint: 1000,
          settings: {
            navButtons: false
          }
        }
      ]
    },
    slides: [
      require('../assets/images/gallery/event1.jpg'),
      require('../assets/images/gallery/event2.jpg'),
      require('../assets/images/gallery/event3.jpg'),
      require('../assets/images/gallery/event4.jpg'),
      require('../assets/images/gallery/event5.jpg'),
      require('../assets/images/gallery/event6.jpg'),
      require('../assets/images/gallery/event7.jpg')
    ]
  }),
  mounted () {
    this.asNavFor1.push(this.$refs.thumbnails)
    this.asNavFor2.push(this.$refs.main)
  }

}
</script>
<style lang="scss" scoped>
@import '../assets/scss/project/_top.scss'
</style>
