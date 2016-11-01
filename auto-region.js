/**
 * 自动省市县联动下拉菜单
 */
"use strict";

(function(exports) {
  // regionData

  var regions = {};      
  
  regions.init = function() {
    if ($(".province").length == 0) {
      return;
    }

    var defProvince = $(".province").attr("init_value"),
        defCity = $(".city").attr("init_value"),
        defRegion = $(".region").attr("init_value");

    // province init
    var provinces = regionData['p'],
        cities = regionData['c'],
        regions = regionData['r'];

    $(".province").html('<option value="">请选择所在省份</option>');
    $(".city").html('<option value="">请选择所在城市</option>');
    $(".region").html('<option value="">请选择所在区县</option>');

    var html = '';
    for (var i = 0; i < provinces.length; i ++) {
      
      if (defProvince && defProvince == provinces[i][0]) {
        html += '<option value="' + provinces[i][0] + '" selected>' + provinces[i][1] + '</option>';
      }else {
        html += '<option value="' + provinces[i][0] + '">' + provinces[i][1] + '</option>';
      }
    }
    $(".province").append(html);

    // city init
    $(".province").change(function() {

      if ($(".city").length == 0) {
        return;
      }

      var pid = $(this).val();

      if (!pid) {
        $(".city").html('<option value="">请选择所在城市</option>');
        $(".region").html('<option value="">请选择所在区县</option>');
        return;
      }

      var citiesList = cities[pid];

      html = '<option value="">请选择所在城市</option>';
      for (var i=0; i<citiesList.length; i++) {

        if (defCity && defCity == citiesList[i][0]) {
           html += '<option value="'+citiesList[i][0]+'" selected>'+citiesList[i][1]+'</option>';
        } else {
           html += '<option value="'+citiesList[i][0]+'">'+citiesList[i][1]+'</option>';
        }
      }
      $(".city").html(html);
      $(".city").trigger("change");
    });

    $(".city").change(function(){

      if ($(".region").length == 0) {
        return;
      }

      var cid = $(this).val();

      if (!cid) {
        $(".region").html('<option value="">请选择所在区县</option>');
        return;
      }

      var regionList = regions[cid];
      
      var html = '<option value="">请选择所在区县</option>';
      for(var i = 0; i < regionList.length; i++){
        if (defRegion && defRegion == regionList[i][0]) {
          html += '<option value="' + regionList[i][0] + '" selected>' + regionList[i][1] + '</option>';
        }else {
          html += '<option value="' + regionList[i][0] + '">' + regionList[i][1] + '</option>';
        }
      }
      $(".region").html(html);
    });

    $(".province").trigger("change");
    $(".city").trigger("change");
  };

  exports.regions = regions;
})(window);