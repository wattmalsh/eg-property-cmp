<aura:application extends="c:greased_TestCommon">

  <aura:registerEvent name="navigateEvent" type="force:navigateToURL"/>

  <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>

  <c:greased_ComponentTestLinks/>

  <p>Tests below...</p>

  <p>Open the javascript console to see extra information when running test, particularly when assertions are failing.</p>

  <c:PropertyMap aura:id="PropertyMap"/>

</aura:application>
