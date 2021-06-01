<template>
  <div class="mx-auto">
    <div class="body">
      <div style="position:relative" class="row container mx-auto">
        <div class="hot">
          <h4 style="color:white">Hot Manga</h4>

          <div class="latest">
            <!-- <div class="skeleton" v-if="loading">
              <div v-for="n in 7" :key="n + 's'">
                <vue-skeleton-loader
                  color="rgb(219, 219, 219)"
                  wave-color="rgb(247, 247, 247)"
                  :rounded="true"
                  :width="200"
                  :height="280"
                />
                <div style="margin-top:10px;">
                  <vue-skeleton-loader
                    color="rgb(219, 219, 219)"
                    wave-color="rgb(247, 247, 247)"
                    :rounded="true"
                    :width="180"
                    :height="20"
                  />
                </div>
                <div style="margin-top:10px;">
                  <vue-skeleton-loader
                    color="rgb(219, 219, 219)"
                    wave-color="rgb(247, 247, 247)"
                    :rounded="true"
                    :width="80"
                    :height="20"
                  />
                </div>
              </div>
            </div> -->
            <div
              class="manga manga-slide col-md-6"
              v-for="(manga, i) in mangaTop"
              :key="i + '-hot-skeleton'"
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
                  :data-error="require('../assets/blank.png')"
                />
            
              </div>
              <div class="manga-body" style="width:12.5em;">
                <h5
                  class=""
                  style="line-height:2em;height:2em;overflow:hidden;"
                >
                  {{ manga.name }}
                </h5>
                <p class="card-text">{{ manga.latestChapter }}</p>
              </div>
            </div>
          </div>
          <div class="scroll">
            <div class="scroll-left">
              <div @click="scrollLeft" class="button-scroll">
                <img class="arrow" src="../assets/svg/arrow-left.svg" alt="" />
              </div>
            </div>
            <div class="scroll-right">
              <div @click="scrollRight" class="button-scroll float-end">
                <img class="arrow" src="../assets/svg/arrow-right.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 mb-3 row container mx-auto">
      <div class="col-md-9" style="">
        <div class="latest-container">
          <div class="row">
            <div class="col-md-10">
              <h4 style="color:#383838">Latest Update</h4>
            </div>
            <div class="col-md-2" @click="() => {
              router.push('/latest/all')
              }">
              <h4 class="view-more">View More</h4>
            </div>
          </div>

          <div class="latests" style="margin-bottom:20px;">
            
            <div class="row">
              <div
                class="col-sm-3"
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
                    :data-error="
                      require('../assets/blank.png')
                    "
                    :data-loading="
                      require('../assets/svg/Interwind-1s-200px.svg')
                    "
                  />
                </div>
                <div class="manga-body">
                  <h5
                    class="latest-title"
                    style="line-height:2em;height:2em;overflow:hidden;"
                  >
                    {{ manga.name }}
                  </h5>
                  <p class="card-text">{{ manga.latestChapter }}</p>
                </div>
              </div>
            </div>
            <div class="row" v-if="!loading">
              <div class="d-grid gap-2 col-6 mx-auto">
               <button class="btn-outline">View More</button>   
              </div>
             
            </div>
          </div>
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
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";
import genre from "../utils/genre";

function sideScroll(element, direction, speed, distance, step) {
  var scrollAmount = 0;

  var slideTimer = setInterval(function() {
    if (direction == "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }

    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}

function replace(val) {
  let slug = val;
  slug = slug.replace(/\s/g, "-");
  return slug
}

function getLink(val) {
  let link = val.link;
  let res = link.split("/");
  res = res[res.length - 1];
  return res
}
export default {
  name: "app",

  data() {
    return {
      loading: false,
      mangas: [],
      mangaTop: [],
      router: router,
      genre: genre,
      keyword: "",
      hotUrl: "https://warm-refuge-03594.herokuapp.com/api/manga/top",
      latestUrl: "https://warm-refuge-03594.herokuapp.com/api/manga/latest"
    };
  },
  created() {
    this.request();
  },
  methods: {
    selectGenre(g) {
      const slug = replace(g)
      router.push("/genre/" + slug);
    },
    scrollLeft() {
      const elem = document.querySelector(".latest");

      sideScroll(elem, "left", 20, 500, 20);
    },
    scrollRight() {
      const elem = document.querySelector(".latest");
      sideScroll(elem, "right", 20, 500, 20);
    },
    displayManga(manga) {
      const res = getLink(manga)
      router.push("/manga/" + res);
    },
    request() {
      const requestOne = axios.get(this.hotUrl);
      const requestTwo = axios.get(this.latestUrl);
      this.loading = true;
      axios.all([requestOne, requestTwo]).then(
        axios.spread((...responses) => {
          const dataOne = responses[1].data.data;
          const dataTwo = responses[0].data.data;
          this.mangas = dataOne;
          this.mangaTop = dataTwo;
          this.loading = false;
        })
      );
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 461px) {
  .genre {
    display: none;
  }
  .scroll {
    display: none;
  }
  .manga {
    top: 0;
    position: relative;
    margin-bottom: 10px;
    width: 10rem;
    transition: ease-in-out 0.5s;
    margin-right: 10px;

  }
  img {
    width: 100px;
    height: 250px;
    transition: ease-in-out 0.5s;
    
  }
  .manga-slide {
    margin-right: 10px;
  }
  .latest::-webkit-scrollbar {
    display: none;
  }
  .visible-xs {
    display: none;
  }
}
@media screen and (min-width: 813) {
  .navbar-toggler {
    display: none;
  }
  .hidden-xs {
    display: none;
  }
}

.btn-outline {
  
  background-color:white;
  color:#919191;
  border-style: solid;
  font-weight: 800;
  border-color: #bb25e8;
  border-radius: 5px;
  padding:5px;
}
.btn-outline:hover {
  background-color: #bb25e8;
  color: white;
}
h4 {
  font-weight: 800;
}
.body {
  background: linear-gradient(rgba(0, 0, 0, 0.8) 100%, rgba(0, 0, 0, 0.8) 100%),
    url("../assets/bg.png");
  height: 500px;
}
.scroll-right {
  position: relative;
  margin-right: -50px;
  top: -250px;
}
.scroll-left {
  position: absolute;
  top: 200px;
  margin-left: -50px;
}
.arrow {
  transition: ease-in-out 0.5s;
  height: 50px;
  width: 50px;
}
.arrow:hover {
  transform: ease scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
}
.button-scroll {
  border-radius: 50%;
  cursor: pointer;
}
.genre-item {
  cursor: pointer;
}
.genre {
  display: flex;
  overflow-y: hidden;
  position: sticky;
}
.card-text {
  margin-top: -10px;
  margin-bottom: 10px;
  color: #bababa;
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
  background-color:white;
  top: -5px;
}
.skeleton {
  display: flex;
  overflow-x: hidden; 
}
.loader {
  margin: 15px;
}

.hot {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.latest {
  margin-top: 30px;
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  
}
.view-more {
  color:#383838;

  transition: ease-in-out 0.5s;
}
.view-more:hover {
  text-decoration: underline;
  cursor: pointer;
  color: #bb25e8;
  transform: translate(11px,0px);
-webkit-transform: translate(11px,0px);
-moz-transform: translate(11px,0px);
}
.latest-title {
  color: #666666;
  font-weight: 700;
}
.latest::-webkit-scrollbar {
  height: 5px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.latest::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #636463;
}
.latest::-webkit-scrollbar-thumb {
  height: 5px;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #bb25e8;
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

.manga-image {
  width: 200px;
  height: 250px;
  transition: ease-in-out 0.5s;
  box-shadow: 1px 4px 7px 0px rgba(0,0,0,0.71);
-webkit-box-shadow: 1px 4px 7px 0px rgba(0,0,0,0.71);
-moz-box-shadow: 1px 4px 7px 0px rgba(0,0,0,0.71);
}
.manga-image:hover {
  cursor: pointer;
  transform: ease scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
}
h5,
p {
  color: #fff;
}
.sticky-top {
  top: 4em;
}
</style>
