import React from 'react'
import Navigation from './Navigation'
import { MemoryRouter } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}
function Wrapper({ children }: Props) {
  return <MemoryRouter>{children}</MemoryRouter>
}

const protectedPage = {
  name: 'protected-route',
  path: '/protected',
  protected: true
}
const publicPage = {
  name: 'public-route',
  path: '/public'
}

describe('<Navigation />', () => {
  describe('Show only non-protected pages', () => {
    ;[true, false].forEach((drawer) => {
      it(`drawer=${drawer}`, () => {
        cy.mount(
          <Wrapper>
            <Navigation
              drawer={drawer}
              pages={[protectedPage, publicPage]}
            />
          </Wrapper>
        )
        cy.get('[data-cy=navbar-menu-button]').click()

        cy.get('[data-cy=navbar-menu-item]').should('have.length', 1)
        cy.get('[data-cy=navbar-menu-item]').should('contain.text', 'public-route')
      })
    })
  })

  describe('Show protected pages when logged in', () => {
    ;[true, false].forEach((drawer) => {
      it(`drawer=${drawer}`, () => {
        cy.mount(
          <Wrapper>
            <Navigation
              drawer={drawer}
              isLoggedIn
              pages={[protectedPage, publicPage]}
            />
          </Wrapper>
        )
        cy.get('[data-cy=navbar-menu-button]').click()

        cy.get('[data-cy=navbar-menu-item]').should('have.length', 2)
        cy.get('[data-cy=navbar-menu-item]').should('contain.text', 'protected-route')
      })
    })
  })
})
