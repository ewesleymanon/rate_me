<template>
  <div class="l-main">
    <h1>Events</h1>
    <table id="events">
      <tr>
        <th>Event Name</th>
        <th>Date & Time</th>
        <th>Venue</th>
        <th>Action</th>
      </tr>
      <tr v-for="(event, index) in displayedEvents" :key="index" >
        <td>{{ event.event_name}}</td>
        <td>{{ event.date_time.toDate()}}</td>
        <td>{{ event.venue}}</td>
        <td><router-link :to="{ name: 'guest_presenters', params: {id: event.id}}"><button class="view-presenters">View Presenters</button></router-link></td>
      </tr>
    </table>
    <nav aria-label="Page Navigation">
      <ul class="pagination">
        <li class="page-item">
          <button type="button" class="page-link prev" :disabled="page == 1" @click="page--"> Previous </button>
        </li>
        <li class="page-item">
          <button type="button" class="page-link" v-for="(pageNumber, index) in pages.slice(page-1, page+5)" :key="index" @click="page = pageNumber"> {{pageNumber}} </button>
        </li>
        <li class="page-item">
          <button type="button" @click="page++" :disabled="page >= pages.length" class="page-link next"> Next </button>
        </li>
      </ul>
    </nav>
    <Loader v-if="loading" />
  </div>
</template>
<script>
import { db } from '../../firebase'
import Loader from '../loader'
export default {
  components: {
    Loader
  },
  data: () => ({
    events: '',
    page: 1,
    perPage: 10,
    pages: [],
    loading: false
  }),
  methods: {
    fetchEvents () {
      this.loading = true
      setTimeout(() => {
        db.collection('events').onSnapshot(snapshot => {
          snapshot.docChanges().forEach(docChange => {
            const events = docChange.doc.data()
            events.id = docChange.doc.id
            if (docChange.type === 'added') {
              this.events = [...this.events, events]
            } else if (docChange.type === 'removed') {
              this.events = this.events.filter(t => t.id !== events.id)
            } else if (docChange.type === 'modified') {
              this.events = this.events.map(t => t.id === events.id ? events : t)
            }
          })
        })
        this.loading = false
      }, 2000)
    },
    setPages () {
      const numberOfPages = Math.ceil(this.events.length / this.perPage)
      console.log(this.events.length)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate (events) {
      const page = this.page
      const perPage = this.perPage
      const from = (page * perPage) - perPage
      const to = (page * perPage)
      return events.slice(from, to)
    }
  },
  computed: {
    displayedEvents () {
      return this.paginate(this.events)
    }
  },
  watch: {
    events () {
      this.setPages()
    }
  },
  filters: {
    trimWords (value) {
      return value.split(' ').splice(0, 20).join(' ') + '...'
    }
  },
  mounted () {
    this.fetchEvents()
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/project/_guest-events.scss';
</style>
