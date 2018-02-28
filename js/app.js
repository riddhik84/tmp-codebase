
const timeout = 2000;
const mumbaiMark = [18.972711, 72.804394];
const mumbaiMarkers = [
  ['Gateway of India', 18.921984, 72.834654],
  ['ChurchGate', 18.935323, 72.827159],
  ['Bandra Worli Sea Link', 19.030149, 72.81561],
  ['Sanjay Gandhi National Park', 19.221035, 72.906792 ],
  ['Breach Candy Hospital', 18.972711, 72.804394],
  ['The Oberoi Hotel', 18.926975, 72.820452],
  ['Horniman Circle', 18.931832, 72.836156],
  ['Nehru Planetorium', 18.990059, 72.814797],
  ['Chhatrapati Shivaji Terminus Area', 18.94487, 72.833672],
  ['Metro Inox Cinema', 18.943013, 72.828878]
];
var map;

function AppViewModel() {
	var self = this;
	var marker;

	this.searchLocation = ko.observable("");
    this.m_markers = [];

    this.showMap = function() {
    	map = new google.maps.Map(document.getElementById('map'), {
      		zoom: 12,
      		center: new google.maps.LatLng(mumbaiMark[0], mumbaiMark[1]),
      		mapTypeId: google.maps.MapTypeId.ROADMAP;
    	});

    	m_markers = mumbaiMarkers;
    	this.showInitialMarkers(m_markers);
    }

    this.showInitialMarkers = function(_markers) {
    	for (let i = 0; i < _markers.length; i++) {
      		marker = new google.maps.Marker({
        	position: new google.maps.LatLng(_markers[i][1], _markers[i][2]),
        	map: map
      	});
    	}
	}

	this.showInfoWindow = function() {
		infowindow.setContent('Info window clicked');
        marker.setAnimation(google.maps.Animation.BOUNCE);
        infowindow.open(map, marker);
        window.setTimeout(function() {
         	marker.setAnimation();
        }, timeout);
	}

	this.locationFiler = ko.computed(function() {
        var locs = [];
        for (var i = 0; i < this.m_markers.length; i++) {
            var l = this.m_markers[i];
            if (l.title.toLowerCase().includes(this.searchOption()
                    .toLowerCase())) {
                result.push(l);
                this.m_markers[i].setVisible(true);
            } else {
                this.m_markers[i].setVisible(false);
            }
        }
        return locs;
    }, this);

    this.showMap();
}

function initMap() {
	ko.applyBindings(new AppViewModel());
}