<template>
  <div id="chartdiz"></div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  props:['ce'],
  data(){
    return{
      tokken:localStorage.getItem('token')
    }
  },
  async mounted() {
    let res;
      try {
      res = await axios.get(`https://lit-brook-85851.herokuapp.com/api/user/dashboard/data/device`+'?token='+this.tokken);
      // console.log(res.data);
      } catch (err) { 
        console.log("err " + err);      
      }

      if(res.data.today.day==1){
        var today = "Monday";
      }else if(res.data.today.day==2){
        var today = "Tuesday";
      }else if(res.data.today.day==3){
        var today = "Wednesday";
      }else if(res.data.today.day==4){
        var today = "Thursday";
      }else if(res.data.today.day==5){
        var today = "Friday";
      }else if(res.data.today.day==6){
        var today = "Saturday";
      }else if(res.data.today.day==0){
        var today = "Sunday";
      }

      if(res.data.yesterday.day==1){
        var yesterday = "Monday";
      }else if(res.data.yesterday.day==2){
        var yesterday = "Tuesday";
      }else if(res.data.yesterday.day==3){
        var yesterday = "Wednesday";
      }else if(res.data.yesterday.day==4){
        var yesterday = "Thursday";
      }else if(res.data.yesterday.day==5){
        var yesterday = "Friday";
      }else if(res.data.yesterday.day==6){
        var yesterday = "Saturday";
      }else if(res.data.yesterday.day==0){
        var today = "Sunday";
      }

      if(res.data.thisMonth.month==0){
        var thisMonth = "January";
      }else if(res.data.thisMonth.month==1){
        var thisMonth = "February";
      }else if(res.data.thisMonth.month==2){
        var thisMonth = "March";
      }else if(res.data.thisMonth.month==3){
        var thisMonth = "April";
      }else if(res.data.thisMonth.month==4){
        var thisMonth = "May";
      }else if(res.data.thisMonth.month==5){
        var thisMonth = "June";
      }else if(res.data.thisMonth.month==6){
        var thisMonth = "July";
      }else if(res.data.thisMonth.month==7){
        var thisMonth = "August";
      }else if(res.data.thisMonth.month==8){
        var thisMonth = "September";
      }else if(res.data.thisMonth.month==9){
        var thisMonth = "October";
      }else if(res.data.thisMonth.month==10){
        var thisMonth = "November";
      }else if(res.data.thisMonth.month=11){
        var thisMonth = "December";
      }

      if(res.data.lastMonth.month==0){
        var lastMonth = "January";
      }else if(res.data.lastMonth.month==1){
        var lastMonth = "February";
      }else if(res.data.lastMonth.month==2){
        var lastMonth = "March";
      }else if(res.data.lastMonth.month==3){
        var lastMonth = "April";
      }else if(res.data.lastMonth.month==4){
        var lastMonth = "May";
      }else if(res.data.lastMonth.month==5){
        var lastMonth = "June";
      }else if(res.data.lastMonth.month==6){
        var lastMonth = "July";
      }else if(res.data.lastMonth.month==7){
        var lastMonth = "August";
      }else if(res.data.lastMonth.month==8){
        var lastMonth = "September";
      }else if(res.data.lastMonth.month==9){
        var lastMonth = "October";
      }else if(res.data.lastMonth.month==10){
        var lastMonth = "November";
      }else if(res.data.lastMonth.month=11){
        var lastMonth = "December";
      }
      var thisYear = res.data.thisYear.year;
      var lastYear = res.data.lastYear.month;

    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
  console.log(res.data.thisMonth.month)
    // Create chart instance
    var chart = am4core.create("chartdiz", am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();
    // Add data
    // console.log(this.mda);
    if(this.ce==0){
      chart.data = [
        {
          day: yesterday,
          energy: res.data.yesterday.cost
        },
        {
          day: today,
          energy: res.data.today.cost
        }
      ];
    }else if(this.ce==1){
      chart.data = [
      {
        day: lastMonth,
        energy: res.data.lastMonth.cost
      },
      {
        day: thisMonth,
        energy: res.data.thisMonth.cost
      }
    ];
    }else if(this.ce==2){
      chart.data = [
      {
        day: lastYear,
        energy: res.data.lastYear.cost
      },
      {
        day: thisYear,
        energy: res.data.thisYear.cost
      }
    ];
    }

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "middle";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 0;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.min = 0;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "energy";
    series.dataFields.categoryX = "day";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();
  }
};
</script>

<style scoped>
#chartdiz {
  width: 135%;
  height: 500px;
}
</style>
