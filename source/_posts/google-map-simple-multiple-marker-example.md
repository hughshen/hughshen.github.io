title: 谷歌地图绘制多个地点
date: 2015-09-01 22:22:22
categories: HTML
tags:
- javascript
---

官方就有很好的例子。
具体开发还要找官方api文档。
下面是一个简单的显示多个地点的例子。

<!--more-->

```
<!DOCTYPE html>
<html> 
<head> 
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" /> 
  <title>Google Maps Multiple Markers</title> 
  <script src="http://maps.google.com/maps/api/js?sensor=false" 
          type="text/javascript"></script>
</head> 
<body>
  <div id="map" style="width: 500px; height: 400px;"></div>

  <script type="text/javascript">
    var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  </script>
</body>
</html>
```

参考链接
[Google Maps JS API v3 - Simple Multiple Marker Example](http://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example)
[Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/examples/event-properties)