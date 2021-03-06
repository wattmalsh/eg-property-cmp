Energy Geeks Salesforce.com
===========================

Salesforce.com deployment and testing utilizing
[Apache Ant](http://ant.apache.org/), [Force.com Migration Tool](https://developer.salesforce.com/page/Force.com_Migration_Tool) and [Greased](https://github.com/stevebuik/greased).

For deployment, included is an Ant build.xml file with targets (command-line operations) to interact with Force.com Migration Tool targets. Targets are grouped into 3 categories: ``deploy``, ``retrieve`` and ``undeploy``. Target names specify which Salesforce environment (``development`` or ``production``) and server (``sandbox`` or ``production``) to utlize.

Force.com Migration Tool
------------------------

### System Requirements
* **Apache Ant** - See [Installing Apache
  Ant](http://ant.apache.org/manual/install.html) for details.

### Initialization
```sh
cp build.properties.example build.properties
cp src/package.example.xml src/package.xml
cp retrieve/package.example.xml retrieve/package.xml
cp undeploy/package.example.xml undeploy/package.xml
cp undeploy/destructiveChanges.example.xml undeploy/destructiveChanges.xml
```

* In **``build.properties``**, input your Salesforce.com userpass to **``sf.username``** and **``sf.password``**. Alternatively, input your sessionId in **``sf.sessionId``**.

### Contents
* **``lib``** - All Ant libraries required for targets. Includes Force.com Migration Tool jar (``ant-salesforce-41.0``). Also, you can find example files of Force.com Migration Tool usage for the corresponding version in those subdirectories.

* **``logs``** - All log files are stored here.

* **``src``** - Files in development for deployment to Salesforce org. The ``package.xml`` is utilized for all ``deploy`` targets.

* **``retrieve``** - Files retrieved from ``retrieve`` target calls are placed in the respective ``sandbox`` or ``production`` directory. Each org has its own package.xml.

* **``undeploy``** - A blank ``package.xml`` along with a ``destructiveChanges.xml`` for files to undeploy. Backups of files found in ``backup``.

* **``build.properties``** - Sets properties to be modified or added. Also includes private properties.

* **``default.properties``** - Default properties. (note: do not modify this file)

* **``library.properties``** - Library properties. Change versions of libraries by editing this file.

* **``manifest.xml``** - List of metadata in this repo.

### Configurables
List of configurable build properties from ``build.properties``.

* **``sf.sandbox.username``** - Username (e.g. matt@energygeeks.com.eg) for the sandbox org you will be deploying to / retrieving from.

* **``sf.sandbox.password``** - Password (+ security token) for the above login.

* **``sf.production.username``** - Username (e.g. matt@energygeeks.com) for the production org you will be deploying to / retrieving from.

* **``sf.production.password``** - Password (+ security token) for the above login.

* **``sf.sandbox.sessionId``** - A sandbox org sessionId to be used in place of a username/password.

* **``sf.production.sessionId``** - A production org sessionId to be used in place of a username/password.

* **``server.maxPoll``** - The number of times to poll the server for the results of a retrieve request. (default: 200)

* **``value.metadataType``** - The metadataType to retrieve for listMetadata targets. (default: AuraDefinitionBundle)

Usage
-----
Run ``ant [target]`` from the base directory to utilize targets of the migration tool.

```
    Usage: ant [target]

    Available targets:
      help                           list properties and targets
      clean                          destroy all generated log files and backup dirs
      describeSandboxMetadata        describe all metadata types in Sandbox
      describeProductionMetadata     describe all metadata types in Production
      listSandboxMetadata            list all information of items of metadata type
                                     value.metadataType in Sandbox
      listProductionMetadata         list all information of items of metadata type
                                     value.metadataType in Production
      retrieveSandbox                retrieve contents of packages.xml from Sandbox
      retrieveProduction             retrieve contents of packages.xml from Sandbox
      deployToSandbox                deploy contents of deploy.dir to Sandbox
      deployToProduction             deploy contents of deploy.dir to Production
      undeployFromSandbox            delete contents of destructiveChanges.xml in Sandbox
      undeployFromProduction         delete contents of destructiveChanges.xml in Production
      cancelLastDeploy               cancel last deploy target
```

Testing with Greased
--------------------

### Deploy testing suite to sandbox and production environments
```sh
Follow this link and allow site access to SalesForce credentials to deploy test suite to sandbox:
  https://githubsfdeploy-sandbox.herokuapp.com/app/githubdeploy/stevebuik/greased

Follow this link and allow site access to SalesForce credentials to deploy test suite to production:
  https://githubsfdeploy.herokuapp.com/app/githubdeploy/stevebuik/greased
```

