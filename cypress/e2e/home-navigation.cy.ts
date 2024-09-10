describe("Happy path: Sing in, select strategy and see file details", () => {
  it("Get local files", () => {
    cy.visit("http://localhost:3000");
    cy.location("pathname").should("eq", "/signin");
    cy.get("[data-id=open-signin-btn]").click();
    cy.location("pathname").should("eq", "/api/auth/signin");
    cy.get("#input-username-for-credentials-provider").type("maria");
    cy.get("#input-password-for-credentials-provider").type("password");
    cy.get("#submitButton").click();
    cy.location("pathname").should("eq", "/home");
    cy.get("[data-id=open-upload-strategy-btn]")
      .should("have.attr", "href")
      .and("include", "localhost")
      .then((href) => {
        cy.visit(href);
      });
    cy.get("[data-id=files-table] > tbody > tr > td").first().as("filename");
    cy.get("[data-id=files-table] > tbody > tr > td > button").first().click();
    cy.get("[data-id=file-inspector] > h2").then((x) => {
      let name = x.text();
      cy.get("@filename")
        .then((x) => x.text())
        .should("eq", name);
    });
    cy.go("back");
    cy.location("pathname").should("eq", "/home");
    cy.visit("/uploader");
  });
});
