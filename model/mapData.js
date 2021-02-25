import data from './explore'

export const markers = 
    data.map(value => {
      return {
        coordinate: {
          latitude: value.lat,
          longitude: value.long,
          },
          title: value.title,
          description: value.title,
          image: value.image
      }
    })

// export const markers = [
//   {
//     coordinate: {
//       latitude: 52.0275723,
//       longitude: -0.8147538,
//     },
//     title: "Primary School",
//     description: "",
//     image: Images[0].image,
//     rating: 4,
//     reviews: 99,
//   },
//   {
//     coordinate: {
//       latitude: 52.0275723,
//       longitude: -0.8147538,
//     },
//     title: "Secondary School",
//     description: "",
//     image: Images[1].image,
//     rating: 4,
//     reviews: 99,
//   },
//   {
//     coordinate: {
//       latitude: 52.0279679,
//       longitude: -0.8131522,
//     },
//     title: "Play area",
//     description: "This is the 2nd best place",
//     image: Images[1].image,
//     rating: 5,
//     reviews: 102,
//   },
//   {
//     coordinate: {
//       latitude: 52.0321107,
//       longitude: -0.8082358,
//     },
//     title: "Lake/Pond",
//     description: "This is the 3rd best place",
//     image: Images[2].image,
//     rating: 3,
//     reviews: 220,
//   },
//   {
//     coordinate: {
//       latitude: 22.6341137,
//       longitude: 88.4497463,
//     },
//     title: "Fourth Amazing Place",
//     description: "This is the 4th best place",
//     image: Images[3].image,
//     rating: 4,
//     reviews: 48,
//   },
//   {
//     coordinate: {
//       latitude: 22.6292757,
//       longitude: 88.444781,
//     },
//     title: "Fifth Amazing Place",
//     description: "This is the 5th best place",
//     image: Images[4].image,
//     rating: 4,
//     reviews: 178,
//   },
//   {
//     coordinate: {
//       latitude: 22.6292757,
//       longitude: 88.444781,
//     },
//     title: "Fifth Amazing Place",
//     description: "This is the 6th best place",
//     image: Images[5].image,
//     rating: 4,
//     reviews: 178,
//   },
//   {
//     coordinate: {
//       latitude: 22.6292757,
//       longitude: 88.444781,
//     },
//     title: "Fifth Amazing Place",
//     description: "This is the 7th best place",
//     image: Images[6].image,
//     rating: 4,
//     reviews: 178,
//   },
// ];

export const mapDarkStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];

export const mapStandardStyle = [
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
];

