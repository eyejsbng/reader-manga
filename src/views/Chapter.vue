<template>
  <div class="body" align="center">
    
    <div v-if="!loading" class="pt-5 col-md-7">
      <div v-for="(m, i) in images" :key="i">
        <img :src="m" class="card-img-top" referrerpolicy="no-referrer" />
      </div>
    </div>
    <div v-else>
      <div class="col-md-6 load">
        <div class="mx-auto text-load">
          <img
            class="loading-img"
            src="https://media.giphy.com/media/a6pzK009rlCak/source.gif"
            alt=""
          />
          <h5 style="color:white;">Loading images....</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";
export default {
  name: "Chapter",
  props: ["link", "mangaTitle"],
  data() {
    return {
      images: [],
      url: "https://warm-refuge-03594.herokuapp.com/api/chapter/",
      title: "Sample",
      loading: false
    };
  },
  created() {
    this.getImages();
    const currentRoute = router.currentRoute.params.chapter.split("-");
    const title = currentRoute;
  },
  methods: {
    selectChapter(link) {
      let chapter = link.split("/");
      let chapterNumber = chapter[chapter.length - 1];
      router.replace({
        name: "Chapter",
        params: {
          chapter: chapterNumber,
          link: this.link,
          mangaTitle: this.mangaInfo.title
        }
      });
    },
    getImages() {
      this.loading = true;
      const currentRoute = router.currentRoute.params.chapter;
      axios.get(this.url + currentRoute).then(resp => {
        this.images = resp.data.data;
        this.loading = false;
      });
    }
  },
  watch: {
    $route() {
      const currentRoute = router.currentRoute.params.chapter;
      this.title = currentRoute;
      this.getImages();
    }
  }
};
</script>
<style scoped>
.load {
  height: 100em;
}
.text-load {
 padding-top:200px;
}
.loading-img {
  height: 200px;
  border-radius: 50px;
}
.body {
  background: linear-gradient(rgba(0, 0, 0, 0.9) 100%, rgba(0, 0, 0, 0.9) 100%),
    url("../assets/bg.png");
  background-attachment: fixed;
}
</style>
