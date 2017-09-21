<!-- View (Client-side, JS) == Controller (Server-side, Apex) == Controller == Database -->

<!-- expensesApp.app -->
<aura:application extends="force:slds"> <!-- extends="force:slds" not used when run inside Lightning Experience or Salesforce1, they use that container's automatic inclusion of SLDS (Salesforce Lightning Design System) -->
  <c:expenses/> <!-- c: in component markup stands for defalut namespace -->
</aura:application>
