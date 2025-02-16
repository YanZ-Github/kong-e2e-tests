describe('template spec', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:8002/')
  })
  it('should create a new service', () => {
    // 导航到服务页面
    cy.get('.workspace-name').click();
    cy.get('[data-testid="action-button"]').click();

    // 填写表单
    cy.get('[data-testid="gateway-service-name-input"]').type('test-service');
    cy.get('[data-testid="gateway-service-url-input"]').type('https://httpbin.konghq.com/');
    cy.get('[data-testid="service-create-form-submit"]').click();

    // 验证服务创建成功
    cy.get('.title').should('contain', 'test-service');
  });

  it('should create a new route for the service', () => {
    // // 导航到路由页面
    cy.get('.workspace-name').click();
    cy.get('.sidebar-menu-toggle').click();
    cy.get('[data-testid="sidebar-item-routes"] > .sidebar-item-link > .sidebar-item-display > .sidebar-item-name-container > .sidebar-item-name').click();
    cy.get('[data-testid="empty-state-action"]').click();
    // cy.get('[data-testid="action-button"]').click();

    // 填写表单
    cy.get('[data-testid="route-form-name"]').type('test-route');
    cy.get('[data-testid="route-form-paths-input-1"]').type('/mytest');
    cy.get('[data-testid="route-form-service-id"]').click();
    cy.get('.route-form-service-dropdown-item > .select-item-label').click();

    cy.get('[data-testid="route-create-form-submit"]').click();

    // 验证路由创建成功
    cy.get('[data-testid="service-property-value"] > div > .k-button').should('contain', 'test-service');
  });
});

