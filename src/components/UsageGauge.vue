
<template>
<!-- <div> -->
  <div id="chartdiv"></div>
<!-- <h3>{{mde}}</h3>
</div> -->
</template>

<script>
/* eslint-disable */
import axios from "axios";
import Vue from "vue";

export default {
  name:"UsageGauge",
  props:['mde'],
  data() {
    return {
      amounttoday: this.mde,
      tokken: localStorage.getItem('token')
    };
  },
  async mounted() {
    
    let res;
      try {
      res = await axios.get(`https://lit-brook-85851.herokuapp.com/api/user/dashboard/data/device`+'?token='+this.tokken);
      if(this.mde==0){
      var amount = res.data.today.sumOfIntensity;
      }else if(this.mde==1){
        var amount = res.data.thisMonth.sumOfIntensity;
      }else if(this.mde==2){
        var amount = res.data.thisYear.sumOfIntensity;
      }
      } catch (err) { 
        console.log("err " + err);      
      }

    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
    // create chart
    var chart = am4core.create("chartdiv", am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);

    /**
     * Normal axis
     */
    console.log(amount);
    var axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    if(amount>1000000){
      axis.max = 10000000;
    }else if(amount>100000){
      axis.max = 1000000;
    }else if(amount>10000){
      axis.max = 100000;
    }else if(amount>1000){
      axis.max = 10000;
    }else if(amount>100){
      axis.max = 1000;
    }else if(amount>10){
      axis.max = 100;
    }else if(amount>=0){
      axis.max = 10;
    }                          //cek
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = 10;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 40;
    axis.renderer.labels.template.adapter.add("text", function(text) {
      return text;
    });

    /**
     * Axis for ranges
     */

    var colorSet = new am4core.ColorSet();

    var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
    axis2.min = 0;
    if(amount>1000000){
      axis2.max = 10000000;
    }else if(amount>100000){
      axis2.max = 1000000;
    }else if(amount>10000){
      axis2.max = 100000;
    }else if(amount>1000){
      axis2.max = 10000;
    }else if(amount>100){
      axis2.max = 1000;
    }else if(amount>10){
      axis2.max = 100;
    }else if(amount>=0){
      axis2.max = 10;
    }                        //cek
    axis2.renderer.innerRadius = 10;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    var range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);

    var range1 = axis2.axisRanges.create();
    range1.value = 50;
    if(amount>1000000){
      range1.endValue = 10000000;
    }else if(amount>100000){
      range1.endValue = 1000000;
    }else if(amount>10000){
      range1.endValue = 100000;
    }else if(amount>1000){
      range1.endValue = 10000;
    }else if(amount>100){
      range1.endValue = 1000;
    }else if(amount>10){
      range1.endValue = 100;
    }else if(amount>=0){
      range1.endValue = 10;
    }                             //cek
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);

    /**
     * Label
     */

    var label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 25;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    if(amount>1000000){
      var numb = 5000000;
    }else if(amount>100000){
      var numb = 500000;
    }else if(amount>10000){
      var numb = 50000;
    }else if(amount>1000){
      var numb = 5000;
    }else if(amount>100){
      var numb = 500;
    }else if(amount>10){
      var numb = 50;
    }else if(amount>=0){
      var numb = 5;
    }       
    label.text = numb + " KWh/Sqft";

    /**
     * Hand
     */

    var hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(30);
    hand.startWidth = 5;
    hand.pin.disabled = true;
    if(amount>1000000){
      hand.value = 5000000;
    }else if(amount>100000){
      hand.value = 500000;
    }else if(amount>10000){
      hand.value = 50000;
    }else if(amount>1000){
      hand.value = 5000;
    }else if(amount>100){
      hand.value = 500;
    }else if(amount>10){
      hand.value = 50;
    }else if(amount>=0){
      hand.value = 5;
    }       

    hand.events.on("propertychanged", function(ev) {
      range0.endValue = ev.target.value;
      range1.value = ev.target.value;
      axis2.invalidate();
    });
    setInterval(async function (){
      // const self = this;
      let res;
      try {
      res = await axios.get(`https://lit-brook-85851.herokuapp.com/api/user/dashboard/data/device`+'?token='+this.tokken);
      // this.amounttoday = res.data.today;
      // console.log(res.data);
      
      } catch (err) { 
        console.log("err " + err);      
      }
      if(this.mde==0){
      var value = res.data.today.sumOfIntensity;
      }else if(this.mde==1){
        var value = res.data.thisMonth.sumOfIntensity;
      }else if(this.mde==2){
        var value = res.data.thisYear.sumOfIntensity;
      }
      label.text = value + " KWh/Sqft";
      var animation = new am4core.Animation(
        hand,
        {
          property: "value",
          to: value
        },
        1000,
        am4core.ease.cubicOut
      ).start();
    }.bind(this), 2000);
  }
};
</script>


<style>
#chartdiv {
  width: 210%;
  height: 500px;
}
</style>
