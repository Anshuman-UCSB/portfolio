describe("template spec", () => {
  // Beforeall it should go to localhost:5173
  beforeEach(() => {
    cy.visit("localhost:5173/");
  });

  it("Has the right title", () => {
    // Check that the url title is "Anshuman Dash"
    cy.title().should("eq", "Anshuman Dash");
  });

  it("Has selectable headers", () => {
    cy.get(".font-bold").should("have.text", "Anshuman Dash");
    cy.get(":nth-child(1) > .cursor-pointer").should("have.text", "ABOUT");
    cy.get(":nth-child(2) > .cursor-pointer").should(
      "have.class",
      "text-faded"
    );
    cy.get(":nth-child(1) > .cursor-pointer").should(
      "have.class",
      "text-darkbrown"
    );
    cy.get(":nth-child(2) > .cursor-pointer").click();
    cy.get(":nth-child(2) > .cursor-pointer").should(
      "have.class",
      "text-darkbrown"
    );
    cy.get(":nth-child(1) > .cursor-pointer").should(
      "have.class",
      "text-faded"
    );
  });
});
