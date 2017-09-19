Energy Geeks Salesforce.com
===========================

Salesforce.com deployment structure utilizing
[Apache Ant](http://ant.apache.org/) and the
[Force.com Migration Tool](https://developer.salesforce.com/page/Force.com_Migration_Tool).

This structure includes a build file with targets to interact with Migration
Tool targets. Targets are grouped into 3 categories: ``deploy``, ``retrieve``
and ``undeploy``. Target names specify which Salesforce organization (``sandbox`` or
``production``) server to utlize.

Getting Started
---------------

### System Requirements
* **Apache Ant** - See [Installing Apache Ant](http://ant.apache.org/manual/install.html)
for details.

### Initialization
* Copy **``build.properties.example``** to **``build.properties``**. Input your
Salesforce.com userpass to **``sf.username``** and **``sf.password``**. Alternatively, input your sessionId in **``sf.sessionId``**.

### Contents
* **``lib``** - All Ant libraries required for targets. Includes Force.com
  Migration Tool jar (**``ant-salesforce-41.0``**). Also, you can find example
  files of Force.com Migration Tool usage for the corresponding version in those
  subdirectories.

* **``logs``** - All log files are stored here.

* **``deploy``** - Files in development for deployment to Salesforce org. The
  **``package.xml``** is utilized for all ``deploy`` and ``retrieve`` commands.

* **``retrieve``** - Files retrieved from ``retrieve`` target calls are placed
  in the repective **``sandbox``** or **``production``** directory. (note:
  **``package.xml``** is symlinked with **``deploy/package.xml``**).

* **``undeploy``** - Backup files of any undeploy commands. A blank
  **``package.xml``** along with **``destructiveChanges.xml``**,
  **``destructiveChangesPre.xml``** and **``destructiveChangesPost.xml``**.
  (note: do not edit **``undeploy/package.xml``**).

* **``build.properties.example``** - An example build.properties with private
  properties to be copied and filled out with Salesforce ``username`` and
  ``password``. Any properties to be modified or added go here.

* **``default.properties``** - Default properties. Override any property in
  **``build.properties``**.

* **``library.properties``** - Library properties. Change versions of libraries
  by editing this file.

### Configurables
List of configurable build properties from ``build.properties``.
* **``sf.sandbox.username``** - Username (e.g. matt@energygeeks.com.eg) for the
  sandbox org you will be deploying to / retrieving from.
* **``sf.sandbox.password``** - Password (+ security token) for the above login.
* **``sf.production.username``** - Username (e.g. matt@energygeeks.com) for the
production org you will be deploying to / retrieving from.
* **``sf.production.password``** - Password (+ security token) for the above
  login.
* **``sf.sandbox.sessionId``** - A sandbox org sessionId to be used in place of
  a username/password.
* **``sf.production.sessionId``** - A production org sessionId to be used in
  place of a username/password.
* **``server.maxPoll``** - The number of times to poll the server for the
  results of a retrieve request. (default: 200)
* **``value.metadataType``** - The metadataType to retrieve for listMetadata
  targets. (default: AuraDefinitionBundle)

Usage
-----
Run **``ant [target]``** from the base directory to utilize targets of the
migration tool.

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

