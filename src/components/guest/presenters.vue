<template>
  <div class="l-main">
    <h1>Presenters</h1>
    <table id="presenters">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Course</th>
      </tr>
      <tr v-for="(presenter, index) in presenters" :key="index" >
        <td>{{ presenter.name}}</td>
        <td>{{ presenter.email}}</td>
        <td>{{ presenter.course}}</td>
      </tr>
    </table>
    <p v-if="!presenters">
      No record...
    </p>
  </div>
</template>
<script>
import { db } from '../../firebase'
export default {
  data: () => ({
    presenters: ''
  }),
  created () {
    this.fetchPresenters(this.$route.params.id)
  },
  methods: {
    fetchPresenters (id) {
      db.collection(`events/${id}/presenters`)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(docChange => {
            const presenters = docChange.doc.data()
            presenters.id = docChange.doc.id
            if (docChange.type === 'added') {
              this.presenters = [...this.presenters, presenters]
            } else if (docChange.type === 'removed') {
              this.presenters = this.presenters.filter(t => t.id !== presenters.id)
            } else if (docChange.type === 'modified') {
              this.presenters = this.presenters.map(t => t.id === presenters.id ? presenters : t)
            }
          })
        })
    }
  },
  mounted () {
    this.fetchPresenters()
  }
}
</script>
<style lang="scss" scoped>
.l-main {
  padding: 50px 25px;
  p {
    text-align:  center;
  }

  h1 {
    font-family: Raleway;
    font-size: 38px;
    font-weight: normal;
    text-align: left;
  }
}
#presenters {
  font-family: Quicksand, Raleway, Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 25px 0;

  td {
    font-size: 15px;
  }
}

.view-presenters {
  font-size: 15px;
  background: #49006B;
  color: #FFFEFE;
  transition: background .5s ease-in-out 0s;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 10px;

  &:hover {
    background: #FFFEFE;
    border: 1px solid #49006B;
    color: #49006B;
    box-sizing: border-box;
  }
}

#presenters td, #presenters th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

#presenters tr:nth-child(even){background-color: #f2f2f2}

#presenters tr:hover {background-color: #ddd}

#presenters th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #49006B;
  color: white;
  font-size: 18px;
}
</style>
