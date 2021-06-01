<template>
  <div>
    <div>
      <div>
        <div class="mx-auto pt-2 container row">
          <div class="col-md-8">
            <router-link to="/" style="text-decoration: none;"
              ><h2 class="brand">MangaSub</h2></router-link
            >
          </div>
          <div class="col-md-4">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                v-model="keyword"
                placeholder="Search Manga ex. 'Naruto'"
                @keypress.enter="search"
              />
              <!-- <button class="btn btn-primary" type="button" @click="search">
              Search
            </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import router from "./router";
export default {
  data() {
    return {
      keyword: "",
      router: ""
    };
  },
  created() {},
  methods: {
    search() {
      if (
        this.keyword != "" &&
        router.currentRoute.fullPath != "/search?q=" + this.keyword
      ) {
        router.push({ name: "Search", query: { q: this.keyword } });
      }
    }
  },
  watch: {
    $route() {
      this.router = router.currentRoute.name;
    }
  }
};
</script>

<style scoped>
.brand {
  color: #bb25e8;
  font-weight: 800;
}
.form-control {
  border-radius: 20px;
}
.nav-bar {
  opacity: 0.5;
}
.sticky-top {
  opacity: 0.9;
}

.brand:hover {
  color: #f7f7f7;
  text-shadow: 2px 2px #bb25e8;
}
.btn {
  background-color: #bb25e8;
  border-color: #bb25e8;
}
.form-control:focus {
  outline: none !important;
  border: 1px solid #bb25e8;
  box-shadow: 0 0 10px #bb25e8;
}
.btn:hover {
  background-color: gray;
}
.btn:active {
  background-color: gray;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);

  opacity: 0;
}
</style>
