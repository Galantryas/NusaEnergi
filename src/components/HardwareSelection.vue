<template>
    <div class="lola">
     <div class="dropdown dropdown-dark">
    <select name="two" class="dropdown-select" id="dd" @change="onChange($event)" :key="key">
      <option value="default">Select Device...</option>
      <!-- <option value="1">Option #1</option>
      <option value="2">Option #2</option>
      <option value="3">Option #3</option> -->
    </select>
  </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  props:['dec'],
  data(){
    return{
      key:"",
      tokken:localStorage.getItem('token'),
      items: [
      
      ]
    }
  },
  mounted() {
    let dropdown = $('#dd');

    dropdown.empty();

    dropdown.append('<option selected="true" value="default" disabled>Choose Device</option>');
    dropdown.prop('selectedIndex', 0);

    const url = 'https://lit-brook-85851.herokuapp.com/api/user/dashboard/data/devices/type'+'?token='+this.tokken;

    // Populate dropdown with list of provinces
    $.getJSON(url, function (data) {
      $.each(data, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', entry._id).text(entry._id));
      })
    });
  },
  methods : {
    onChange(e){
      this.dec=e.target.value
      this.$emit("dataupdated",this.dec);
    },
  },
}
</script>

<style lang="scss" scoped>
.lola{
    body {
  font: 13px/20px "Lucida Grande", Tahoma, Verdana, sans-serif;
  color: #404040;
  background: #93cedf;
}

.container {
  margin: 80px auto;
  width: 400px;
  text-align: center;
}

.container > .dropdown {
  margin: 0 20px;
  vertical-align: top;
}

.dropdown {
  display: inline-block;
  position: relative;
  overflow: hidden;
  margin-top: 4%;
  height: 28px;
  width: 250px;
  background: #f2f2f2;
  border: 1px solid;
  border-color: white #f7f7f7 whitesmoke;
  border-radius: 3px;
  background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
  background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
  background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
  background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.06));
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.dropdown:before, .dropdown:after {
  content: '';
  position: absolute;
  z-index: 2;
  top: 9px;
  right: 10px;
  width: 0;
  height: 0;
  border: 4px dashed;
  border-color: #888888 transparent;
  pointer-events: none;
}

.dropdown:before {
  border-bottom-style: solid;
  border-top: none;
}

.dropdown:after {
  margin-top: 7px;
  border-top-style: solid;
  border-bottom: none;
}

.dropdown-select {
  position: relative;
  width: 130%;
  margin: 0;
  padding: 6px 8px 6px 10px;
  height: 28px;
  line-height: 14px;
  font-size: 12px;
  color: #62717a;
  text-shadow: 0 1px white;
  background: #f2f2f2; /* Fallback for IE 8 */
  background: rgba(0, 0, 0, 0) !important; /* "transparent" doesn't work with Opera */
  border: 0;
  border-radius: 0;
  -webkit-appearance: none;
}

.dropdown-select:focus {
  z-index: 3;
  width: 100%;
  color: #394349;
  outline: 0px solid #49aff2;
  outline: 0px solid -webkit-focus-ring-color;
  outline-offset: -2px;
}

.dropdown-select > option {
  margin: 3px;
  padding: 6px 8px;
  text-shadow: none;
  background: #f2f2f2;
  border-radius: 3px;
  cursor: pointer;
}

/* Fix for IE 8 putting the arrows behind the select element. */

.lt-ie9 .dropdown {
  z-index: 1;
}

.lt-ie9 .dropdown-select {
  z-index: -1;
}

.lt-ie9 .dropdown-select:focus {
  z-index: 3;
}


.dropdown-dark {
  background: #444;
  border-color: #111111 #0a0a0a black;
  background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
  background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
  background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
  background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));
  -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);
}

.dropdown-dark:before {
  border-bottom-color: #aaa;
}

.dropdown-dark:after {
  border-top-color: #aaa;
}

.dropdown-dark .dropdown-select {
  color: #aaa;
  text-shadow: 0 1px black;
  background: #444;  /* Fallback for IE 8 */
}

.dropdown-dark .dropdown-select:focus {
  color: #ccc;
}

.dropdown-dark .dropdown-select > option {
  background: #444;
  text-shadow: 0 1px rgba(0, 0, 0, 0.4);
}
}
</style>
