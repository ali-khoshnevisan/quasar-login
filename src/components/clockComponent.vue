<template>
  <div id="clockContainer">
    <div id="hour"></div>
    <div id="minute"></div>
    <div id="second"></div>
  </div>
</template>

<script>
export default {
  props: ["d", "hr", "min", "sec"],
  setup(props) {
    setInterval(() => {
      let hr_rotation = 30 * props.hr + props.min / 2; //converting current time
      let min_rotation = 6 * props.min;
      let sec_rotation = 6 * props.sec;

      hour.style.transform = `rotate(${hr_rotation}deg)`;
      minute.style.transform = `rotate(${min_rotation}deg)`;
      second.style.transform = `rotate(${sec_rotation}deg)`;
    }, 1000);

    return {};
  },
};
</script>

<style lang="scss" scoped>
#clockContainer {
  position: absolute;
  z-index: 10;
  margin: auto;
  height: 4vw;
  /*to make the height and width responsive*/
  width: 4vw;
  background: url(clock1.png)
    no-repeat;
  /*setting our background image*/
  background-size: 100%;
}

#hour,
#minute,
#second {
  position: absolute;
  background: black;
  border-radius: 10px;
  transform-origin: bottom;
}

#hour {
  width: 1.8%;
  height: 25%;
  top: 25%;
  left: 48.85%;
  opacity: 0.8;
}

#minute {
  width: 1.6%;
  height: 30%;
  top: 19%;
  left: 48.9%;
  opacity: 0.8;
}

#second {
  width: 1%;
  height: 40%;
  top: 9%;
  left: 49.25%;
  opacity: 0.8;
}
</style>