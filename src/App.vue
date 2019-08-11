<template>
  <div id="layout">
    <!-- Menu toggle -->
    <div id="menu">
      <div class="pure-menu custom-restricted-width">
          <span class="pure-menu-heading">The free DMS</span>

          <ul class="pure-menu-list">
              <li class="pure-menu-item"><router-link to="/"  class="pure-menu-link">Home</router-link></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">Messenger</a></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">Sports</a></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">Finance</a></li>
              <li class="pure-menu-heading">More Sites</li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">Games</a></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">News</a></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link">OMG!</a></li>
          </ul>
      </div>
    </div>
    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  -->
    <div id="main">
      <router-view />
    </div>
  </div>
</template>

<style>
#menu {
  float:left;
}
</style>
