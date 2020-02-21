<template>
  <div class="p-nav">
    <ul class="p-nav__items">
      <li>
        <a href="">Home</a>
      </li>
      <li>
        <a href="">Events</a>
      </li>
      <li>
        <a href="">News</a>
      </li>
      <li>
        <a href="">About</a>
      </li>
      <li>
        <a href="">Sign In</a>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.p-nav {
  position: absolute;
  top: 10px;
  right: 100px;
  z-index: 3;

  &__items {

    li {

      margin-left: 33px;
      display: inline-block;

      a {
        position: relative;
        color: #D8E0F6;
        font-weight: bold;
        font-size: 18px;
        font-family: 'Raleway';
        text-decoration: none;
        padding: 10px 0;

        &:before {
          transition: all .5s;
        }

        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 0%;
          content: '.';
          color: transparent;
          background: rgb(246, 244, 247);
          height: 2px;
          transition: width .5s;
        }

        &:hover:after {
          width: 100%;
        }
      }
    }
  }
}
</style>
