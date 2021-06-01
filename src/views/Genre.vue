<template>
  <div class="mx-auto container">
    <div class="row ">
      <div class="col-md-12 genre-title">
        <h3>Genre / {{ genre }}</h3>
      </div>
      <div class="mx-auto manga col-sm-6" v-for="(manga, i) in mangas" :key="i" @click="displayManga(manga)">
        <div
          v-lazy-container="{
            selector: 'img'
          }"
        >
          <img
            :data-src="manga.thumbnail"
            class="rounded card-img-top"
            data-error="https://media.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif"
            data-loading="https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/source.gif"
          />
        </div>
        <div class="manga-body">
          <h5 class="title" style="line-height:2em;height:2em;overflow:hidden;">
            {{ manga.name }}
          </h5>
          <p class="card-text">{{ manga.latestChapter }}</p>
        </div>
      </div>
      <infinite-loading @infinite="loadMore"></infinite-loading>
    </div>
  </div>
</template>
<script>
import router from "../router";
import axios from "axios";
import InfiniteLoading from "vue-infinite-loading";
export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      genre: "",
      page: 1,
      mangas: [],
      url: "https://warm-refuge-03594.herokuapp.com/api/manga/genre/"
    };
  },
  created() {
    this.genre = router.currentRoute.params.genre;
  },
  methods: {
    fetchData() {
      axios.get(this.url + this.genre + "/" + this.page).then(resp => {
        this.mangas = resp.data.data;
        this.page += 1;
      });
    },
    displayManga(manga) {
      let link = manga.link;
      let res = link.split("/");
      res = res[res.length - 1];
      router.push("/manga/" + res);
    },
    loadMore($state) {
      axios.get(this.url + this.genre + "/" + this.page).then(resp => {
        const data = resp.data.data;
        if (data.length) {
          this.mangas = this.mangas.concat(data);
          this.page += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    }
  },
  watch: {
    $route() {
      this.page = 1;
      this.genre = router.currentRoute.params.genre;
      this.fetchData();
    }
  }
};
</script>
<style scoped>
.sticky-top {
  top: 5em;
}

.manga-body {
  margin-top: 10px;
}
.manga {
  top: 0;
  position: relative;
  margin-bottom: 10px;
  width: 14rem;
  transition: ease-in-out 0.5s;
}
.title {
  color: #666666;
  font-weight: 700;
}
.card-text {
  margin-top: -10px;
}
img {
  width: 200px;
  height: 250px;
  transition: ease-in-out 0.5s;
  z-index: 100;
  box-shadow: 2px 9px 12px -6px rgba(0, 0, 0, 0.98);
  -webkit-box-shadow: 2px 9px 12px -6px rgba(0, 0, 0, 0.98);
  -moz-box-shadow: 2px 9px 12px -6px rgba(0, 0, 0, 0.98);
}

img:hover {
  transform: ease scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
}
h5,
p {
  color: #666666;
}
h3 {
  color: #666666;
  font-weight: 700;
}
</style>
