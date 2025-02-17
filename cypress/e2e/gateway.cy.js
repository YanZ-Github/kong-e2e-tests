describe('template spec', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:8002/')
  })
  it('should create a new service', () => {
    // Navigate to Overview and click 'Add a Gateway Service' button.
    cy.get('.workspace-name').click();
    cy.get('[data-testid="action-button"]').click();

    // Input service data and save.
    cy.get('[data-testid="gateway-service-name-input"]').type('test-service');
    cy.get('[data-testid="gateway-service-url-input"]').type('https://httpbin.konghq.com/');
    cy.get('[data-testid="service-create-form-submit"]').click();

    // Verify the gateway service 'test-service' is generated successfully.
    cy.contains('Gateway Service "test-service" successfully created!').should('be.visible');
    cy.get('.title').should('contain', 'test-service');
  });

  it('should create a new route for the service', () => {
    // Navigate to Routes and click 'New Route' button.
    cy.get('.workspace-name').click();
    cy.get('.sidebar-menu-toggle').click();
    cy.get('[data-testid="sidebar-item-routes"] > .sidebar-item-link > .sidebar-item-display > .sidebar-item-name-container > .sidebar-item-name').click();
    cy.get('[data-testid="empty-state-action"]').click();

    // Input route data and save.
    cy.get('[data-testid="route-form-name"]').type('test-route');
    cy.get('[data-testid="route-form-paths-input-1"]').type('/mytest');
    cy.get('[data-testid="route-form-service-id"]').click();
    cy.get('.route-form-service-dropdown-item > .select-item-label').click();
    cy.get('[data-testid="route-create-form-submit"]').click();

    // Verify the route 'test-route' associated with the service is generated successfully.
    cy.contains('Route "test-route" successfully created!').should('be.visible')
    cy.get('[data-testid="service-property-value"] > div > .k-button').should('contain', 'test-service');
  });

  it('should clean all the generated data', () => {
    // Navigate to gateway service.
    cy.get('.workspace-name').click();
    cy.get('.sidebar-menu-toggle').click();
    cy.get('[data-testid="sidebar-item-routes"] > .sidebar-item-link > .sidebar-item-display > .sidebar-item-name-container > .sidebar-item-name').click();

    // Filter
    cy.get('[data-testid="filter-button"]').click();
    cy.get('[data-testid="name"] > .menu-item-title').click();
    cy.get('#filter-name').type('test-route');
    cy.get('[data-testid="name"] > .menu-item-buttons > [data-testid="apply-filter"]').click();

    // Navigate to the route detailed page to delete it.
    cy.get('b').click();
    cy.get('[data-testid="header-actions"]').click();
    cy.get('.danger > [data-testid="entity-button"] > .dropdown-item-trigger-label').click();
    cy.get('[data-testid="confirmation-input"]').type('test-route');
    cy.get('[data-testid="modal-action-button"]').click();

    // Navigate to routes.
    cy.get('.sidebar-menu-toggle').click();
    cy.get('[data-testid="sidebar-item-gateway-services"] > .sidebar-item-link > .sidebar-item-display > .sidebar-item-name-container > .sidebar-item-name').click();

    // Filter
    cy.get('[data-testid="filter-button"]').click();
    cy.get('[data-testid="name"] > .menu-item-title').click();
    cy.get('#filter-name').type('test-service');
    cy.get('[data-testid="name"] > .menu-item-buttons > [data-testid="apply-filter"]').click();

    // Navigate to the service detailed page to delete it.
    cy.get('b').click();
    cy.get('[data-testid="header-actions"]').click();
    cy.get('.danger > [data-testid="entity-button"] > .dropdown-item-trigger-label').click();
    cy.get('[data-testid="confirmation-input"]').type('test-service');
    cy.get('[data-testid="modal-action-button"]').click();

  });
});