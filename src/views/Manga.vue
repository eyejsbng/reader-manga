<template>
  <div class="body">
    <div class="container">
      <div class="mx-auto col-md-8">
        <div class="row pt-5">
          <div class="col-md-2">
            <div class="mx-auto">
              
              <div
                v-lazy-container="{
                  selector: 'img'
                }"
                v-if="!loading"
              >
                <div class="image">
                  <img
                    :data-src="mangaInfo.thumbnail"
                    class="image"
                    :data-error="
                      require('../assets/svg/undraw_page_not_found_su7k.svg')
                    "
                    :data-loading="
                      require('../assets/svg/Interwind-1s-200px.svg')
                    "
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="info col-md-6 mt-1 mx-auto">
            
            <div v-if="!loading" class="info">
              <h2>{{ mangaInfo.title }}</h2>
              <h5 style="line-height:2em;height:2em;overflow:hidden;">
                {{ mangaInfo.alternativeName }}
              </h5>
              <h5>Author: {{ mangaInfo.author }}</h5>
              <h5>Status: {{ mangaInfo.status }}</h5>
              <span
                v-for="(g, i) in mangaInfo.genres"
                :key="i"
                class="badge rounded-pill btn-outline bg-light text-dark"
              >
                {{ g.genre }}
              </span>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            
            <p class="desc" v-if="!loading" style="color:#707070">
              {{ mangaInfo.description }}
            </p>
          </div>
        </div>
        <div v-if="!loading">
          <h3 style="color:#383838;font-weight:700">Chapters</h3>
          <div class="row">
            <div class="col-md-12">
              <table class="fixed_header table table-striped table-hover">
                <thead></thead>
                <tbody>
                  <tr v-for="(chapter, i) in mangaInfo.chapters" :key="i">
                    <td @click="displayChapter(chapter)">
                      Chapter {{ chapter.chapter }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";

export default {
  name: "Manga",
  data() {
    return {
      url: "https://warm-refuge-03594.herokuapp.com/api/manga/",
      mangaInfo: [],
      loading: false
    };
  },
  methods: {
    getInfo() {
      const slug = router.currentRoute.params.slug;
      this.loading = true;
      axios
        .get(this.url + slug)
        .then(resp => {
          this.mangaInfo = resp.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    displayChapter(e) {
      const link = e.link;
      let chapter = link.split("/");
      let chapterNumber = chapter[chapter.length - 1];
      router.push({
        name: "Chapter",
        params: {
          chapter: chapterNumber,
          link: this.mangaInfo.chapters,
          mangaTitle: this.mangaInfo.title
        }
      });
    }
  },
  created() {
    this.getInfo();
  },
  watch: {
    $route() {
      if (router.currentRoute.fullPath != "/") {
        this.getInfo();
      }
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 625px) {
  .containers {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h5,
  h4,
  h3,
  h2 {
    color: #4a4f4c !important;
  }
  span {
    background-color: #bb25e8 !important;
    color: white !important;
  }
  .info {
    margin-top:20px;
  }
  .image {
    text-align: center !important;
  }
}
.skeleton {
  margin: 10px;
}
.badge {
  margin: 5px;
}
.manga-container {
  margin-top: 30px;
}
h5,
h4,
h3,
h2,
p {
  color: #e6e6e6;
}
h2 {
  font-weight: 700;
}
img {
  border-radius: 10px;
  height: 350px;
  width: 260px;
  background-color: #bb25e8;
  box-shadow: -1px 10px 22px 2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 10px 22px 2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 10px 22px 2px rgba(0, 0, 0, 0.75);
}
.fixed_header tbody {
  display: list-item;

  overflow: auto;
  height: 400px;
}

.fixed_header tr td {
  width: 100em;
}
.body {
  background: linear-gradient(rgba(0, 0, 0, 0.8) 100%, rgba(0, 0, 0, 0.8) 100%),
    url("../assets/bg.png");
  height: 380px;
}
tr:hover {
  cursor: pointer;
}
</style>
