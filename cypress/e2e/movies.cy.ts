// Ni skall skapa e2e-tester för applikationen som ni har fått given.

// För G krävs det att ni har skrivit tester som går igenom "happy flow" 
// av data och använder data från api:t. För VG krävs det att ni även testar 
// vad som händer om ni inte får den data som ni förväntar er och även använder
// mockad data


beforeEach(() => {
  cy.visit('/');
});

describe('start elements exist', () => {

  it('should have an input', () => {
    cy.get('input').should('exist');
  });

  it('should be an empty input at start', () => {
    cy.get('input').should('have.value', '');
  });

  it('should have an submitbutton', () => {
    cy.get('button').should('exist');
  });

  it('should have a div', () => {
    cy.get('div#movie-container').should('exist');
  })
});

describe('should test submitBtn', () => {

  it('should trigger clickevent submitBtn',() => {
    cy.get('#search').click()
    });
  
  it('should have an text on Btn', () => {
    cy.get('button').should('contain', 'Sök');
    });
  
  it('should test submitBtn responds to Enter key', () => {
    cy.get('input[type="text"]').type('some text');
    cy.get('input[type="text"]').type('{enter}');
    });

  it('should test input have placeholder', () => {
    cy.get('input').should('have.attr', 'placeholder', 'Skriv titel här');    
    });
});

describe('should test API data', () => {
  // API happy flow
describe('tests of input', () => {

  it('should have text in it', () => {
    cy.get('input#searchText').type('Almost Famous').should('have.value','Almost Famous');
  });

  it('should get data with correct searchText', () => {
    cy.get('#searchText').type('Almost Famous');
    cy.get('form#searchForm').submit();
    cy.get('#movie-container').should('contain', 'Almost Famous');
  })

  it('should render 10 movies when search ', () => {
    cy.get('input#searchText').type('Almost Famous').should('have.value', 'Almost Famous');
    cy.get('form#searchForm').submit();
    cy.get('div.movie').should('have.length', 10);
  });

  it('should render movies if typed & clicked', () => {
    cy.get('input#searchText').type('Almost Famous').should('have.value', 'Almost Famous');
    cy.get('form#searchForm').submit();
    cy.get('h3').contains('Almost Famous');
  });

  it('should render Html-elements', () => {
    cy.get('input#searchText').type('Almost Famous').should('have.value', 'Almost Famous');
    cy.get('form#searchForm').submit();
    cy.get('div.movie').should('exist');
    cy.get('div.movie h3').should('exist');
    cy.get('div.movie img').should('exist');
    cy.get(':nth-child(1) > h3').should('contain', 'Almost Famous');
  });

});

// ERROR
describe('should test empty search and incorrect search', () => {
  it('should display error if empty search', () => {
    cy.get('#searchText').type(' ');
    cy.get('form#searchForm').submit();
    cy.get('#movie-container').should('exist');
    cy.get('p').should('exist').should('contain', 'Inga sökresultat att visa');
  });

  it('should not get data with incorrect searchText', () => {
    cy.get('#searchText').type(' Al');
    cy.get('form#searchForm').submit();
    cy.get('#movie-container').should('not.contain', 'Almost Famous');
    cy.get('p').should('exist').should('contain', 'Inga sökresultat att visa');
  });

});

})

describe('should test MOCK data', () => {
  it('should get mockdata with correct url', () => {
    cy.intercept('GET', "http://omdbapi.com/?apikey=5eed9320&s=*", {fixture: "omdbResponse"}).as("omdbCall");
    cy.get('#searchText').type('Casablanca');
    cy.get('form#searchForm').submit();
    cy.wait('@omdbCall').its('request.url').should('contain', 'Casablanca'); //mellanslag blir %20, cypress searchresponse = 'http://omdbapi.com/?apikey=416ed51a&s=Almost%20Famous'
    cy.get('#movie-container').should('contain', 'Casablanca');
  
  });
  
  // it('should not get mockdata with incorrect url', () => {
  
  // });

})
//MOCK
