<template>
  <div class="container">
    <h3 style="color:black;">Search Results</h3>

    <h5 style="color:black;">Keyword: {{ link }}</h5>

    <div class="mx-auto row">
      <div
        class="manga col-md-3"
        v-for="(manga, i) in mangas"
        :key="i"
        @click="displayManga(manga)"
      >
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
      <infinite-loading @infinite="loadMore">
     
        <div slot="no-more">No more data (>‿◠)✌</div>
        <div slot="no-results"><p>No results!</p>¯\_( ͡❛ ͜ʖ ͡❛)_/¯</div>
      </infinite-loading>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";
import InfiniteLoading from "vue-infinite-loading";

export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      url: "https://warm-refuge-03594.herokuapp.com/api/manga/search/",
      link: "",
      mangas: [],
      page: 1
    };
  },
  created() {
    this.link = router.currentRoute.query.q;
  },
  methods: {
    search(keyword) {
      axios.get(this.url + keyword).then(resp => {
        this.mangas = resp.data.data;
        this.page += 1;
      });
    },
    loadMore($state) {
      axios.get(this.url + this.link + "/" + this.page).then(resp => {
        const data = resp.data.data;
        if (data.length) {
          this.mangas = this.mangas.concat(data);
          this.page += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    displayManga(manga) {
      let link = manga.link;
      let res = link.split("/");
      res = res[res.length - 1];
      router.push("/manga/" + res);
    }
  },
  watch: {
    $route() {
      this.page = 1;
      this.link = router.currentRoute.query.q;
      if (router.currentRoute.fullPath != "/search?q=" + this.link) {
        this.search(this.link);
      }
      this.search(this.link);
    }
  }
};
</script>
<style scoped>
h5 {
  color: black;
}
p {
  color: black;
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
  margin-bottom: 10px;
  color: #bababa;
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
</style>
