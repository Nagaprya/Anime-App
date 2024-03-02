import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Home />)
 
    const heading = screen.findByRole('heading', { level: 2 })
 
    expect(heading).toBeInTheDocument()
  })
})