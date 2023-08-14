import React from 'react'
import Loading from './Loading'

describe('<Loading />', () => {
  it('Show spinner when loading', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Loading loading />)
    cy.get('.MuiCircularProgress-root').should('exist')
  })
  it('Show data only when loading and containing data', () => {
    cy.mount(
      <Loading
        loading
        data={'content'}
      >
        {(data) => <div data-cy="container">{data}</div>}
      </Loading>
    )

    cy.get('[data-cy=container]').should('have.text', 'content')
    cy.get('.MuiCircularProgress-root').should('not.exist')
  })
  it('Show error message done loading', () => {
    cy.mount(<Loading error="this is an error">{() => <div data-cy="container">content</div>}</Loading>)

    cy.get('[data-cy=container]').should('not.exist')
    cy.get('.MuiCircularProgress-root').should('not.exist')
    cy.get('.MuiAlert-message').should('have.text', 'this is an error')
  })
})
