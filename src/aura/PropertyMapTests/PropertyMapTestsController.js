({
    doInit: function (component, event, helper) {

        var test = helper.driver(component, event, helper);

        // references to all the components being tested
        var propertyMapCmp = component.find("PropertyMap");

        var usedByAll = "data you want available to all parts of the chain";

        // IMPORTANT: focus descriptions must be unique since they control how assertions are groups
        var startTests = test.start({
            focused: propertyMapCmp, // you can set the initial focus in test.start or using test.focus (see below)
            description: "Should receive a message from the Visual Force page",
        })

        // using a single chain. TODO fork into parallel chains once delayed attr read is solved

        //////////// #1 EMPTY ////////////

        startTests
            .then(test.assert("v.loaded", "The form should be loaded before tests start"))
            .then(test.wait(function (context) { // use test.wait to block the chain after this function
                // do anything in here. if you want to set attributes on the focused component, use test.setAttribute. See below.
              console.log(propertyMapCmp.find("vfFrame").getElement().contentWindow)
            }))

            // this is an inherited helper fn for firing events. There's also fireComponentEvent with the same args.
            // you can see this event firing (but unhandled) using the Lighting Inspector Chrome extension.
            .then(helper.fireApplicationEvent("e.force:navigateToURL", {url: "Foo"}))

            //////////// END OF TESTS ////////////

            // always include these fns to handle the end of the test
            .then(test.pass).catch(test.fail);

    }
})
