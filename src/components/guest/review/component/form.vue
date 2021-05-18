<template>
  <div class="p-review__form">
    <form action="#">
      <div class="error" v-show="error">{{error}}</div>
      <div class="p-review__form-group">
        <p class="p-review__field-title">Good Point</p>
        <textarea type="text" rows="5" class="p-review__field" name="good_point" v-model="rate.good_point" placeholder="Enter your comments here"></textarea>
      </div>
      <div class="p-review__form-group">
        <p class="p-review__field-title">Improvement Point</p>
        <textarea type="text" rows="5" class="p-review__field" name="kaizen_point" v-model="rate.kaizen_point" placeholder="Enter your comments here"></textarea>
      </div>
      <div class="p-review__form-group">
        <p class="p-review__field-title">Rate Me</p>
        <star-rating
          v-model="rate.rating"
          :increment="1"
          :star-size="50"
          >
        </star-rating>
      </div>
      <div class="p-review__field-submit" :class="{ 'c-submit__btn--disabled' : loading, 'p-review__field-submit--submitted' : submit_status }" :disabled="loading" @click.prevent="submit">
        <span v-show="loading"><img class="spinner spinner__submit" src="../../../../assets/images/icons/spinner.svg" alt="Spinner"></span>
        {{ submit_txt}}
      </div>
    </form>
  </div>
</template>
<script>
import { db } from '../../../../firebase'
import { mapGetters } from 'vuex'
import StarRating from 'vue-star-rating'
export default {
  data: () => ({
    loading: false,
    rate: {
      good_point: '',
      kaizen_point: '',
      rating: 0
    },
    error: '',
    submit_txt: 'Submit',
    presenter: '',
    flag1: false,
    flag2: false,
    flag3: false
  }),
  components: {
    StarRating
  },
  props: {
    presenter_id: String,
    event_id: String
  },
  computed: {
    good_point () {
      return this.rate.good_point
    },
    kaizen_point () {
      return this.rate.kaizen_point
    },
    rating () {
      return this.rate.rating
    },
    submit_status () {
      /**
       * Return true if there were changes in the data
       * true = Submitted
       * false = Submit
       */
      if (this.flag1 && this.flag2 && this.flag3) {
        return true
      } else {
        return false
      }
    },
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    async fetchReview () {
      try {
        const reviewRef = await db.collection('reviews').doc(this.event_id)
          .collection('presenter_ids').doc(this.presenter_id)
          .get().then(snapshot => {
            if (snapshot.exists) {
              if (snapshot.data().good_point) {
              // this.presenter = snapshot.data()
                this.rate.good_point = snapshot.data().good_point
                this.rate.kaizen_point = snapshot.data().kaizen_point
                this.rate.rating = snapshot.data().rating
                this.submit_txt = 'Submitted'
                this.flag1 = true
                this.flag2 = true
                this.flag3 = true
                console.log(this.flag1, this.flag2, this.flag3)
              } else {
                this.submit_txt = 'Submit'
                this.flag1 = false
                this.flag2 = false
                this.flag3 = false
              }
            } else {
              console.log('Document not found!')
            }
          })
        console.log(reviewRef)
      } catch (err) {
        console.log(err)
      }
    },
    async submit () {
      try {
        if (this.rate.good_point !== '' && this.rate.kaizen_point !== '' && this.rate.rating !== '') {
          this.loading = true
          this.error = null
          const presenterRef = await db.collection('events').doc(`${this.event_id}`).collection('presenters').doc(`${this.presenter_id}`)
          const setRating = await presenterRef.set(this.rate, { merge: true })
          console.log(setRating)
          this.fetchReview()
          this.loading = false
          this.submit_txt = 'Submitted'
        } else {
          this.loading = false
          this.error = 'All fields are required.'
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.fetchReview()
  },
  watch: {
    good_point: function (newVal, oldVal) {
      if (this.presenter.good_point !== newVal) {
        this.submit_txt = 'Submit'
        this.flag1 = false
      } else {
        this.flag1 = true
      }
    },
    kaizen_point: function (newVal, oldVal) {
      if (this.presenter.kaizen_point !== newVal) {
        this.submit_txt = 'Submit'
        this.flag2 = false
      } else {
        this.flag2 = true
      }
    },
    rating: function (newVal, oldVal) {
      if (this.presenter.rating !== newVal) {
        this.submit_txt = 'Submit'
        this.flag3 = false
      } else {
        this.flag3 = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }
.p-review {
  &__form {
    padding: 0 0 0 50px;

    &-group {
      margin-bottom: 25px;
    }
  }

  &__field {
    border: 1px solid #000000;
    background: #FFFFFF;
    font-weight: normal;
    font-size: 17px;
    color: #5B5B5B;
    width: 100%;
    min-height: 50px;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 15px;
    resize: none;

    &:focus {
      outline: 0;
    }

    &-title {
      font-weight: bold;
      font-size: 17px;
      color: #000000;
      margin-bottom: 10px;
    }

    &-submit {
      width: 170px;
      height: 40px;
      border: 1px solid #000000;
      box-sizing: border-box;
      border-radius: 20px;
      font-weight: 500;
      font-size: 17px;
      line-height: 40px;
      color: #000000;
      text-align: center;
      cursor: pointer;
      transition: background 400ms ease-in-out, color 400ms ease-in-out;

      &--submitted {
        background: #0061BA;
        color: #ffffff;
        border: 0;
      }
    }
  }
}
.error {
  background: #FF9494;
  color: #000000;
  width: 100%;
  text-align: left;
  padding: 15px;
  margin-bottom: 15px;
  vertical-align: middle;
  border-left: 10px solid #402829;
  border-top: 0;
  box-sizing: border-box;
  font-size: 14px;
}
</style>
