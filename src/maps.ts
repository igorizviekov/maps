import axios from "axios";

type Response = {
  results: [{ geometry: { location: { lat: number; lng: number } } }];
  status: "OK" | "ZERO_RESULTS";
};

export class GoogleMaps {
  api: string;

  constructor(a: string) {
    this.api = a;
  }

  setup() {
    // Create the script tag, set the appropriate attributes
    var script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.api}`;
    script.defer = true;
    script.async = true;
    // Append the 'script' element to 'head'
    document.head.appendChild(script);
  }

  getAddress(adr: string) {
    const address = encodeURI(adr);
    axios
      .get<Response>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.api}`
      )
      .then(res => {
        if (res.data.status !== "OK") {
          throw new Error("No results");
        } else {
          const coordinates = res.data.results[0].geometry.location;
          const userMap = new google.maps.Map(document.getElementById("map")!, {
            center: coordinates,
            zoom: 12
          });
          new google.maps.Marker({ position: coordinates, map: userMap });
        }
      })
      .catch((err: Error) => alert(err.message));
  }
}
