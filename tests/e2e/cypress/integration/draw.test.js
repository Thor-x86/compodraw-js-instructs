/// <reference types="cypress" />

describe("E2E Test for All Instructs", () => {
  it("Can navigate to web app", () => {
    cy.visit("/");
  });

  it("Can draw properly", () => {
    cy.viewport(1280, 720);
    cy.compareSnapshot("result");
  });
});
