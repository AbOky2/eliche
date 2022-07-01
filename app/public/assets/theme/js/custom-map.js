$(document).ready(() => {
  const app_url = 'https://app.kitlenid.fr';
  const media_url = 'https://media.kitlenid.fr';

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: 48.8587741, lng: 2.2069771 },
    gestureHandling: 'greedy',
  });

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const spaceCurrency = (x) =>
    x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : x;
  const pluralize = (name, count, suffix = 's') =>
    `${name}${count === undefined || count > 1 ? suffix : ''}`;
  const nbLotMessage = (nb, addressPrefix = 'à', address) =>
    `${
      nb > 1 ? "<span class='desktop-only'>Plus de </span>" : ''
    }<span>${nb}</span> ${pluralize('logement', nb)} ${
      nb > 1 ? 'sont ' : ''
    }${pluralize('disponible', nb)} ${addressPrefix} <span>${address}</span>`;
  const adressTypes = {
    city: 'city',
    departement: 'departement',
    region: 'region',
  };
  const getAddress = ({ postal, city }) =>
    postal && city
      ? `${city} ${postal ? `/ ${postal.slice(0, 2)}` : ''}`
      : null;
  const getNbPieces = (minPieces, maxPieces) =>
    minPieces !== maxPieces
      ? `de ${minPieces} à ${maxPieces}  pièces`
      : `${minPieces} pièce${minPieces === 1 ? '' : 's'}`;
  const getProprerties = (done, loc = 'Paris, France', path = 'properties') =>
    $.post(`${app_url}/${path}`, {
      loc,
      maxPrice: '-1',
      sort: 'asc',
      typeOfAnnonce: 'Vente',
    }).done(done);
  const handleSearch = (val) => {
    getProprerties(
      ({ list }) => {
        const { docs, coord, nbLotFound, near, adressType, department } = list;
        const v = ucFirst(val);
        const nbDocs = docs.reduce((acc, curr) => acc + curr?.lots.length, 0);

        let text = '';

        if (adressType === adressTypes.city && nbLotFound) {
          text = `${nbLotMessage(nbLotFound, 'à', v)}${
            department.number && nbLotFound != nbDocs
              ? ` et ${
                  nbDocs > 1 ? 'plus de' : ''
                } <span>${nbDocs}</span> dans le ${department.number}`
              : ''
          }.`;
          map.setZoom(10);
        } else if (
          adressType === adressTypes.departement ||
          (adressType === adressTypes.city && !nbLotFound)
        ) {
          text = `${nbLotMessage(
            nbDocs,
            'dans le département',
            department.name || ''
          )}${department?.number ? '(' + department.number + ')' : ''}.`;
          map.setZoom(9);
        } else {
          text = `${nbLotMessage(nbDocs, 'dans la région', v)}.`;
          map.setZoom(7);
        }

        $('.data-found-text').html(text);
        makeSlide(docs.map(getList));
        displayMap({ docs, near, address: val });

        if (map) {
          map.data.forEach((e) => map.data.remove(e));

          if (department?.name && department?.coord)
            map.data.addGeoJson(department?.coord);
          if (coord) map.data.addGeoJson(coord);

          map.data.setStyle((feature) => ({
            fillColor: feature.getProperty('fillColor') || '#4F80FF',
            strokeWeight: 1,
          }));
        }
      },
      val,
      'publicSearch'
    );
  };
  const getList = (
    e,
    showStartingPrice
  ) => `<li class="slider"><a href="${redirectUrl(e._id)}">
    <div style="background-image:url(${media_url}${e.pictures[0]})"></div>
    <h3>${e.heading}</h3>
    <span class='card-gray-text'>${getAddress(e)}</span>
    <p>${
      showStartingPrice === true
        ? `<span class='card-gray-text'>à partir de</span> ${spaceCurrency(
            e.price
          )}€`
        : getNbPieces(e.minPieces, e.maxPieces)
    }</p>
    </a>
    </li>`;
  let first = true;
  const makeSlide = (dataList) => {
    if (!first) $('#mobile-search-near-residences').slick('unslick');
    $('#mobile-search-near-residences').html(dataList);
    $('#mobile-search-near-residences').slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '10px',
      variableWidth: true,
      useTransform: false,
    });
    first = false;
  };
  (() => {
    const regionName = 'Île-de-France';
    $.get(`${app_url}/promoted`).done(({ list }) => {
      $('#lastest-near-residences').html(list.map(getList));
    });
    handleSearch(regionName);
    console.log('ok');
    // getProprerties(({ list = {} }) => {
    //   const { docs = [], total } = list;

    //   makeSlide(docs.map(getList));
    //   $(".data-found-text").html(`${nbLotMessage(total, "en", "France")} !`);
    //   displayMap({ docs, address: regionName });
    // }, regionName);
  })();
  $('.redirect-btn').attr('href', `${app_url}/?register`);
  const redirectUrl = (val) =>
    `${app_url}/?id=${encodeURIComponent(val)}&register`;

  const options = {
    componentRestrictions: { country: 'fr' },
    fields: ['formatted_address', 'geometry', 'name'],
    strictBounds: false,
    types: ['geocode'],
  };
  const desktopAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById('desktop-input'),
    options
  );
  const mobileAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById('mobile-input'),
    options
  );
  $('.btn-search').on('click', function () {
    const val = $(this).prev().val().trim();
    if (!val) return;
    handleSearch(val);
  });
  $('#search-container input, .search-btn span').on('click', (e) => {
    if (!isMobile) return;
    $('body').toggleClass('noScroll');
    $('#maps-container').toggleClass('show');
    if (e.target.nodeName === 'INPUT') $('#maps-container input').focus();
  });

  [desktopAutocomplete, mobileAutocomplete].map((elem) =>
    elem.addListener('place_changed', () =>
      handleSearch(elem.getPlace().formatted_address)
    )
  );

  let markerCluster,
    infowindow,
    markers,
    isfirstSlide = true;
  const icon = {
    url: './assets/images/white_marker.png',
    scaledSize: new google.maps.Size(54, 54), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(27, 27), // anchor
  };
  const blueIcon = {
    ...icon,
    url: './assets/images/blue_marker.png',
  };
  $('#mobile-search-near-residences').on(
    'swipe',
    function (e, slick, currentSlide) {
      if (isfirstSlide) {
        isfirstSlide = false;
        map.setZoom(10);
      }
      const marker = markers[slick.slickCurrentSlide()];
      if (!marker) return;

      map.panTo(marker.getPosition());
      if (infowindow?.close) infowindow.close();

      markers.map((e) => e.setIcon(icon));

      marker.setIcon(blueIcon);
    }
  );

  function displayMap({ docs = [], near = [], address }) {
    if (docs.length)
      map.setCenter({
        lat: near[0] || docs[0]?.loc.coordinates[1],
        lng: near[1] || docs[0]?.loc.coordinates[0],
      });
    const locations = docs.map(({ loc: { coordinates: [lng, lat] } }) => ({
      lat,
      lng,
    }));

    markers = locations.map((location, i) => {
      const marker = new google.maps.Marker({
        position: location,
        icon,
        map,
      });
      marker.addListener('click', () => {
        const doc = docs[i];
        markers.map((e) => e.setIcon(icon));

        if (infowindow?.close) infowindow.close();
        if (isMobile) $('#mobile-search-near-residences').slick('slickGoTo', i);
        else {
          infowindow = new google.maps.InfoWindow({
            content: `<div class='card-container'>${getList(doc, true)}</div>`,
            shadowStyle: 1,
            padding: 0,
            backgroundColor: 'rgb(57,57,57)',
            arrowSize: 10,
            borderWidth: 1,
            borderColor: '#2c2c2c',
            disableAutoPan: true,
            hideCloseButton: true,
            arrowPosition: 30,
            backgroundClassName: 'transparent',
            arrowStyle: 2,
            overFlow: 'none',
          });
          infowindow.open(marker.get('map'), marker);
        }
        marker.setIcon(blueIcon);

        map.panTo({
          lng: doc.loc.coordinates[0],
          lat: doc.loc.coordinates[1],
        });
      });

      return marker;
    });

    new google.maps.event.trigger(markers[0], 'click');
    google.maps.event.addListener(map, 'click', () => infowindow?.close());

    if (markerCluster) markerCluster.clearMarkers();

    // Add a marker clusterer to manage the markers.
    markerCluster = new MarkerClusterer(map, markers, {
      maxZoom: 9,
      icon,
      styles: [
        {
          title: 'toto3',
          textColor: 'transparent',
          url: './assets/images/white_marker.png',
          height: 50,
          width: 50,
        },
      ],
    });
  }
});
