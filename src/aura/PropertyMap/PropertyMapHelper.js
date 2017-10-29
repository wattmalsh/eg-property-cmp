({

  sendToVF : function(component) {
    let vfOrigin = "https://" + component.get("v.vfHost");
    let vfWindow = component.find("vfFrame").getElement().contentWindow;
    let message = {
      name: "initResponse",
      payload: {
        record: component.get("v.record"),
        layers: [
          {
            url: 'https://sites.google.com/a/energygeeks.com/mkmf/ust/ou.kml',
            btnName: 'Ontario Utilities',
            displayName: 'Ontario Utilities',
            active: true,
            ref: null
          },
          {
            url: 'https://sites.google.com/a/energygeeks.com/mkmf/ust/ps.kml',
            btnName: 'Polaron Service Territory',
            displayName: 'Polaron Service Territory',
            active: true,
            ref: null
          },
          {
            url: 'https://sites.google.com/a/energygeeks.com/mkmf/ust/gs.kml',
            btnName: 'Grasshopper Service Territory',
            displayName: 'Grasshopper Service Territory',
            active: true,
            ref: null
          },
          {
            url: 'https://sites.google.com/a/energygeeks.com/mkmf/ust/us.kml',
            btnName: 'Upstream Service Territory',
            displayName: 'Upstream Service Territory',
            active: true,
            ref: null
          }
        ]}
      }
      vfWindow.postMessage(JSON.stringify(message), vfOrigin);
    }

})
