<template>
  <div class="row justify-between" dir="rtl">
    <div class="section1 q-mx-md">
      <h5 class="text-right yekan">امتحان نهایی فیزیک تجربی</h5>
      <img src="..\assets\Group724.png" alt="pic" style="width: 100%" />
      <div class="row justify-between q-my-sm">
        <p dir="rtl" class="col-grow" style="font-size: 20px; width: 70%">
          10 راهکار رفع تنبلی و بی‌انگيزگي-جلسه يك
        </p>
        <div class="icon">
          <q-icon
            class="q-px-sm"
            name="bookmark_border"
            color="positive"
            size="30px"
            style="cursor: pointer"
          />
          <q-icon
            class="q-px-sm"
            name="share"
            color="positive"
            size="30px"
            style="cursor: pointer"
          />
        </div>
      </div>
      <p dir="rtl">
        تابلو راهنما، بررسی روند سوالات امتحان نهایی امتحان نهایی دین و زندگی
        دوازدهم-(نظام آموزشی جدید) (00-99) فیلم جلسه 0 - تابلو راهنما، بررسی
        روند سوالات امتحان نهایی امتحان نهایی دین و زندگی دوازدهم-(نظام آموزشی
        جدید) (00-99) فیلم ...
      </p>
    </div>
    <div class="section2 column q-mx-md">
      <h5 class="text-right yekan">لیست فیلم ها</h5>
      <div class="sections column q-ml-sm" style="height: 1vm">
        <div class="q-ma-md">
          <q-btn
            class="text-black dropdown-btn"
            color="#f6f6f6"
            align="left"
            @click="showMenu()"
            style="width: 100%; overflow: auto; display: block"
          >
            <p>سکشن یک</p>
          </q-btn>
          <div
            class="
              dropdown-container dropdown
              text-black
              q-py-md q-px-md
              text-right
              column
              bg-grey-1
            "
            style="display: none"
          >
            <p @click="showMenu()" style="cursor: pointer">سکشن یک</p>
            <q-separator class="q-mb-md" color="#3AB549" inset />
            <ul>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
            </ul>
          </div>
          <q-separator class="q-mb-md" color="#E6E6E6" inset />
          <q-btn
            class="text-black dropdown-btn2"
            color="#f6f6f6"
            align="left"
            @click="showMenu2()"
            style="width: 100%; overflow: auto; display: block"
          >
            <p>سکشن دو</p>
          </q-btn>
          <div
            class="
              dropdown-container2 dropdown
              text-black
              q-py-md q-px-md
              text-right
              column
              bg-grey-1
            "
            style="display: none"
          >
            <p @click="showMenu2()" style="cursor: pointer">سکشن دو</p>
            <q-separator class="q-mb-md" color="#3AB549" inset />
            <ul>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
            </ul>
          </div>
          <q-separator class="q-mb-md" color="#E6E6E6" inset />

          <q-btn
            class="text-black dropdown-btn3"
            color="#f6f6f6"
            align="left"
            @click="showMenu3()"
            style="width: 100%; overflow: auto; display: block"
          >
            <p>سکشن سه</p>
          </q-btn>
          <div
            class="
              dropdown-container3 dropdown
              text-black
              q-py-md q-px-md
              text-right
              column
              bg-grey-1
            "
            style="display: none"
          >
            <p @click="showMenu3()" style="cursor: pointer">سکشن سه</p>
            <q-separator color="#3AB549" inset />
            <ul>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
            </ul>
          </div>
          <q-separator class="q-mb-md" color="#E6E6E6" inset />

          <q-btn
            class="text-black dropdown-btn4"
            color="#f6f6f6"
            align="left"
            @click="showMenu4()"
            style="width: 100%; overflow: auto; display: block"
          >
            <p>سکشن چهار</p>
          </q-btn>
          <div
            class="
              dropdown-container4 dropdown
              text-black
              q-py-md q-px-md
              text-right
              column
              bg-grey-1
            "
            style="display: none"
          >
            <p @click="showMenu4()" style="cursor: pointer">سکشن چهار</p>
            <q-separator class="q-mb-md" color="#3AB549" inset />
            <ul>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
              <li class="row justify-between">
                <p>جلسه 1</p>
                <p>55:55</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    function showMenu() {
      let dropdown = document.getElementsByClassName("dropdown-container");
      let btn = document.getElementsByClassName("dropdown-btn");
      if (dropdown[0].style.display === "none") {
        dropdown[0].style.display = "flex";
        btn[0].style.display = "none";
      } else {
        dropdown[0].style.display = "none";
        btn[0].style.display = "block";
      }
    }
    function showMenu2() {
      let dropdown = document.getElementsByClassName("dropdown-container2");
      let btn = document.getElementsByClassName("dropdown-btn2");
      if (dropdown[0].style.display === "none") {
        dropdown[0].style.display = "flex";
        btn[0].style.display = "none";
      } else {
        dropdown[0].style.display = "none";
        btn[0].style.display = "block";
      }
    }
    function showMenu3() {
      let dropdown = document.getElementsByClassName("dropdown-container3");
      let btn = document.getElementsByClassName("dropdown-btn3");
      if (dropdown[0].style.display === "none") {
        dropdown[0].style.display = "flex";
        btn[0].style.display = "none";
      } else {
        dropdown[0].style.display = "none";
        btn[0].style.display = "block";
      }
    }
    function showMenu4() {
      let dropdown = document.getElementsByClassName("dropdown-container4");
      let btn = document.getElementsByClassName("dropdown-btn4");
      if (dropdown[0].style.display === "none") {
        dropdown[0].style.display = "flex";
        btn[0].style.display = "none";
      } else {
        dropdown[0].style.display = "none";
        btn[0].style.display = "block";
      }
    }

    return {
      showMenu,
      showMenu2,
      showMenu3,
      showMenu4,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  font-family: yekan;
  font-size: 16px;
}
a {
  text-decoration: none;
  color: black;
}
ul {
  list-style-type: none;
  font-family: yekan;
  padding: 0;
  margin: 0;
}
li {
  padding-top: 15px;
  cursor: pointer;
}
li p:hover {
  color: #3ab549;
}
li:hover {
  color: #3ab549;
  list-style-type: disc;
  margin-right: 20px;
}
.sections {
  border-radius: 10px;
  background: #f6f6f6;
  max-height: 300px;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb {
  background: #3AB549;
  border-radius: 20px;
}
.dropdown {
  border-radius: 10px;
}
.section1 {
  width: 900px;
}
.section2 {
  width: 100%;
}
.icon {
  display: none;
}
@media (min-width: 351px) {
  .icon {
    display: block;
  }
}
@media (min-width: 577px) {
  .section1 {
    width: 55%;
  }
  .section2 {
    width: 100px;
    flex-grow: 1;
  }
}
</style>