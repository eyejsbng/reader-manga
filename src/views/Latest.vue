<template>
  <div class="container">
    <div class="latest-top row sticky-top">
      <h3 style="color:#383838;font-weight:700">Latest Update</h3>
    </div>
    <div class="row">
      
      <div class="col-md-9">
        <div class="row">
          <div class="skeleton" v-if="loading">
        <div v-for="n in 4" :key="n + '-latest-skeleton'">
         
          <vue-skeleton-loader
            color="rgb(230, 230, 230)"
            wave-color="rgb(247, 247, 247)"
            :rounded="true"
            :width="200"
            :height="280"
          />
          <div style="margin-top:10px;">
            <vue-skeleton-loader
              color="rgb(230, 230, 230)"
              wave-color="rgb(247, 247, 247)"
              :rounded="true"
              :width="180"
              :height="20"
            />
          </div>
          <div style="margin-top:10px;">
            <vue-skeleton-loader
              color="rgb(230, 230, 230)"
              wave-color="rgb(247, 247, 247)"
              :rounded="true"
              :width="80"
              :height="20"
            />
          </div>
          </div>
      
      </div>
          <div
            class="col-md-3"
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
                class="manga-image rounded card-img-top"
                :data-error="require('../assets/svg/image-not-found.svg')"
                :data-loading="require('../assets/svg/Interwind-1s-200px.svg')"
              />
            </div>
            <div class="manga-body">
              <h5
                class="title"
                style="line-height:2em;height:2em;overflow:hidden;"
              >
                {{ manga.name }}
              </h5>
              <p class="card-text">{{ manga.latestChapter }}</p>
            </div>
          </div>
          <infinite-loading v-if="!loading" @infinite="loadMore"></infinite-loading>
        </div>
      </div>

      <div class="genre col-md-3 sticky-top" style="height:100vh">
        <div class="container">
          <h4 style="color:#383838">Genre</h4>
          <div v-if="!loading">
            <div class="genre-item">
              <span
                v-for="g in genre"
                :key="g"
                class="btn btn-primary btn-sm"
                style="margin:5px;"
                @click="selectGenre(g)"
                >{{ g }}</span
              >
            </div>
          </div>
          <div class="fb-card" v-if="loading">
            <div class="loader" v-for="n in 6" :key="n">
              <vue-skeleton-loader
                color="rgb(230, 230, 230)"
                wave-color="rgb(247, 247, 247)"
                :width="Math.floor(Math.random() * (130 - 80) + 80)"
                :height="20"
                :rounded="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import genre from "../utils/genre";
import InfiniteLoading from "vue-infinite-loading";
import router from "../router";

const url = "https://warm-refuge-03594.herokuapp.com/api/manga/latest/";

function replace(val) {
  let slug = val;
  slug = slug.replace(/\s/g, "-");
  return slug;
}

function getLink(val) {
  let link = val.link;
  let res = link.split("/");
  res = res[res.length - 1];
  return res;
}

export default {
  name: "Latest",
  components: {
    InfiniteLoading
  },
  data() {
    return {
      page: 1,
      mangas: [],
      loading: false,
      genre: genre
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      axios
        .get(url)
        .then(resp => {
          const data = resp.data.data;
          this.mangas = data;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    loadMore($state) {
      axios.get(url + this.page).then(resp => {
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
    selectGenre(g) {
      const slug = replace(g);
      router.push("/genre/" + slug);
    },
    displayManga(manga) {
      const res = getLink(manga);
      router.push("/manga/" + res);
    }
  }
};
</script>
<style scoped>
.sticky-top {
  margin-top: 10px;
}
.latest-top {
  height: 50px;
  background-color: #f7f7f7;
}
.manga {
  top: 0;
  position: relative;
  margin-bottom: 10px;
  width: 14rem;
  transition: ease-in-out 0.5s;
}
.manga-image {
  width: 200px;
  height: 250px;
  transition: ease-in-out 0.5s;
  box-shadow: 1px 4px 7px 0px rgba(0, 0, 0, 0.71);
  -webkit-box-shadow: 1px 4px 7px 0px rgba(0, 0, 0, 0.71);
  -moz-box-shadow: 1px 4px 7px 0px rgba(0, 0, 0, 0.71);
}
.manga-image:hover {
  transform: ease scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
}
.loader {
  margin: 10px;
}
.skeleton {
  display: flex;
  overflow-x: hidden;
}
.btn {
  background-color: #bb25e8;
  border-color: #bb25e8;
}

span {
  top: 0px;
  position: relative;
  transition: top ease 0.5s;
}
span:hover {
  color: #bb25e8;
  background-color: white;
  top: -5px;
}
</style>
