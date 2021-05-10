<template>
  <div class="main">
    <h1 class="p-review__title"><b>Current Event:</b> {{event.name}}</h1>
    <h3>List of Presenters:</h3>
    <div v-if="presenters">
      <div class="p-presenter__list" v-for="(item, index) in presenters" :key="item.id" :index="index" >
        <div class="p-presenter__list-item">
          <div class="p-presenter__list-item-circle">{{index + 1}}</div>
          <div class="p-presenter__list-item-block">
            <p>{{item.name}} - <b>{{item.project}}</b></p>
            <img src="../../../assets/images/icons/plus.svg" alt="Accordion Button" class="accordion">
          </div>
        </div>
        <ReviewForm :presenter_id="item.id" :event_id="event.id"/>
      </div>
    </div>
    <div v-else>No Presenters</div>
    <Loader v-if="loading" />
  </div>
</template>
<script>
import { db } from '../../../firebase'
import Loader from '../../loader'
import ReviewForm from '../../guest/review/component/form'

export default {
  components: {
    Loader,
    ReviewForm
  },
  data: () => ({
    presenters: '',
    loading: false,
    event: {
      id: '',
      name: ''
    }
  }),
  methods: {
    async fetchActiveEvent () {
      try {
        const eventRef = await db.collection('events')
        const snapshot = await eventRef.where('active', '==', true).get()
        if (snapshot.empty) {
          console.log('No Active Event!')
        } else {
          snapshot.docs.forEach(docSnapshot => {
            this.event.id = docSnapshot.id
            this.event.name = docSnapshot.data().event_name
          })
          await this.fetchPresenters(this.event.id)
        }
      } catch (err) {
        console.log(err)
      }
    },
    fetchPresenters (id) {
      this.loading = true
      setTimeout(() => {
        db.collection(`events/${id}/presenters`)
          .onSnapshot(snapshot => {
            if (snapshot.empty) {
              console.log('No presenters!')
            } else {
              snapshot.docChanges().forEach(docChange => {
                // console.log(docChange.doc.data())
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
            }
          })
        this.loading = false
      }, 500)
    }
  },
  mounted () {
    this.fetchActiveEvent()
  }
}
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  text-align: left;
  padding: 50px 25px;

  h3 {
    margin-bottom: 25px;
  }

  b {
    font-weight: bold;
  }

  .p-{

    &review {
      &__title {
        font-weight: 500;
        font-size: 24px;
        color: #000000;
        margin-bottom: 25px;
      }
    }
    &presenter__list {
      margin-bottom: 25px;

      &-item {
        position:  relative;
        display: flex;
        align-items: center;
        margin-bottom: 25px;

        &-circle {
          align-self: center;
          width: 105px;
          height: 105px;
          background: #0061BA;
          font-family: Quicksand;
          font-weight: normal;
          font-size: 48px;
          color: #FFFFFF;
          border-radius: 50%;
          line-height: 105px;
          text-align: center;
        }

        &-block {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          width: calc(100% - 160px);
          background: #D8E0F7;
          border-radius: 20px;
          line-height: 50px;
          padding: 0 25px 0 70px;
          margin-left: -50px;
          z-index: -1;

          p {
            font-family: Raleway;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            color: #000000;
          }

          img {
            width: 32px;
            height: 32px;
            align-self: center;
          }
        }
      }
    }
  }
}
</style>
